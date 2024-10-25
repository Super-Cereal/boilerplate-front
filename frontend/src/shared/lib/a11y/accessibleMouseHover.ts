import type React from "react";

type Options = {
  /**
   * Айди тултипа, если он появляется при наведении, иначе `false`
   *
   * Умышленно нет `undefined`,
   * тк этот ивент чаще всего используется именно для тултипа,
   * поэтому не хочется, чтобы забывали параметр
   */
  describedby: string | false;

  /** Дефолтно 0 */
  tabIndex?: number;
} & (
  | {
      /** Событие всплывает от детей к родителю */
      onMouseOver?: (event: React.MouseEvent | React.FocusEvent) => unknown;
      onMouseOut?: (event: React.MouseEvent | React.FocusEvent) => unknown;

      /** Событие НЕ всплывает от детей к родителю */
      onMouseEnter?: never;
      onMouseLeave?: never;
    }
  | {
      onMouseOver?: never;
      onMouseOut?: never;

      /** Событие НЕ всплывает от детей к родителю */
      onMouseEnter?: (event: React.MouseEvent | React.FocusEvent) => unknown;
      onMouseLeave?: (event: React.MouseEvent | React.FocusEvent) => unknown;
    }
);

/** Сделать html элемент доступным для наведения с клавиатуры */
export const accessibleMouseHover = ({
  onMouseOver,
  onMouseOut,

  onMouseEnter,
  onMouseLeave,

  describedby,
  tabIndex = 0,
}: Options) => {
  if (!onMouseOver && !onMouseEnter) {
    return {};
  }

  return {
    tabIndex,
    "aria-describedby": describedby ? describedby : undefined,

    onMouseOver,
    onMouseOut,

    onMouseEnter,
    onMouseLeave,

    onFocus: onMouseOver || onMouseEnter,
    onBlur: onMouseOut || onMouseLeave,
  } as const;
};
