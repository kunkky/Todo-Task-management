import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ThreeCircles } from "react-loader-spinner";
import { BaseUrl } from "../../../BaseUrl";
import useHeaderData from "../../Hooks/useHeaderData";

const DeleteCard = ({ closeModal, todo, type = null, group = "todo" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo, token } = useHeaderData();

  const handleDelete = async () => {
    const endpoint = `${BaseUrl}${group == "todo" ? "todos/" : "tasks/"}${
      todo.id
    }${type ? `/${type}` : ""}`;
    setIsLoading(true);

    try {
      const response = await (type === "soft" || type === "restore"
        ? axios.post(
            endpoint,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        : axios.delete(endpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }));
      if (response.status === 200) {
        toast.success(
          response?.data?.message ||
            response?.message ||
            "Action performed successfully!"
        );
        closeModal();
        // window.location.reload();
      } else {
        toast.warn("Unexpected response, please try again.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during deletion"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 w-full">
      <div className="flex justify-end gap-2">
        <button
          onClick={closeModal}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded w-1/2"
          disabled={isLoading}
        >
          No
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded w-1/2 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <ThreeCircles
              height="25"
              width="25"
              radius="5"
              color="#ffffff"
              ariaLabel="three-circles-loading"
            />
          ) : (
            "Yes"
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteCard;
