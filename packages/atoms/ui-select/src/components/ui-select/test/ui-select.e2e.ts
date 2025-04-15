import { newE2EPage } from '@stencil/core/testing';

describe('ui-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-select></ui-select>');

    const element = await page.find('ui-select');
    expect(element).toHaveClass('hydrated');
  });
});
