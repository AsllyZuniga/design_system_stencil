import type { Components, JSX } from "../dist/types/components";

interface UiPanelModal extends Components.UiPanelModal, HTMLElement {}
export const UiPanelModal: {
    prototype: UiPanelModal;
    new (): UiPanelModal;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
