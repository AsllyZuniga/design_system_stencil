import { newSpecPage } from '@stencil/core/testing';
import { UiTest } from '../ui-test';

describe('ui-test', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [UiTest],
      html: `<ui-test></ui-test>`,
    });
    expect(page.root).toEqualHtml(`
      <ui-test>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ui-test>
    `);
  });
});
