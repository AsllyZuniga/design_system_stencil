import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "ui-select",
  styleUrl: "ui-select.scss",
  shadow: true,
})
export class UiSelect {
  @Prop() autofocus: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() form?: string;
  @Prop() multiple: boolean = false;
  @Prop() name?: string;
  @Prop() required: boolean = false;
  @Prop() size?: number;

  render() {
    return (
      <Host>
        <label>
          Movimiento
          <select
            autofocus={this.autofocus}
            disabled={this.disabled}
            form={this.form}
            multiple={this.multiple}
            name={this.name}
            required={this.required}
            size={this.size}
          >
            <option value="">Seleccione</option>
            <option value="pago">Pago</option>
            <option value="gasto">Gasto</option>
            <option value="inversion">Inversión</option>
            <option value="prestamo">Préstamo</option>
          </select>
        </label>
      </Host>
    );
  }
}
