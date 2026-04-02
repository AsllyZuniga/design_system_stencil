import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  Element,
  State,
  Listen,
  AttachInternals,
} from "@stencil/core";

@Component({
  tag: "ui-select",
  styleUrl: "ui-select.scss",
  shadow: true,
  formAssociated: true,
})
export class UiSelect {
  @Element() el!: HTMLElement;
  private inputRef?: HTMLUiInputElement;

  @Prop() name?: string;
  @Prop() label?: string;
  @Prop() placeholder: string = "Select";

  @Prop() options: {
    id: string;
    value: string | number;
    label: string;
  }[] = [];

  @Prop({ mutable: true }) value?: string | number;

  /* ESTADOS */
  @Prop() disabled: boolean = false;
  @Prop() error: boolean = false;
  @Prop() required: boolean = false;

  @State() isOpen: boolean = false;
  @State() selectedLabel: string = "";

  @AttachInternals() internals: ElementInternals;

  private inputId = `ui-select-${Math.random().toString(36).slice(2, 9)}`;

  componentDidLoad() {
    this.updateLabel();
  }

  componentDidUpdate() {
    this.updateLabel();
  }

  componentDidRender() {
    if (this.inputRef && this.inputRef.value !== this.selectedLabel) {
      this.inputRef.value = this.selectedLabel;
    }
  }

  @Listen("click", { target: "window" })
  closeOnClickOutside(evt: MouseEvent) {
    if (!this.el.contains(evt.target as Node)) {
      this.isOpen = false;
    }
  }
  formResetCallback() {
    console.log("Reset");

    this.value = "";
    this.clearError();
    this.internals.setFormValue("");
  }

  private updateLabel() {
    const selectedOption = this.options.find(
      (option) => String(option.value) === String(this.value),
    );

    this.selectedLabel = selectedOption?.label ?? "";
  }

  private toggleDropdown = () => {
    if (this.disabled) {
      return;
    }

    this.isOpen = !this.isOpen;
  };
  private clearError() {
    this.internals.setValidity({});
  }

  private selectOption = (option: {
    id: string;
    value: string | number;
    label: string;
  }) => {
    this.value = option.value;
    this.selectedLabel = option.label;
    this.isOpen = false;

    this.valueChange.emit({
      name: this.name,
      value: option.value,
      option,
    });
  };

  @Event({ bubbles: true, composed: true })
  valueChange!: EventEmitter<{
    name?: string;
    value: string | number;
    option: { id: string; value: string | number; label: string };
  }>;

  render() {
    return (
      <Host>
        <div
          class={{
            "ui-select": true,
            "is-open": this.isOpen,
            "is-disabled": this.disabled,
            "is-error": this.error,
          }}
        >
          <div class="ui-select-trigger" onClick={this.toggleDropdown}>
            <ui-input
              label={this.label}
              inputId={this.inputId}
              placeholder={this.placeholder}
              readonly={true}
              disabled={this.disabled}
              required={this.required}
              ref={(el) => (this.inputRef = el as HTMLUiInputElement)}
            ></ui-input>
            <span class="ui-select-arrow" aria-hidden="true">
              {this.isOpen ? "^" : "v"}
            </span>
          </div>

          {this.isOpen && (
            <div class="ui-select-dropdown" role="listbox" aria-expanded="true">
              {this.options.map((option) => (
                <button
                  type="button"
                  class={{
                    "ui-select-option": true,
                    "is-selected": String(option.value) === String(this.value),
                  }}
                  onClick={() => this.selectOption(option)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
