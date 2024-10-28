import React from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

const TablePopover = ({ item, actions }) => {
  const handleActionClick = (action) => {
    if (action.onClick) {
      action.onClick(item); // Pass the item to the action handler
    }
  };

  return (
    <Popover className="relative">
      <PopoverButton>
        <span className="material-symbols-outlined">more_vert</span>{" "}
      </PopoverButton>
      <PopoverPanel
        anchor="bottom"
        className="flex flex-col bg-white rounded-xl shadow-lg min-w-[100px] "
      >
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleActionClick(action)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            {action.label}
          </button>
        ))}
      </PopoverPanel>
    </Popover>
  );
};

export default TablePopover;
