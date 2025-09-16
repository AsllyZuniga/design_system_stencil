import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  Element,
} from "@stencil/core";

@Component({
  tag: "ui-select",
  styleUrl: "ui-select.scss",
  shadow: true,
})
export class UiSelect {
  @Element() el!: HTMLElement;
  @Prop() name?: string;

  @Prop() label?: string;

  @Prop() options: {
    id: string;
    value: string | number;
    label: string;
  }[] = [];

  @Prop({ mutable: true }) value?: string | number;

  private selectRef?: HTMLSelectElement;

  componentDidLoad() {
    this.updateSelectValue();
  }

  componentDidUpdate() {
    this.updateSelectValue();
  }

  private updateSelectValue() {
    if (this.selectRef && this.value !== undefined) {
      this.selectRef.value = String(this.value);
    }
  }
  @Event({ bubbles: true, composed: true })
  valueChange!: EventEmitter<{
    name?: string;
    value: string | number;
    option: { id: string; value: string | number; label: string };
  }>;

  private handleChange = (evt: Event) => {
    const target = evt.target as HTMLSelectElement;
    const selectedValue = target.value;

    const selectedOption =
      this.options.find((opt) => String(opt.value) === selectedValue) ??
      ({ id: "", value: "", label: "" } as any);

    this.value = selectedOption.value;

    const payload = {
      name: this.name,
      value: selectedOption.value,
      option: selectedOption,
    };

    this.valueChange.emit(payload);
  };

  render() {
    return (
      <Host>
        <label class="select-label">
          {this.label}
          <select
            class="select-control"
            ref={(el) => (this.selectRef = el)}
            onInput={this.handleChange}
          >
            {this.options.map((option) => (
              <option key={option.id} value={String(option.value)}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </Host>
    );
  }
}
