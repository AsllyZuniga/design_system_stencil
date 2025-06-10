import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "ui-panel-modal",
  styleUrl: "ui-panel-modal.scss",
  shadow: false,
})
export class UiPanelModal {
  @Prop({ reflect: true }) visible: boolean = true;

  render() {
    return (
      <div class={`modal ${this.visible ? "show" : ""}`}>
        <div class="modal-content">
          <slot></slot>
        </div>
      </div>
    );
  }
}
