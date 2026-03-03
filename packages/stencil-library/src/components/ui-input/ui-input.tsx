import {Component, Prop, h, Event, EventEmitter, Method, State, AttachInternals} from "@stencil/core";

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
  @Prop() disabled: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop() required: boolean = false;

  @State() value: string = "";
  @State() hasError: boolean = false;

  @AttachInternals() internals: ElementInternals;

  @Event({ bubbles: true, composed: true })
  inputChange!: EventEmitter<string>;

  componentWillLoad() {
    this.internals.setFormValue(this.value);
  }

  private clearError() {
    this.hasError = false;
    this.internals.setValidity({});
  }

  private handleInput = (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    this.value = target.value;

    this.internals.setFormValue(this.value);
    this.inputChange.emit(this.value);

    if (this.hasError && this.value.trim()) {
      this.clearError();
    }
  };

  private handleBlur = () => {
    if (this.required && !this.value.trim()) {
      this.hasError = true;
      this.internals.setValidity({ valueMissing: true }, "Campo obligatorio");
    }
  };

  @Method()
  async validate(): Promise<boolean> {
    if (this.required && !this.value.trim()) {
      this.hasError = true;
      this.internals.setValidity({ valueMissing: true }, "Campo obligatorio");
      return false;
    }

    this.clearError();
    return true;
  }

  formAssociatedCallback(form: HTMLFormElement | null) {
    console.log("ui-input asociado al form:", form);
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

        {this.hasError ? (
          <small class="error-message">Campo obligatorio</small>
        ) : (
          this.hint && <small class="hint-message">{this.hint}</small>
        )}
      </div>
    );
  }
}
