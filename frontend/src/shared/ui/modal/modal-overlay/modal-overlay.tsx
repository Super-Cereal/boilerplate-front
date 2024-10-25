import React, { ReactNode } from "react";

import { accessibleClick } from "@/shared/lib/a11y";

import styles from "./modal-overlay.module.css";

interface IOverlayProps {
  onClose: () => void;
  children: ReactNode;
}

export const ModalOverlay = ({ onClose, children }: IOverlayProps) => (
  <div className={styles.back}>
    <div className={styles.shadow} {...accessibleClick(onClose)} />
    {children}
  </div>
);
