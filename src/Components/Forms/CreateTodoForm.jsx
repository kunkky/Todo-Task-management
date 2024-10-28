import React, { useLayoutEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { BaseUrl } from "../../../BaseUrl";
import useHeaderData from "../../Hooks/useHeaderData";
import { ThreeCircles } from "react-loader-spinner";
import { formatDate } from "../../Helper/utils";

const CreateTodoForm = () => {
  useLayoutEffect(() => {
    document.title = "Create Todo";
  }, []);

  const { userInfo, token } = useHeaderData();

  const formik = useFormik({
    initialValues: {
      name: "",
      deadline: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required").max(255),
      deadline: Yup.string().required("Deadline is required"),
      description: Yup.string().nullable(),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const response = await axios.post(
          `${BaseUrl}createtodo`,
          {
            ...values,
            deadline: formatDate(values.deadline),
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
          toast.warn(response.data.message || "An unexpected error occurred.");
        }
      } catch (error) {
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
      <h2 className="text-2xl font-bold mb-4">Create Todo</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
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
            Deadline
          </label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            {...formik.getFieldProps("deadline")}
            className={`block w-full border border-gray-300 rounded-md p-2 ${
              formik.touched.deadline && formik.errors.deadline
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.deadline && formik.errors.deadline && (
            <div className="text-red-600 text-sm">{formik.errors.deadline}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Description (optional)
          </label>
          <textarea
            id="description"
            name="description"
            {...formik.getFieldProps("description")}
            className="block w-full border border-gray-300 rounded-md p-2"
          />
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
            "Create Todo"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateTodoForm;
