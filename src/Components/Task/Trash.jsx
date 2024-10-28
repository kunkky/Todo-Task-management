import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import useHeaderData from "../../Hooks/useHeaderData";
import { BaseUrl } from "../../../BaseUrl";
import DynamicTable from "../Table/DynamicTable";
import Modal from "../Modal";
import DeleteCard from "../Cards/DeleteCard";
import { useNavigate } from "react-router-dom";
import DisplayTask from "./DisplayTask";
import { humanReadableDate, statusFinder } from "../../Helper/utils";

const Trash = ({ tasks }) => {
  const navigate = useNavigate();

  const { userInfo, token } = useHeaderData();

  const [modalContent, setModalContent] = useState(null);
  const [showModalButton, setShowModalButton] = useState(false);
  const [modalCaption, setModalCaption] = useState(null);
  const [reload, setReload] = useState(false);

  //modal
  const modalRef = useRef();

  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.openModal();
    }
  };

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.closeModal();
    }
  };

  const headers = ["Name", "Description", "Deadline", "created_at", "Status"];
  const actions = [
    {
      label: "Open Task",
      onClick: (item) => {
        // Reset modal state
        setModalCaption(<></>);
        setModalContent(null);
        setReload(false);

        setModalCaption(
          <h2 className="text-lg font-semibold">Task Details</h2>
        );
        setModalContent(<DisplayTask task={item} type={"task"} />);
        setShowModalButton(true);
        handleOpenModal();
      },
    },
    {
      label: "Restore Task",
      onClick: (item) => {
        // Reset modal state
        setModalCaption(<></>);
        setModalContent(null);
        setReload(false);

        setModalCaption(
          <h2 className="text-lg font-semibold mb-4 text-center w-full flex">
            Are you sure?
          </h2>
        );
        setModalContent(
          <DeleteCard
            todo={item}
            closeModal={handleCloseModal}
            type={"restore"}
            group="task"
          />
        );
        setShowModalButton(false);
        setReload(true);
        handleOpenModal();
      },
    },
    {
      label: "Delete Forever",
      onClick: (item) => {
        // Reset modal state
        setModalCaption(<></>);
        setModalContent(null);
        setReload(false);

        setModalCaption(
          <h2 className="text-lg font-semibold mb-4 text-center w-full flex">
            Are you sure?
          </h2>
        );
        setModalContent(
          <DeleteCard
            todo={item}
            closeModal={handleCloseModal}
            type={"hard"}
            group="task"
          />
        );
        setShowModalButton(false);
        setReload(true);
        handleOpenModal();
      },
    },
  ];

  const allTask = tasks.map((items) => ({
    id: items.id,
    todo_id: items.todo_id,
    user_id: items.user_id,
    deadline: items.due_date,
    description: items.description,
    status: items.status,
    system_status: statusFinder(items.due_date),
    name: items.name,
    isDeleted: items.isDeleted,
    created_at: humanReadableDate(items.created_at),
    updated_at: items.updated_at,
  }));

  return (
    <div className="w-full overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-5">
        <div className="w-full">
          <div className="bg-white overflow-auto">
            {tasks.length < 1 ? (
              <h1 className="sm:p-10 p-5 sm:text-3xl text-lg">
                No Tasks found!
              </h1>
            ) : (
              <DynamicTable
                data={allTask}
                headers={headers}
                actions={actions}
              />
            )}
          </div>
        </div>
        <Modal
          ref={modalRef}
          caption={modalCaption}
          modalContent={modalContent}
          reload={reload}
          autoOpen={true}
          showButton={showModalButton}
        />
      </main>
    </div>
  );
};

export default Trash;
