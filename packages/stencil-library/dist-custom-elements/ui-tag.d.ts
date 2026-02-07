import type { Components, JSX } from "../dist/types/components";

interface UiTag extends Components.UiTag, HTMLElement {}
export const UiTag: {
    prototype: UiTag;
    new (): UiTag;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
