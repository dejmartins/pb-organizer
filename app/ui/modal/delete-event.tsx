import React, { FC } from "react";
import { IoTrash } from "react-icons/io5";
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[4000] transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } backdrop-blur-sm`}
    >
      <div
        className="bg-white rounded-[25px] p-6 max-w-sm w-full transform transition-transform duration-300 scale-100 flex items-center flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 bg-red-100 rounded-full">
          <div className="bg-partybank-red p-2 rounded-full">
            <IoTrash className="text-3xl text-white" />
          </div>
        </div>
        <h4 className="text-2xl font-extrabold text-center mb-4 mt-2">
          Delete Event
        </h4>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Are you sure you want to perform this action? Once event is deleted,
          action can’t be undo or revoked. Proceed?
        </p>

        <div className="flex gap-4  w-[100%]">
          <button
            className="flex-1 bg-red-200 font-extrabold py-3 px-8 rounded-md hover:bg-red-100"
            onClick={onClose}
          >
            No, Cancel
          </button>
          <button
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
            onClick={onDelete}
          >
            Delete Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;