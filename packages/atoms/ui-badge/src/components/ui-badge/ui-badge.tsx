import { Component, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "ui-badge",
  styleUrl: "ui-badge.scss",
  shadow: true,
})
export class UiBadge {
  @Prop() color!: string;
  @Prop() text?: string;
  @Prop() size: string = "m";
  render() {
    return (
      <div class={`ui-badge ${this.color} ${this.size}`}>
        {this.text && <span>{this.text}</span>}
      </div>
    );
  }
}
