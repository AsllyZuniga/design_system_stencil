import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "ui-select",
  styleUrl: "ui-select.scss",
  shadow: true,
})
export class UiSelect {
  @Prop() label: string | undefined;
  @Prop() options: {
    id: string;
    value: string | number;
    label: string;
  }[] = [];

  render() {
    return (
      <Host>
        <label class="select-label">
          {this.label}
          <select class="select-control">
            {this.options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      </Host>
    );
  }
}
