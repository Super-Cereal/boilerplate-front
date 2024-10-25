import type React from "react";
import type { AriaRole } from "react";

interface Options {
  /** Дефолтно "button" */
  role?: AriaRole;

  /** Дефолтно 0 */
  tabIndex?: number;
}

/** Сделать html элемент доступным для клика с клавиатуры */
export const accessibleClick = (
  onClick: ((event: React.MouseEvent | React.KeyboardEvent) => unknown) | undefined,
  { role = "button", tabIndex = 0 }: Options = {},
) => {
  if (!onClick) {
    return null;
  }

  return {
    role,
    tabIndex,

    onClick,
    onKeyDown: (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick(event);
      }
    },
  } as const;
};
