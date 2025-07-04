import { Component, Host, h, Prop, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "ui-select",
  styleUrl: "ui-select.scss",
  shadow: true,
})
export class UiSelect {
  /** Texto para la etiqueta */
  @Prop() label: string = "Seleccione una opción:";

  /** Opciones JSON: [{ label: 'Texto', value: 'valor' }] */
  @Prop() options: string = '[]';

  /** Valor seleccionado (input controlado) */
  @Prop({ mutable: true }) value?: string;

  /** Variante del select (estilización específica) */
  @Prop() variant?: string;

  /** Props estándar del select */
  @Prop() autofocus: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() form?: string;
  @Prop() multiple: boolean = false;
  @Prop() name?: string;
  @Prop() required: boolean = false;
  @Prop() size?: number;

  /** Evento de cambio */
  @Event() valueChange!: EventEmitter<string>;

  private handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  };

  render() {
    let parsedOptions: { label: string; value: string }[] = [];

    try {
      parsedOptions = JSON.parse(this.options);
    } catch (err) {
      console.warn("El formato de 'options' no es un JSON válido.");
    }

    return (
      <Host class={`variant-${this.variant || 'default'}`}>
        <label class="select-label">
          {this.label}
          <select
            class="select-control"
            {...({
              autofocus: this.autofocus,
              disabled: this.disabled,
              form: this.form,
              multiple: this.multiple,
              name: this.name,
              required: this.required,
              size: this.size,
              value: this.value,
              onInput: this.handleChange,
            } as any)}
          >
            {parsedOptions.map((opt) => (
              <option value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
      </Host>
    );
  }
}
