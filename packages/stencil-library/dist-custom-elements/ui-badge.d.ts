import type { Components, JSX } from "../dist/types/components";

interface UiBadge extends Components.UiBadge, HTMLElement {}
export const UiBadge: {
    prototype: UiBadge;
    new (): UiBadge;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
