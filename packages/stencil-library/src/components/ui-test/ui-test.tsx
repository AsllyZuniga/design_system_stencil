import { Component, Host, h, Prop } from "@stencil/core";
@Component({
  tag: "ui-test",
  styleUrl: "ui-test.scss",
  shadow: true,
})
export class UiTest {
  @Prop() text!: string;
  @Prop() textb!: string;
  render() {
    return (
      <div class="ui-test">
        <div class="ui-test__texta">
          <label>{this.text}</label>
        </div>
        <div class="ui-test__textb">
          <p>{this.textb}</p>
        </div>
      </div>
    );
  }
}
