import React, { useState } from "react";
import ResumePreview from "./ResumePreview";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
const Card = ({ title, userData, levels, resumeNumber, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleEdit = () => {
    if (resumeNumber === 0) {
      navigate("/ResumeMaker");
    } else {
      navigate(`/ResumeMaker/${resumeNumber}`);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/users/${userData.user_id}/resumes/${resumeNumber}`);
      onDelete(resumeNumber);
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
      <div
        className="relative flex-grow"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="hover:bg-gray-200 w-full h-full min-h-[400px] rounded-t-lg flex items-center justify-center mx-auto overflow-hidden">
          <ResumePreview userData={userData} levels={levels} />
        </div>
        <button
          type="button"
          onClick={handleEdit}
          className={`absolute bottom-4 ${
            isHovered ? "opacity-100" : "opacity-0"
          } left-4 rounded-full border-2 border-neutral-800 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-100 hover:text-neutral-800 focus:border-neutral-800 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 motion-reduce:transition-none dark:text-neutral-600 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900`}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className={`absolute bottom-4 right-4 ${
            isHovered ? "opacity-100" : "opacity-0"
          } rounded-full border-2 border-red-500 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-red-500 transition duration-150 ease-in-out hover:border-red-700 hover:bg-red-100 focus:border-red-700 focus:outline-none focus:ring-0 active:border-red-800 active:text-red-800 motion-reduce:transition-none dark:text-neutral-600 dark:hover:bg-red-800 dark:focus:bg-red-800`}
        >
          Delete
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
      </div>
    </div>
  );
};

export default Card;
