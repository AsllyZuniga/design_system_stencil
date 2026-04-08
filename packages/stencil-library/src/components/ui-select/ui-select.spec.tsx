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

  it('does not render ui-input internally', async () => {
    const page = await newSpecPage({
      components: [UiSelect],
      html: `<ui-select label="Año"></ui-select>`,
    });

    expect(page.root?.shadowRoot?.querySelector('ui-input')).toBeNull();
    expect(page.root?.shadowRoot?.querySelector('.ui-select-trigger')).toBeTruthy();
  });
});
