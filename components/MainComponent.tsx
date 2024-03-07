"use client";
import React, { useState } from "react";
import Table from "./subComponentForMainComponent/Table";
import PopUpFROM from "./subComponentForMainComponent/PopUpFROM";

import SendTableSelectDataPopupEmail from "./subComponentForMainComponent/SendTableSelectDataPopupEmail";
import { useGetAllDataQuery, useSendMAilMutation } from "@/redux/api/Item_api";

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

  //api ca;;
  const {
    data: fetchData = [],
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useGetAllDataQuery({});

  //api call for email

  const [
    email,
    {
      isError: isErrorEmail,
      isLoading: isLoadingEmail,
      isSuccess: isSuccessEmail,
      error,
    },
  ] = useSendMAilMutation();

  //select and select all

  const [selectAll, setSelectAll] = useState(true);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  //

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const allIds = fetchData?.data?.map((item: any, i: any) => i + 1) || [];
      setSelectedRows(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelection = (id: number) => {
    console.log(id);
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  //api call

  return (
    <div>
      {isAddModalOpen && <PopUpFROM closeAddPopup={closeAddModal} />}
      {isSendMailOpen && (
        <SendTableSelectDataPopupEmail
          error={error}
          onCancel={closSendMailModal}
          isErrorEmail={isErrorEmail}
          isLoadingEmail={isLoadingEmail}
          isSuccessEmail={isSuccessEmail}
          onSendMail={async () => {
            console.log(selectedRows);
            let ans = fetchData?.data?.filter((item: any, index: any) =>
              selectedRows.includes(index + 1)
            );
            console.log(ans);
            const resForSendEmail = await email({ data: ans });
            console.log("resForSendEmail==", resForSendEmail);

            setTimeout(() => {
              closSendMailModal();
            }, 4000);
          }}
        />
      )}
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-5xl w-full p-8 border rounded-md shadow-md ">
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
            <Table
              //  data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              handleSelectAll={handleSelectAll}
              selectAll={selectAll}
              selectedRows={selectedRows}
              handleRowSelection={handleRowSelection}
              fetchData={fetchData}
              refetch={refetch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
