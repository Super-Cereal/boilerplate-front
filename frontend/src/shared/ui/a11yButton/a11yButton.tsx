import React, { HTMLAttributes, PropsWithChildren } from "react";
import cx from "classnames";

import styles from "./A11yButton.module.css";

interface A11yButtonProps extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
  className?: string;

  /** Кнопка должна быть видна только скринридерам */
  onlyScreenReaders?: boolean;
}

/** Дает использовать семантическую кнопку, при этом не меняя отображение */
export const A11yButton = ({ className, children, onlyScreenReaders, ...rest }: A11yButtonProps) => (
  <button {...rest} className={cx(styles.button, onlyScreenReaders && styles.onlyScreenReaders, className)}>
    {children}
  </button>
);
