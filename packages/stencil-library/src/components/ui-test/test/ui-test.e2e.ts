import { newE2EPage } from '@stencil/core/testing';

describe('ui-test', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-test></ui-test>');

    const element = await page.find('ui-test');
    expect(element).toHaveClass('hydrated');
  });
});
