import React, { useState, useEffect } from "react";
import { usePersonStore } from "../store/personStore.js";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx"


export default function ViewTableData() {
  const personData = usePersonStore((state) => state.personData);
  const getApi = usePersonStore((state) => state.getApi);
  const navigate = useNavigate();
  const [itemIdToDelete, setItemIdToDelete] = useState(0);
  const deletePersonApi = usePersonStore((state) => state.deletePersonApi);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    getApi();
    if (personData.length === 0) {
      getApi();
    }
  }, []);

  const openDeleteDialog = (itemId) => {
    setItemIdToDelete(itemId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handlePrintAll = () => {
    // Implement logic to print all rows here
    window.print();
  };

  const handlePrintSelected = () => {
    // Implement logic to print selected row(s) here
    window.print();


    
  };
  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(personData); // Convert your data to a worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); // Add the worksheet to a workbook

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, "table_data.xlsx");
};

  return (
    <div className="flex flex-col">
       <button
        onClick={handleExportToExcel}
        className="px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Export to Excel
      </button>
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 pl-4">
                    <div className="flex items-center h-5">
                      <input
                        id="checkbox-all"
                        type="checkbox"
                        className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="checkbox" className="sr-only">
                        Checkbox
                      </label>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Photo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {personData.map((per) => (
                  <tr key={per.id}>
                    <td className="py-3 pl-4">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="checkbox" className="sr-only">
                          Checkbox
                        </label>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {per.id}
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={"http://127.0.0.1:8000/images/"+per.ImageName}// Replace with the actual photo URL
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {per.FirstName + " " + per.LastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {per.Email}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <button
                        className="text-green-500 hover:text-green-700"
                        onClick={() => navigate(`/edit/${per.id}`)}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <button
                        data-modal-target="popup-modal"
                        data-modal-toggle="popup-modal"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => openDeleteDialog(per.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isDeleteDialogOpen && (


          





        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-4 rounded shadow-md">
            <p>Are you sure you want to delete this item?</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => {
                  deletePersonApi(itemIdToDelete);
                  closeDeleteDialog();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={closeDeleteDialog}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
