import React, { useLayoutEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";
import { BaseUrl } from "./../../BaseUrl";
import { toast, ToastContainer } from "react-toastify";

import Logo from "./../assets/Images/logo.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  useLayoutEffect(() => {
    document.title = "Todo app";
    if (sessionStorage.getItem("user")) {
      window.location.href = "/dashboard";
    }
  }, []);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .min(5, "Length must be at least 5")
        .required("Valid Customer Id is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const response = await axios.post(`${BaseUrl}login`, values);
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
          }, 1000);
        } else {
          toast.warn(response.data.message || "An unexpected error occurred.");
        }
      } catch (error) {
        setFieldError(
          "apiresponse",
          error?.response?.data?.message || error.message
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  {...formik.getFieldProps("email")}
                  className="px-2 block w-full rounded-md border border-slate-500 py-1.5 text-red-900 shadow-sm ring-2 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  required
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-600 text-sm">
                    {formik.errors.email}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-red-600 hover:text-red-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  className="px-2 block w-full rounded-md border border-slate-500 py-1.5 text-red-900 shadow-sm ring-2 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-2 flex items-center text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-600 text-sm">
                    {formik.errors.password}
                  </div>
                )}
              </div>
            </div>

            <div>
              {formik.errors.apiresponse && (
                <div className="text-red-600 text-sm mt-0">
                  {formik.errors.apiresponse}
                </div>
              )}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="flex justify-center items-center w-full text-white bg-gradient-to-r from-[#100257] to-[#BA0D76] hover:from-[#0d0148] hover:to-[#e01c92] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
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
                  "Log In"
                )}
              </button>
            </div>
          </form>
          <div className="flex gap-1 mt-3">
            <p>New User?</p>
            <Link to="/register" className="text-[#e01c92]">
              Register Now
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
