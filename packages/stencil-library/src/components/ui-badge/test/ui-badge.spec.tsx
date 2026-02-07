import { newSpecPage } from '@stencil/core/testing';
import { UiBadge } from '../ui-badge';

describe('ui-badge', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [UiBadge],
      html: `<ui-badge></ui-badge>`,
    });
    expect(page.root).toEqualHtml(`
      <ui-badge>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ui-badge>
    `);
  });
});
