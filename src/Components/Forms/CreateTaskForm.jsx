import React, { useLayoutEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { BaseUrl } from "../../../BaseUrl";
import { formatDate } from "../../Helper/utils";
import useHeaderData from "../../Hooks/useHeaderData";
import { ThreeCircles } from "react-loader-spinner";

const CreateTaskForm = ({ todo }) => {
  useLayoutEffect(() => {
    document.title = "Create Task";
  }, []);

  const { userInfo, token } = useHeaderData();

  const formik = useFormik({
    initialValues: {
      todo_id: todo.id, // New field for todo ID
      due_date: "",
      description: "",
      name: "",
      status: "pending", // Default status
    },
    validationSchema: Yup.object({
      due_date: Yup.string().required("Due date is required"),
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required").max(255),
      status: Yup.string().max(50),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const response = await axios.post(
          `${BaseUrl}tasks`, // Adjust the URL to match your backend
          {
            ...values,
            due_date: formatDate(values.due_date, "d/m/y"), // Ensure this is in the correct format
            todo_id: todo.id, // Ensure this is in the correct format
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          resetForm(); // Clear the form on successful submission
        } else {
          console.log("error here 1 -->", response?.data);
          toast.warn(response.data.message || "An unexpected error occurred.");
        }
      } catch (error) {
        console.log("error here 2 -->", error);
        toast.error(
          error.response?.data?.message || "An error occurred during submission"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Task</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text" // Use text input for custom date formatting
            placeholder="Task Name" // Placeholder for user guidance
            {...formik.getFieldProps("name")}
            className={`block w-full border border-gray-300 rounded-md p-2 ${
              formik.touched.name && formik.errors.name ? "border-red-500" : ""
            }`}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-600 text-sm">{formik.errors.name}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Due Date
          </label>
          <input
            id="due_date"
            name="due_date"
            type="datetime-local" // Use text input for custom date formatting
            placeholder="dd/mm/yyyy HH:mm" // Placeholder for user guidance
            {...formik.getFieldProps("due_date")}
            className={`block w-full border border-gray-300 rounded-md p-2 ${
              formik.touched.due_date && formik.errors.due_date
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.due_date && formik.errors.due_date && (
            <div className="text-red-600 text-sm">{formik.errors.due_date}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            {...formik.getFieldProps("description")}
            className={`block w-full border border-gray-300 rounded-md p-2 ${
              formik.touched.description && formik.errors.description
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-600 text-sm">
              {formik.errors.description}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Status
          </label>
          <select
            id="status"
            name="status"
            {...formik.getFieldProps("status")}
            className="block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="in_progress">In Progress</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full text-white bg-gradient-to-r from-[#100257] to-[#BA0D76] hover:from-[#0d0148] hover:to-[#e01c92] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          {formik.isSubmitting ? (
            <ThreeCircles
              height="25"
              width="25"
              radius="5"
              color="#ffffff"
              ariaLabel="three-circles-loading"
            />
          ) : (
            "Create Task"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
