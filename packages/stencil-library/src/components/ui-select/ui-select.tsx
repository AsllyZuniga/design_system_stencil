import {
  AttachInternals,
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";

type UiSelectOption = {
  id: string;
  value: string | number;
  label: string;
};

@Component({
  tag: "ui-select",
  styleUrl: "ui-select.scss",
  shadow: true,
  formAssociated: true,
})
export class UiSelect {
  @AttachInternals() internals!: ElementInternals;

  @Element() el!: HTMLElement;

  private inputId = `ui-select-${Math.random().toString(36).slice(2, 9)}`;

  @Prop({ mutable: true }) disabled: boolean = false;
  @Prop() error: boolean = false;
  @Prop() label?: string;
  @Prop() name?: string;
  @Prop() options: UiSelectOption[] = [];
  @Prop() placeholder: string = "Select";
  @Prop() required: boolean = false;
  @Prop({ mutable: true }) value?: string | number;

  @State() hasError: boolean = false;
  @State() isOpen: boolean = false;
  @State() selectedLabel: string = "";

  @Event({ bubbles: true, composed: true })
  valueChange!: EventEmitter<{
    name?: string;
    value: string | number;
    option: UiSelectOption;
  }>;

  @Watch("options")
  handleOptionsChange() {
    this.updateSelectedLabel();
  }

  @Watch("value")
  handleValueChange(nextValue?: string | number) {
    this.updateSelectedLabel();
    this.setFormValue(nextValue == null ? "" : String(nextValue));

    if (this.hasError && String(nextValue ?? "").trim()) {
      this.clearError();
    }
  }

  private get hasValidationError(): boolean {
    return this.error || this.hasError;
  }

  componentWillLoad() {
    this.updateSelectedLabel();
    this.setFormValue(this.value == null ? "" : String(this.value));
  }

  formAssociatedCallback(form: HTMLFormElement | null) {
    if (!form) {
      return;
    }

    form.addEventListener("submit", () => this.validate());
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    this.value = "";
    this.isOpen = false;
    this.updateSelectedLabel();
    this.clearError();
    this.setFormValue("");
  }

  formStateRestoreCallback(
    state: string,
    _mode: "restore" | "autocomplete",
  ) {
    this.value = state || "";
    this.updateSelectedLabel();
    this.setFormValue(this.value == null ? "" : String(this.value));
  }

  @Method()
  async open(): Promise<void> {
    this.toggleDropdown(true);
  }

  @Method()
  async close(): Promise<void> {
    this.toggleDropdown(false);
  }

  @Method()
  async validate(): Promise<boolean> {
    if (this.required && !String(this.value ?? "").trim()) {
      this.hasError = true;
      this.setValidity({ valueMissing: true }, "Campo obligatorio");
      return false;
    }

    this.clearError();
    return true;
  }

  @Listen("click", { target: "window" })
  handleWindowClick(evt: MouseEvent) {
    if (!this.el.contains(evt.target as Node)) {
      this.isOpen = false;
    }
  }

  @Listen("keydown", { target: "window" })
  handleWindowKeydown(evt: KeyboardEvent) {
    if (evt.key === "Escape") {
      this.isOpen = false;
    }
  }

  private handleTriggerClick = () => {
    this.toggleDropdown();
  };

  private handleTriggerKeyDown = (evt: KeyboardEvent) => {
    if (this.disabled) {
      return;
    }

    if (evt.key === "Enter" || evt.key === " " || evt.key === "ArrowDown") {
      evt.preventDefault();
      this.toggleDropdown(true);
    }

    if (evt.key === "Escape") {
      this.isOpen = false;
    }
  };

  private handleOptionSelect = (option: UiSelectOption) => {
    this.setSelectedValue(option);
  };

  private clearError() {
    this.hasError = false;
    this.setValidity({});
  }

  private setSelectedValue(option: UiSelectOption) {
    this.value = option.value;
    this.selectedLabel = option.label;
    this.isOpen = false;

    this.setFormValue(String(option.value));

    if (this.hasError) {
      this.clearError();
    }

    this.valueChange.emit({
      name: this.name,
      value: option.value,
      option,
    });
  }

  private toggleDropdown(forceOpen?: boolean) {
    if (this.disabled) {
      return;
    }

    this.isOpen = forceOpen ?? !this.isOpen;
  }

  private updateSelectedLabel() {
    const selectedOption = this.options.find(
      (option) => String(option.value) === String(this.value),
    );

    this.selectedLabel = selectedOption?.label ?? "";
  }

  private setFormValue(value: string) {
    this.internals?.setFormValue?.(value);
  }

  private setValidity(flags: ValidityStateFlags, message?: string) {
    this.internals?.setValidity?.(flags, message);
  }

  render() {
    const displayValue = this.selectedLabel || this.placeholder;
    const isPlaceholder = !this.selectedLabel;

    return (
      <Host>
        <div
          class={{
            "ui-select": true,
            "is-open": this.isOpen,
            "is-disabled": this.disabled,
            "is-error": this.hasValidationError,
          }}
        >
          <div part="field" class="ui-select-field">
            {this.label && (
              <label part="label" id={`${this.inputId}-label`} class="ui-select-label">
                {this.label}
                {this.required && <span class="ui-select-required">*</span>}
              </label>
            )}

            <button
              part="trigger"
              class={{
                "ui-select-trigger": true,
                "is-placeholder": isPlaceholder,
              }}
              type="button"
              role="combobox"
              aria-labelledby={this.label ? `${this.inputId}-label ${this.inputId}-value` : `${this.inputId}-value`}
              aria-expanded={String(this.isOpen)}
              aria-disabled={String(this.disabled)}
              aria-controls={`${this.inputId}-dropdown`}
              aria-haspopup="listbox"
              disabled={this.disabled}
              onClick={this.handleTriggerClick}
              onKeyDown={this.handleTriggerKeyDown}
            >
              <span part="value" id={`${this.inputId}-value`} class="ui-select-value">
                {displayValue}
              </span>
              <span class="ui-select-arrow" aria-hidden="true">
                <span class="ui-select-arrow-shape"></span>
              </span>
            </button>

            <small part="hint" class="ui-select-hint">
              {this.hasValidationError ? "Campo obligatorio" : ""}
            </small>
          </div>

          {this.isOpen && (
            <div
              part="dropdown"
              id={`${this.inputId}-dropdown`}
              class="ui-select-dropdown"
              role="listbox"
            >
              {this.options.length === 0 && (
                <div part="empty" class="ui-select-empty">
                  Sin opciones
                </div>
              )}

              {this.options.map((option) => {
                const selected = String(option.value) === String(this.value);

                return (
                  <button
                    key={option.id}
                    part="option"
                    type="button"
                    role="option"
                    aria-selected={String(selected)}
                    class={{
                      "ui-select-option": true,
                      "is-selected": selected,
                    }}
                    onClick={() => this.handleOptionSelect(option)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
