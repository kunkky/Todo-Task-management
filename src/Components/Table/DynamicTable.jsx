import React, { useState } from "react";
import TablePopover from "./TablePopover"; // Create a TablePopover component for actions
import TablePagination from "./TablePagination";
import TaskLabel from "../Task/TaskLabel";

const DynamicTable = ({ data, headers, actions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can adjust this value
  const [filteredData, setFilteredData] = useState(data);

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = data.filter((item) =>
      headers.some((header) => {
        const key = header.toLowerCase().replace(/ /g, "");
        return item[key] && item[key].toString().toLowerCase().includes(term);
      })
    );
  
    setFilteredData(filtered);
  };
  

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-x-auto">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border px-4 py-2 text-left">
                {header}
              </th>
            ))}
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr key={item.id}>
                {headers.map((header, index) =>
                  header != "Status" ? (
                    <td key={index} className="border px-4 py-2">
                      {item[header.toLowerCase().replace(/ /g, "")]}
                    </td>
                  ) : (
                    <td key={index} className="border px-4 py-2">
                      <p className="text-[8px] text-nowrap capitalize">
                        Task Status:{" "}
                        {item[header.toLowerCase().replace(/ /g, "")]}
                      </p>
                      <div className="text-[8px]">
                        Status Reality:
                        <TaskLabel status={item.system_status} />
                      </div>
                    </td>
                  )
                )}
                <td className="border px-4 py-2">
                  <TablePopover item={item} actions={actions} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length + 1}
                className="border text-center py-2"
              >
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <TablePagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredData.length}
        paginate={paginate}
      />
    </div>
  );
};

export default DynamicTable;
