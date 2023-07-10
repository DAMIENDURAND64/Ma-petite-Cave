import { Modal } from "@mantine/core";
import React from "react";

type Props = {
  openedWineModalConsumed: boolean;
  closeWineModalConsumed: () => void;
};

const ModalWineConsumed = ({
  openedWineModalConsumed,
  closeWineModalConsumed,
}: Props) => {
  return (
    <Modal
      opened={openedWineModalConsumed}
      onClose={closeWineModalConsumed}
      title="Authentication"
    >
      <h1>Hello</h1>
    </Modal>
  );
};

export default ModalWineConsumed;
