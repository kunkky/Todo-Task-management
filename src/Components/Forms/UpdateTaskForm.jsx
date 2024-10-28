import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { BaseUrl } from "../../../BaseUrl";
import { formatDate, convertToDateTimeLocal } from "../../Helper/utils";
import useHeaderData from "../../Hooks/useHeaderData";
import { ThreeCircles } from "react-loader-spinner";

const UpdateTaskForm = ({ todo }) => {
  console.log(todo);

  useEffect(() => {
    document.title = "Update Task";
  }, []);

  const { token } = useHeaderData();

  const formik = useFormik({
    initialValues: {
      name: todo?.name || "",
      due_date: convertToDateTimeLocal(todo?.deadline) || "",
      description: todo?.description || "",
      status: todo?.status || "pending",
    },
    enableReinitialize: true, // Ensure values update when todo prop changes
    validationSchema: Yup.object({
      due_date: Yup.string().required("Due date is required"),
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required").max(255),
      status: Yup.string().max(50),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.put(
          `${BaseUrl}tasks/${todo.id}`, // Adjust the URL to match your backend
          {
            ...values,
            due_date: formatDate(values.due_date, "d/m/y"), // Ensure this is in the correct format
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Task updated successfully!");
        } else {
          toast.warn("An unexpected error occurred.");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "An error occurred during update"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Task</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Task Name"
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
            type="datetime-local"
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
            "Update Task"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateTaskForm;
