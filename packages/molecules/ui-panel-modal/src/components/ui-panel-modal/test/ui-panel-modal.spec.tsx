import { newSpecPage } from '@stencil/core/testing';
import { UiPanelModal } from '../ui-panel-modal';

describe('ui-panel-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [UiPanelModal],
      html: `<ui-panel-modal></ui-panel-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <ui-panel-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ui-panel-modal>
    `);
  });
});
