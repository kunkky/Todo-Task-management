import React from "react";
import { Link } from "react-router-dom";

const Header = ({ userInfo }) => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-xl font-bold">
        Dashboard
      </Link>
      <div className="flex items-center gap-4">
        <span>{userInfo?.name || "User"}</span>
        <Link to="/trash" className="text-purple-900 flex items-center">
          <span className="material-symbols-outlined">delete_sweep</span>{" "}
          <p>View Trash</p>
        </Link>
        <Link to="/logout" className="text-red-900 flex items-center">
          <span className="material-symbols-outlined">logout</span>{" "}
          <p>Sign out</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
