"use client";
import React, { useState } from "react";

const MainComponent = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isSendMailOpen, setIsSendMailOpen] = useState(false);

  const openSendMailModal = () => {
    setIsSendMailOpen(true);
  };

  const closSendMailModal = () => {
    setIsSendMailOpen(false);
  };
  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };
  return (
    <div>
      {isAddModalOpen && <PopUpFROM closeAddPopup={closeAddModal} />}
      {isSendMailOpen && (
        <SendTableSelectDataPopup
          onCancel={closSendMailModal}
          onSendMail={() => {}}
        />
      )}
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-4xl w-full p-8 border rounded-md shadow-md ">
          <div className="mb-4">
            <button
              onClick={openAddModal}
              className="bg-blue-500 text-white px-4 py-2 mr-2"
            >
              Add
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2"
              onClick={openSendMailModal}
            >
              Send Mail
            </button>
          </div>
          <div className="border-2 overflow-auto">
            <Table data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;

const Table = ({ data }: { data: any[] }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : data);
  };

  const handleRowSelection = (id: number) => {
    const updatedSelectedRows = selectedRows.includes(id)
      ? selectedRows.filter((rowId) => rowId !== id)
      : [...selectedRows, id];

    setSelectedRows(updatedSelectedRows);
  };

  return (
    <>
      <button
        className="bg-red-500 text-white px-2 py-1"
        onClick={() => {
          console.log(
            selectAll,
            selectedRows,
            "+======selectAll, selectedRows"
          );
        }}
      >
        console the selected data
      </button>
      <table className="w-full  border-2">
        <thead>
          <tr>
            <th className="px-4 py-2">
              <label>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                Select All
              </label>
            </th>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Phone </th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Hobbies</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample row, replace with your data mapping */}
          {data.map((item, i) => {
            const id = i + 1;
            return (
              <tr key={i}>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(id)}
                    onChange={() => handleRowSelection(id)}
                  />
                </td>
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">John Doe</td>
                <td className="px-4 py-2">1234567890</td>
                <td className="px-4 py-2">john@example.com</td>
                <td className="px-4 py-2">Reading, Coding</td>
                <td className="px-4 py-2 flex">
                  <button className="bg-yellow-500 text-white px-2 py-1 mr-2">
                    Update
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const PopUpFROM = ({ closeAddPopup }: { closeAddPopup: any }) => {
  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 max-w-md mx-auto rounded-md shadow-md">
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter phone number"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="hobbies"
              >
                Hobbies
              </label>
              <input
                type="text"
                id="hobbies"
                name="hobbies"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter hobbies"
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={closeAddPopup}
                className="bg-red-500 text-white px-4 py-2 mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

interface SendTableSelectDataPopupProps {
  onSendMail: () => void;
  onCancel: () => void;
}

const SendTableSelectDataPopup: React.FC<SendTableSelectDataPopupProps> = ({
  onSendMail,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 max-w-md mx-auto rounded-md shadow-md">
        <p className="mb-4">Send mail to "royhirakp@gmail.com"?</p>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-md"
            onClick={onSendMail}
          >
            Send Mail
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
