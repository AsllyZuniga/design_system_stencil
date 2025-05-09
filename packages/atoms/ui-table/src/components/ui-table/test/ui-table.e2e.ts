import { newE2EPage } from '@stencil/core/testing';

describe('ui-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-table></ui-table>');

    const element = await page.find('ui-table');
    expect(element).toHaveClass('hydrated');
  });
});
