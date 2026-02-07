import { Component, Prop, h, Event, EventEmitter, Method, State, AttachInternals } from '@stencil/core';

@Component({
  tag: 'ui-input',
  styleUrl: 'ui-input.scss',
  shadow: true,
  formAssociated: true,
})
export class UiInput {
  @Prop() label?: string;
  @Prop() placeholder: string = '';
  @Prop() value: string = '';
  @Prop() type: string = 'text';
  @Prop() name!: string;
  @Prop() inputId!: string;
  @Prop() hint?: string;

  @Prop() disabled: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop() required: boolean = false;

  @AttachInternals()
  internals: ElementInternals;

  @State() hasError: boolean = false;

  @Event({ bubbles: true, composed: true })
  valueChange!: EventEmitter<string>;

  private handleInput = (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    this.value = target.value;

    this.internals.setFormValue(this.value); // 👈 CLAVE
    this.valueChange.emit(this.value);

    if (this.hasError && this.value.trim()) {
      this.hasError = false;
    }
  };

  private handleBlur = () => {
    if (this.required && !this.value.trim()) {
      this.hasError = true;
    }
  };

  @Method()
  async validate(): Promise<boolean> {
    if (this.required && !this.value.trim()) {
      this.hasError = true;

      this.internals.setValidity({ valueMissing: true }, 'Campo obligatorio');

      return false;
    }

    this.hasError = false;
    this.internals.setValidity({});
    return true;
  }

  formAssociatedCallback(form: HTMLFormElement | null) {
    console.log('ui-input asociado al form:', form);
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formResetCallback() {
    this.value = '';
    this.hasError = false;
    this.internals.setFormValue('');
    this.internals.setValidity({});
  }

  formStateRestoreCallback(state: string, _mode: 'restore' | 'autocomplete') {
    this.value = state || '';
    this.internals.setFormValue(this.value);
  }

  render() {
    return (
      <div
        class={{
          'ui-input': true,
          'is-filled': !!this.value,
          'is-error': this.hasError,
          'is-disabled': this.disabled,
          'is-readonly': this.readonly,
        }}
      >
        {this.label && (
          <label htmlFor={this.inputId}>
            {this.label}
            {this.required && <span class="required">*</span>}
          </label>
        )}

        <input
          id={this.inputId}
          name={this.name}
          type={this.type}
          value={this.value}
          placeholder={this.placeholder}
          disabled={this.disabled}
          readonly={this.readonly}
          onInput={this.handleInput}
          onBlur={this.handleBlur}
        />

        {this.hasError ? <span class="error-message">Campo obligatorio</span> : this.hint && <span class="hint-message">{this.hint}</span>}
      </div>
    );
  }
}
