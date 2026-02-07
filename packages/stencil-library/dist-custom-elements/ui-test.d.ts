import type { Components, JSX } from "../dist/types/components";

interface UiTest extends Components.UiTest, HTMLElement {}
export const UiTest: {
    prototype: UiTest;
    new (): UiTest;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
