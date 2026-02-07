import { newSpecPage } from '@stencil/core/testing';
import { UiTag } from '../ui-tag';

describe('ui-tag', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [UiTag],
      html: `<ui-tag></ui-tag>`,
    });
    expect(page.root).toEqualHtml(`
      <ui-tag>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ui-tag>
    `);
  });
});
