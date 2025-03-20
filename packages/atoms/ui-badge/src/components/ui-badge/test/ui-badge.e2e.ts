import { newE2EPage } from '@stencil/core/testing';

describe('ui-badge', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-badge></ui-badge>');

    const element = await page.find('ui-badge');
    expect(element).toHaveClass('hydrated');
  });
});
