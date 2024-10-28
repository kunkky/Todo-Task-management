import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import useHeaderData from "../Hooks/useHeaderData";
import Modal from "../Components/Modal";
import Header from "../Components/Header";
import Tasks from "../Components/Task/Tasks";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BaseUrl } from "../../BaseUrl";
import CreateTaskForm from "../Components/Forms/CreateTaskForm";

const ViewTodo = () => {
  const { userInfo, token } = useHeaderData();
  const [todos, setTodos] = useState(null); // default to null to differentiate from empty array
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useLayoutEffect(() => {
    document.title = "Todo - Tasks";
  }, []);

  // Fetch todo
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      if (id && token) {
        const response = await axios.get(`${BaseUrl}todos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setTodos(response?.data?.data);
          setLoading(false);
        } else {
          setTodos(null);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      setTodos(null);
      console.error("Error fetching Tasks:", error.message);
    }
  }, [token, id]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  console.log(todos);

  return (
    <div className="bg-gray-100 font-family-karla flex flex-col mx-10 min-h-screen">
      {/* Header */}
      <Header userInfo={userInfo} />

      {/* Main Content */}
      {todos ? (
        <main className="bg-white shadow-md mt-6 p-6 flex-1">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-4">
              Your Todo ({todos?.name}) tasks
            </h2>
            <div>
              <Modal
                caption={<p>Add Task to</p>}
                modalContent={<CreateTaskForm todo={todos} />}
                captionButton={true}
                reload={true}
                showButton={true}
              />
              <small>add task to {todos?.name}</small>
            </div>
          </div>

          {/* Loading, Error, or Data Display */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {todos ? <Tasks todo={todos} /> : <div>No tasks available.</div>}
            </>
          )}
        </main>
      ) : (
        <>Task not found</>
      )}

      <ToastContainer />
    </div>
  );
};

export default ViewTodo;
