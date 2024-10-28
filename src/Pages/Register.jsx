import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";
import { BaseUrl } from "./../../BaseUrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "./../assets/images/logo.png";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const response = await axios.post(`${BaseUrl}register`, {
          ...values,
          password_confirmation: values.confirmPassword,
        });
        if (response && response.status === 200) {
          const { user, token, message } = response.data;

          // Store user data and token separately
          sessionStorage.setItem("user", JSON.stringify(user));
          sessionStorage.setItem("token", JSON.stringify(token));

          // Show success toast and navigate
          toast.success(message);
          setTimeout(() => {
            navigate("/dashboard", {
              state: {
                message: `Welcome ${user.name}`,
              },
              replace: true,
            });
          }, 3000);
        } else {
          toast.warn(response.data.message || "An unexpected error occurred.");
        }
      } catch (error) {
        setFieldError(
          "apiresponse",
          error?.response?.data?.message ||
            error.message ||
            "Registration error occurred"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-screen h-screen p-10 flex justify-center items-center">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={Logo} className="mx-auto h-16 w-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register a new account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                {...formik.getFieldProps("name")}
                className="px-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-600 text-sm">{formik.errors.name}</div>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                {...formik.getFieldProps("email")}
                className="px-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-600 text-sm">
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  className="px-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-600 text-sm">
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...formik.getFieldProps("confirmPassword")}
                  className="px-2 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="text-red-600 text-sm">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>

            {/* Submit Button */}
            <div>
              {formik.errors.apiresponse && (
                <div className="text-red-600 text-sm">
                  {formik.errors.apiresponse}
                </div>
              )}
              {formik.isSubmitting ? (
                <button
                  disabled
                  className="flex justify-center items-center w-full text-white bg-gradient-to-r rounded-lg from-[#100257] to-[#BA0D76] py-2.5"
                >
                  <ThreeCircles height="25" width="25" color="#ffffff" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-gradient-to-r from-[#100257] to-[#BA0D76] py-2.5 rounded-lg"
                >
                  Register
                </button>
              )}
            </div>
          </form>
          <div className="flex gap-1 mt-3">
            <p>Returning user?</p>
            <Link to="/login" className="text-[#e01c92]">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
