import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import useHeaderData from "../Hooks/useHeaderData";
import Modal from "../Components/Modal";
import { ToastContainer } from "react-toastify";
import CreateTodoForm from "../Components/Forms/CreateTodoForm";
import Header from "../Components/Header";
import Todos from "../Components/Todo/Todos";

const MyDashboard = () => {
  const { userInfo } = useHeaderData();

  useLayoutEffect(() => {
    document.title = "Todo - Dashboard";
  }, []);

  return (
    <div className="bg-gray-100 font-family-karla flex flex-col mx-10 min-h-screen">
      {/* Header */}
      <Header userInfo={userInfo} />
      {/* Main Content */}
      <main className="bg-white shadow-md mt-6 p-6 flex-1">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-4">Your Todo List</h2>
          <Modal
            caption={<p>Add Todo</p>}
            modalContent={<CreateTodoForm />}
            captionButton={true}
            reload={true}
            showButton={true}
          />
        </div>

        {/* Simple Table */}
        <Todos />
      </main>
      <ToastContainer />
    </div>
  );
};

export default MyDashboard;
