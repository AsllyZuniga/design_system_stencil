import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ui-card',
  styleUrl: 'ui-card.scss',
  shadow: true,
})
export class UiCard {
  @Prop() title?: string;
  @Prop() subtitle?: string;
  @Prop() image?: string;
  @Prop() clickable?: boolean = false;
  @Prop() href?: string;

  render() {
    const CardContent = (
      <div class="card">
        {this.image && <img src={this.image} alt="Card image" class="card-image" />}
        <div class="card-header">
          {this.title && <h2 class="card-title">{this.title}</h2>}
          {this.subtitle && <p class="card-subtitle">{this.subtitle}</p>}
        </div>
        <div class="card-body">
          <slot></slot>
        </div>
        <div class="card-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    );

    return this.clickable && this.href ? (
      <a href={this.href} class="card-link">{CardContent}</a>
    ) : (
      CardContent
    );
  }
}
