import { newE2EPage } from '@stencil/core/testing';

describe('ui-tag', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-tag></ui-tag>');

    const element = await page.find('ui-tag');
    expect(element).toHaveClass('hydrated');
  });
});
