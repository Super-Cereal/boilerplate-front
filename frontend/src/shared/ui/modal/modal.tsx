import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import cx from "classnames";

import { ModalOverlay } from "./modal-overlay/modal-overlay";

import styles from "./modal.module.css";

interface IModalProps {
  /** Заголовок в модалке */
  title?: string;

  /** Дополнительный класс */
  className?: string;

  /** Контент модалки */
  children: ReactNode;

  /** Что происходит при попытке закрыть модалку */
  onClose: () => void;
}

const modalsRoot = document.getElementById("modal")!;

export const Modal = ({ title, className, children, onClose }: IModalProps) => {
  React.useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <section className={cx(styles.wrapper, className)}>
        <h1 className={styles.title}>{title}</h1>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>
        asd
        {children}
      </section>
    </ModalOverlay>,
    modalsRoot,
  );
};
