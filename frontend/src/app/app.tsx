import React, { useState } from "react";

import { Modal } from "@/shared/ui/modal";

import "./app.css";
import s from "./app.module.css";

export const App = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <>
      <button className={s.intro} onClick={() => setModalOpened(true)}>
        Оооткрыть модалку!
      </button>

      {modalOpened && (
        <Modal title="Привет я заголовок модалки" onClose={() => setModalOpened(false)}>
          привет я контент модалки
        </Modal>
      )}
    </>
  );
};
