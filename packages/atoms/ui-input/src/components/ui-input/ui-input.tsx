//
import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "ui-input",
  styleUrl: "ui-input.scss",
  shadow: true,
})
export class UiInput {
  @Prop() placeholder: string = "";
  @Prop() value: string = "";
  @Prop() type: string = "text";
  @Prop() name!: string;
  @Prop() inputId!: string;

  @Event({ bubbles: true, composed: true })
  valueChange!: EventEmitter<any>;

  private handleInput = (evt: Event) => {
    this.valueChange.emit(evt.target);
  };

  render() {
    return (
      <div class="ui-input">
        <input
          id={this.inputId}
          name={this.name}
          type={this.type}
          value={this.value}
          placeholder={this.placeholder}
          onChange={this.handleInput}
        />
      </div>
    );
  }
}
