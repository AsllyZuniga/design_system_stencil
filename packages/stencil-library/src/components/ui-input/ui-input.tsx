import {
  AttachInternals,
  Component,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";

@Component({
  tag: "ui-input",
  styleUrl: "ui-input.scss",
  shadow: true,
  formAssociated: true,
})
export class UiInput {
  @AttachInternals() internals!: ElementInternals;

  @Prop({ mutable: true }) disabled: boolean = false;
  @Prop() hint?: string;
  @Prop() inputId!: string;
  @Prop() label?: string;
  @Prop() placeholder: string = "";
  @Prop() readonly: boolean = false;
  @Prop() required: boolean = false;
  @Prop() type: string = "text";
  @Prop({ mutable: true }) value: string = "";

  @State() hasError: boolean = false;

  @Event({ bubbles: true, composed: true })
  inputChange!: EventEmitter<string>;

  @Watch("value")
  handleValueChange(nextValue: string) {
    this.setFormValue(nextValue ?? "");

    if (this.hasError && nextValue.trim()) {
      this.clearError();
    }
  }

  componentWillLoad() {
    this.setFormValue(this.value);
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
    this.setFormValue("");
  }

  formStateRestoreCallback(state: string, _mode: "restore" | "autocomplete") {
    this.value = state || "";
    this.setFormValue(this.value);
  }

  @Method()
  async validate(): Promise<boolean> {
    return this.validateInput();
  }

  private handleInput = (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    this.value = target.value;

    this.inputChange.emit(this.value);
  };

  private handleBlur = () => {
    if (this.required && !this.value.trim()) {
      this.hasError = true;
      this.setValidity({ valueMissing: true }, "Campo obligatorio");
    }
  };

  private clearError() {
    this.hasError = false;
    this.setValidity({});
  }

  validateInput() {
    if (this.required && !this.value.trim()) {
      this.hasError = true;
      this.setValidity({ valueMissing: true }, "Campo obligatorio");
      return false;
    }

    this.clearError();
    return true;
  }

  private setFormValue(value: string) {
    this.internals?.setFormValue?.(value);
  }

  private setValidity(flags: ValidityStateFlags, message?: string) {
    this.internals?.setValidity?.(flags, message);
  }

  render() {
    const hint = this.hasError ? "Campo obligatorio" : this.hint;

    return (
      <div
        part="container"
        class={{
          "ui-input": true,
          "is-filled": !!this.value,
          "is-error": this.hasError,
          "is-disabled": this.disabled,
          "is-readonly": this.readonly,
        }}
      >
        {this.label && (
          <label part="label" htmlFor={this.inputId}>
            {this.label}
          </label>
        )}

        <input
          part="input"
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
        <small part="hint" class="hint-message">
          {hint}
        </small>
      </div>
    );
  }
}
