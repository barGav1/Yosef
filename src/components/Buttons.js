import React from 'react';

const Buttons = ({ onDelete, onCreate, onEdit, buttonClasses }) => {
  return (
    <div className="flex justify-between items-center">
              <button
        className={`bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-700 focus:outline-none ${buttonClasses}`}
        onClick={onEdit}
      >
        Edit
      </button>
      <button
        className={`bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-700 focus:outline-none ${buttonClasses}`}
        onClick={onDelete}
      >
        Delete
      </button>

    </div>
  );
};

export default Buttons;
