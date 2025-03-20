import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-input',
  styleUrl: 'ui-input.scss',
  shadow: true,
})
export class UiInput {
  @Prop() placeholder: string = '';
  @Prop() value: string = '';
  @Prop() pattern: string = '';
  @Prop() align: string = 'left';
  @Prop() type: string = 'text';
  @Prop()
  name!: string;
  @Prop() autocomplete: 'on' | 'off' = 'off';
  @Prop() disabled: boolean = false;
  @Prop()
  inputId!: string;
  @Prop() readonly: boolean = false; 
  @Prop() required: boolean = false;
  render() {
    return (
      <div class= "ui-input">
        <input
        type={ this.type}
        placeholder={this.placeholder}
        value={this.value}
        pattern={this.pattern}
        name={this.name}
        autocomplete={this.autocomplete}
        disabled={this.disabled}
        readonly={this.readonly}
        required={this.required}
        id={this.inputId}
        />

      </div>
    );
  }
}
