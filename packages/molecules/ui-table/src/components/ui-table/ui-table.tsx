import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "ui-table",
  styleUrl: "ui-table.scss",
  shadow: true,
})
export class UiTable {
  @Prop() headers: { field: string; label: string }[] = [];
  @Prop() data: any[] = [];

  render() {
    const hasData = this.headers.length > 0 && this.data.length > 0;

    return (
      <div class="table-container">
        {hasData ? (
          <table class="ui-table">
            <thead>
              <tr>
                {this.headers.map((header) => (
                  <th key={header.field}>{header.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.data.map((row) => (
                <tr>
                  {this.headers.map((header) => (
                    <td key={header.field}>{row[header.field]}</td>
                  ))}
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
