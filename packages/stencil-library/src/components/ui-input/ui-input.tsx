import {
  Component,
  Prop,
  h,
  Event,
  EventEmitter,
  Method,
  State,
  Watch,
  AttachInternals,
} from "@stencil/core";

@Component({
  tag: "ui-input",
  styleUrl: "ui-input.scss",
  shadow: true,
  formAssociated: true,
})
export class UiInput {
  @Prop() label?: string;
  @Prop() placeholder: string = "";
  @Prop() type: string = "text";
  @Prop() inputId!: string;
  @Prop() hint?: string;
  @Prop({ mutable: true }) disabled: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop() required: boolean = false;
  @Prop({ mutable: true }) value: string = "";

  @State() hasError: boolean = false;

  @AttachInternals() internals: ElementInternals;

  @Event({ bubbles: true, composed: true })
  inputChange!: EventEmitter<string>;

  componentWillLoad() {
    this.internals.setFormValue(this.value);
  }

  @Watch("value")
  handleValueChange(nextValue: string) {
    this.internals.setFormValue(nextValue ?? "");

    if (this.hasError && nextValue.trim()) {
      this.clearError();
    }
  }

  private clearError() {
    this.hasError = false;
    this.internals.setValidity({});
  }

  private handleInput = (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    this.value = target.value;

    this.inputChange.emit(this.value);
  };

  private handleBlur = () => {
    if (this.required && !this.value.trim()) {
      this.hasError = true;
      this.internals.setValidity({ valueMissing: true }, "Campo obligatorio");
    }
  };

  @Method()
  async validate(): Promise<boolean> {
    return this.validateInput();
  }
  validateInput() {
    if (this.required && !this.value.trim()) {
      this.hasError = true;
      this.internals.setValidity({ valueMissing: true }, "Campo obligatorio");
      return false;
    }

    this.clearError();
    return true;
  }

  formAssociatedCallback(form: HTMLFormElement | null) {
    if (!form) {
      return;
    }

    form.addEventListener("submit", () => this.validateInput());
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    this.value = "";
    this.clearError();
    this.internals.setFormValue("");
  }

  formStateRestoreCallback(state: string, _mode: "restore" | "autocomplete") {
    this.value = state || "";
    this.internals.setFormValue(this.value);
  }

  render() {
    const hint = this.hasError ? "Campo obligatorio" : this.hint;

    return (
      <div
        class={{
          "ui-input": true,
          "is-filled": !!this.value,
          "is-error": this.hasError,
          "is-disabled": this.disabled,
          "is-readonly": this.readonly,
        }}
      >
        {this.label && <label htmlFor={this.inputId}>{this.label}</label>}

        <input
          id={this.inputId}
          type={this.type}
          value={this.value}
          placeholder={this.placeholder}
          disabled={this.disabled}
          readOnly={this.readonly}
          required={this.required}
          onInput={this.handleInput}
          onBlur={this.handleBlur}
        />
        <small class="hint-message">{hint}</small>
      </div>
    );
  }
}
