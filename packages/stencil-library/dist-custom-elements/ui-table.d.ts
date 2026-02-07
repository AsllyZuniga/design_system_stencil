import type { Components, JSX } from "../dist/types/components";

interface UiTable extends Components.UiTable, HTMLElement {}
export const UiTable: {
    prototype: UiTable;
    new (): UiTable;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
