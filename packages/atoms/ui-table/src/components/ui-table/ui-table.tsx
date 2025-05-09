import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "ui-table",
  styleUrl: "ui-table.scss", // Asegúrate de que la ruta sea correcta
  shadow: true,
})
export class UiTable {
  @Prop() bordered!: boolean;
  @Prop() striped!: boolean;
  @Prop() hover!: boolean;
  @Prop() compact!: boolean;

  render() {
    return (
      <div
        class={{
          "table-container": true,
          bordered: this.bordered,
          striped: this.striped,
          hover: this.hover,
          compact: this.compact,
        }}
      >
        <slot />
      </div>
    );
  }
}
