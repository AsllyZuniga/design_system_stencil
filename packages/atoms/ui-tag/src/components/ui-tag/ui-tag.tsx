import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ui-tag',
  styleUrl: 'ui-tag.scss',
  shadow: true,
})
export class UiTag {
  render() {
    return (
      <Host>
        Hola mundo
        <slot></slot>
      </Host>
    );
  }
}
