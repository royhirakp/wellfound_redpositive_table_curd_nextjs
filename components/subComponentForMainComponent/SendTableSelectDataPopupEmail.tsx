import React from "react";
interface SendTableSelectDataPopupProps {
  onSendMail: () => void;
  onCancel: () => void;
  isErrorEmail: any;
  isLoadingEmail: any;
  isSuccessEmail: any;
}
const SendTableSelectDataPopupEmail: React.FC<
  SendTableSelectDataPopupProps
> = ({
  onSendMail,
  onCancel,
  isErrorEmail,
  isLoadingEmail,
  isSuccessEmail,
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
            {isLoadingEmail ? "sending..." : "send Mail"}
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
        <div>
          {isErrorEmail && "Error! please try agin later "}
          {isSuccessEmail && "Email send ! successfully"}
        </div>
      </div>
    </div>
  );
};

export default SendTableSelectDataPopupEmail;
