import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../BaseUrl";
import axios from "axios";
import useHeaderData from "../Hooks/useHeaderData";
import { toast } from "react-toastify";

const Logout = () => {
  const { userInfo } = useHeaderData();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axios.post(`${BaseUrl}logout`, { userId: userInfo._id });
      toast.success("You have been signed out successfully");
    } catch (error) {
      toast.error("An error occurred while signing out. Please try again.");
    } finally {
      // Clear session data and navigate back to login
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      setTimeout(() => {
        navigate("/login", {
          state: {
            message: "Signed out successfully",
          },
          replace: true,
        });
      }, 1000);
    }
  };

  useEffect(() => {
    logoutHandler();
  }, []);

  return <div>Signing out...</div>;
};

export default Logout;
