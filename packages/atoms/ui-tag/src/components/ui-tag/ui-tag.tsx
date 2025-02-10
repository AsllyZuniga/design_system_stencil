import { Component, Host, h, Prop } from "@stencil/core";
type ColorType = "success" | "error" | "warning" | "info" | "completed";

@Component({
  tag: "ui-tag",
  styleUrl: "ui-tag.scss",
  shadow: true,
})
export class UiTag {
  @Prop() text: string = "";
  @Prop() color: ColorType = "success";

  render() {
    return (
      <div class={`ui-tag tag--${this.color}`}>
        <span>{this.text}</span>
      </div>
    );
  }
}
