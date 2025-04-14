import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { useStore } from "../../store";
import { useEffect } from "react";
import { Modal } from "./Modal";
import { Form } from "../Form";
import { TASK_INITIAL_STATE, useModal } from "../../store/modal";

export const Layout = () => {
  const fetchData = useStore((store) => store.fetchData);
  const { isModalOpen, setIsModalOpen, setTaskData } = useModal();

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskData(TASK_INITIAL_STATE);
  };

  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Form />
      </Modal>
    </>
  );
};
