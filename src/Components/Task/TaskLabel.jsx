import { EyeSlashIcon } from "@heroicons/react/24/solid";
import React from "react";
import { BiLoader, BiSad } from "react-icons/bi";
import { CiWarning } from "react-icons/ci";
import { MdDone } from "react-icons/md";

const TaskLabel = ({ status }) => {
  console.log(status);

  return (
    <p
      className={`text-white text-xs p-1 w-fit capitalize flex items-center gap-1 rounded-lg "
      }
          ${status == "more than 3 days" && " bg-green-800"}
          ${status == "urgent" && " bg-red-700"}
          ${status == "expired" && " bg-gray-400"}
          ${status == "a day" && " bg-amber-500"}
          ${status == "completed" && " bg-blue-700"}
          `}
    >
      {status == "more than 3 days" && <BiLoader />}
      {status == "urgent" && <CiWarning />}
      {status == "a day" && <EyeSlashIcon />}
      {status == "completed" && <MdDone />}
      {status == "expired" && <BiSad />}
      {status == "more than 3 days" && "Pending"}
      {status == "expired" && "expired"}
      {status == "urgent" && "Urgent"}
      {status == "completed" && "Completed"}
      {status == "a day" && "today"}
    </p>
  );
};

export default TaskLabel;
