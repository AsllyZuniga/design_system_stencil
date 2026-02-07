import type { Components, JSX } from "../dist/types/components";

interface UiCard extends Components.UiCard, HTMLElement {}
export const UiCard: {
    prototype: UiCard;
    new (): UiCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
