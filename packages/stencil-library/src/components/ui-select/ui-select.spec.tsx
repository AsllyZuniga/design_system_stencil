import { newSpecPage } from '@stencil/core/testing';
import { UiSelect } from './ui-select';

describe('ui-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [UiSelect],
      html: `<ui-select></ui-select>`,
    });
    expect(page.root).toBeTruthy();
  });
});
