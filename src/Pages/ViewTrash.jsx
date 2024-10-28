import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import useHeaderData from "../Hooks/useHeaderData";
import Modal from "../Components/Modal";
import Header from "../Components/Header";
import Trash from "../Components/Task/Trash";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BaseUrl } from "../../BaseUrl";

const ViewTrash = () => {
  const { userInfo, token } = useHeaderData();
  const [tasks, setTasks] = useState(null); // default to null to differentiate from empty array
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    document.title = "Todo - Tasks";
  }, []);

  // Fetch todo
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      if (token) {
        const response = await axios.get(`${BaseUrl}tasks/trash`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setTasks(response?.data?.tasks?.data);
          setLoading(false);
        } else {
          setTasks(null);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      setTasks(null);
      console.error("Error fetching Tasks:", error.message);
    }
  }, [token]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  console.log(tasks);

  return (
    <div className="bg-gray-100 font-family-karla flex flex-col mx-10 min-h-screen">
      {/* Header */}
      <Header userInfo={userInfo} />

      {/* Main Content */}
      {tasks ? (
        <main className="bg-white shadow-md mt-6 p-6 flex-1">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-4">Your Task Trash</h2>
          </div>

          {/* Loading, Error, or Data Display */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {tasks ? <Trash tasks={tasks} /> : <div>No tasks available.</div>}
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

export default ViewTrash;
