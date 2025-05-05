import { newE2EPage } from '@stencil/core/testing';

describe('ui-panel-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-panel-modal></ui-panel-modal>');

    const element = await page.find('ui-panel-modal');
    expect(element).toHaveClass('hydrated');
  });
});
