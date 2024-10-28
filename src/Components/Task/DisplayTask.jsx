import React from "react";
import { BiLoader, BiSad } from "react-icons/bi";
import { CiWarning } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import { statusFinder, timeDifference } from "../../Helper/utils";
import TaskLabel from "./TaskLabel";

const DisplayTask = ({ task, type = "todo" }) => {
  console.log(task);
  let status;
  if (type == "todo") {
    status = statusFinder(task?.due_date);
  } else {
  }

  return (
    <div className="w-full">
      <div className=" bg-white gap-2 flex flex-col">
        <h3 className="text-xl font-semibold text-purple-900">{task.name}</h3>
        <p className=" text-gray-700">{task.description}</p>
        <p className="text-sm text-gray-500">
          Deadline: {new Date(task.deadline).toLocaleDateString()}
        </p>
        <p className="text-xs text-gray-400"></p>
        <p className="text-gray-500 text-xs capitalize">
          User Status: {task.status}
        </p>
        {type == "task" && (
          <>
            <div className="text-[8px]">
              Status Reality:
              <TaskLabel status={task.system_status} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayTask;
