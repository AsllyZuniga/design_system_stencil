import { Component, h, Prop, VNode } from "@stencil/core";

export interface UiTableHeader {
  field: string;
  label: string;
}

export type UiTableTemplate = {
  [key: string]: (value: any, row: any) => string | HTMLElement | VNode;
};

@Component({
  tag: "ui-table",
  styleUrl: "ui-table.scss",
  shadow: true,
})
export class UiTable {
  /** Column definitions: field key and display label */
  @Prop() headers: UiTableHeader[] = [];

  /** Row data: each object key should match a header field */
  @Prop() data: any[] = [];

  /** Optional custom cell renderers for columns */
  @Prop() templates?: UiTableTemplate;

  render() {
    const hasData = this.headers.length > 0 && this.data.length > 0;

    return (
      <div class="table-container">
        {hasData ? (
          <table class="ui-table">
            <thead>
              <tr>
                {this.headers.map(({ field, label }) => (
                  <th key={field}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.data.map((row, idx) => (
                <tr key={row.id ?? idx}>
                  {this.headers.map(({ field }) => {
                    const value = row[field];
                    const fn = this.templates?.[field];
                    const output = fn ? fn(value, row) : undefined;

                    // Caso 1: no hay template -> renderiza texto plano
                    if (output == null) {
                      return <td>{value ?? ""}</td>;
                    }

                    // Caso 2: template devuelve string HTML
                    if (typeof output === "string") {
                      return <td innerHTML={output}></td>;
                    }

                    // Caso 3: template devuelve HTMLElement
                    if (output instanceof HTMLElement) {
                      return (
                        <td
                          ref={(el) => {
                            if (el) {
                              el.innerHTML = "";
                              el.appendChild(output);
                            }
                          }}
                        ></td>
                      );
                    }

                    // Caso 4: template devuelve un nodo virtual (VNode)
                    return <td>{output as VNode}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay datos para mostrar.</p>
        )}
      </div>
    );
  }
}
