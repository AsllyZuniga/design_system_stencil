import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-button',
  styleUrl: 'ui-button.scss',
  shadow: true,
})
export class UiButton {
  @Prop() autofocus: boolean = false;
  @Prop() disabled?: boolean;
  @Prop() form?: string;
  @Prop() formaction?: string;
  @Prop() formenctype?: string;
  @Prop() formmethod?: string;
  @Prop() formnovalidate?: boolean;
  @Prop() formtarget?: string;
  @Prop() name?: string;
  @Prop() type?: 'button' | 'reset' | 'submit' = 'button';
  @Prop() value?: string;

  render() {
    return (
      <button
        autofocus={this.autofocus}
        disabled={this.disabled}
        form={this.form}
        formaction={this.formaction}
        formenctype={this.formenctype}
        formmethod={this.formmethod}
        formnovalidate={this.formnovalidate}
        formtarget={this.formtarget}
        name={this.name}
        type={this.type}
        value={this.value}
      >
        <slot></slot>
      </button>
    );
  }
}