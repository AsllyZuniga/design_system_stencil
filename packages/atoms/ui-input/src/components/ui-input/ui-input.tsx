import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "ui-input",
  styleUrl: "ui-input.scss",
  shadow: true,
})
export class UiInput {
  @Prop() label?: string;
  @Prop() placeholder: string = "";
  @Prop() value: string = "";
  @Prop() type: string = "text";
  @Prop() name!: string;
  @Prop() inputId!: string;
  @Prop() hint?: string;
  @Prop() error?: string;
  @Prop() disabled: boolean = false;
  @Prop() readonly: boolean = false;
  @Prop() required: boolean = false;
  
  @Event({ bubbles: true, composed: true })
  valueChange!: EventEmitter<any>;

  private handleInput = (evt: Event) => {
    this.valueChange.emit(evt.target);
  };

  render() {
    return (
      <div
        class={{
          "ui-input": true,
          "is-filled": !!this.value,
          "is-error": !!this.error,
          "is-disabled": this.disabled,
          "is-readonly": this.readonly,
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
        />

        {this.error ? (
          <span class="error-message">{this.error}</span>
        ) : (
          this.hint && <span class="hint-message">{this.hint}</span>
        )}
      </div>
    );
  }
}
