import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useHeaderData from "../../Hooks/useHeaderData";
import { BaseUrl } from "../../../BaseUrl";
import Modal from "../Modal";
import DynamicTable from "../Table/DynamicTable";
import CreateTaskForm from "../Forms/CreateTaskForm";
import DeleteCard from "../Cards/DeleteCard";
import UpdateTodoForm from "../Forms/UpdateTodoForm";

const Todos = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const { userInfo, token } = useHeaderData();

  const [modalContent, setModalContent] = useState();
  const [showModalButton, setShowModalButton] = useState(false);
  const [modalCaption, setModalCaption] = useState();

  const fetchTasks = useCallback(async () => {
    try {
      if (userInfo) {
        const response = await axios.get(`${BaseUrl}todos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setTasks(response?.data?.data?.data);
        } else {
          // setTasks(sampleTransaction);
        }
      }
    } catch (error) {
      console.error("Error fetching Tasks:", error.message);
      // Optionally set an error state here to display in the UI
    }
  }, [token, userInfo?._id]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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

  const headers = ["Name", "Description", "Deadline", "created_at"];
  const actions = [
    {
      label: "Open Task",
      onClick: (item) => {
        navigate(`/todo/${item.id}`);
      },
    },

    {
      label: "Create Task",
      onClick: (item) => {
        setModalCaption(`Create task for ${item.name}`);
        setModalContent(<CreateTaskForm todo={item} />);
        setShowModalButton(true);
        handleOpenModal();
      },
    },
    {
      label: "Update todo",
      onClick: (item) => {
        setModalCaption(`Update ${item.name}`);
        setModalContent(<UpdateTodoForm todo={item} />);
        setShowModalButton(true);
        handleOpenModal();
      },
    },
    {
      label: "Delete Task",
      onClick: (item) => {
        setModalCaption(
          <h2 className="text-lg font-semibold mb-4 text-center w-full flex">
            Are you sure ?
          </h2>
        );
        setModalContent(
          <DeleteCard todo={item} closeModal={handleCloseModal} />
        );
        setShowModalButton(false);
        handleOpenModal();
      },
    },
  ];

  return (
    <div className="w-full overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="text-3xl text-black pb-6">Tasks</h1>

        <div className="w-full mt-12">
          <div className="bg-white overflow-auto">
            {tasks.length < 1 ? (
              <h1 className="sm:p-10 p-5 sm:text-3xl text-lg">
                No Tasks found!
              </h1>
            ) : (
              // pagination here
              <DynamicTable data={tasks} headers={headers} actions={actions} />
            )}
          </div>
        </div>
        {/* modal to create task */}
        <Modal
          ref={modalRef}
          caption={modalCaption}
          modalContent={modalContent}
          reload={false}
          autoOpen={true}
          showButton={showModalButton}
        />
      </main>
    </div>
  );
};

export default Todos;
