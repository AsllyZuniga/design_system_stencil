import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-panel-modal',
  styleUrl: 'ui-panel-modal.scss',
  shadow: true,
})
export class UiPanelModal {
  @Prop() open: boolean = false;
  @Prop()
  title!: string;

  render() {
    return (
      <div class={{ 'backdrop': true, 'visible': this.open }}>
        <div class="modal">
          <div class="modal-header">
            <h2>{this.title}</h2>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    );
  }
}
