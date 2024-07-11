import React, { useState } from 'react';

const Card = ({ title, description, image }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {image && (
          <div className="hover:bg-gray-200 w-70 h-[92%] object-cover rounded-t-lg flex items-center justify-center mx-auto">
            <img src={image} alt={title} className="w-full h-full object-cover rounded-t-lg" />
          </div>
        )}
        <button
          type="button"
          className={`absolute top-64 ${isHovered ? 'opacity-100' : 'opacity-20'} left-20 rounded-full border-2 border-neutral-800 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:border-neutral-800 hover:bg-neutral-100 hover:text-neutral-800 focus:border-neutral-800 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none focus:ring-0 active:border-neutral-900 active:text-neutral-900 motion-reduce:transition-none dark:text-neutral-600 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900`}
        >
          Edit
        </button>
        <button
          type="button"
          className={`absolute top-64 right-20 ${isHovered ? 'opacity-100' : 'opacity-20'} rounded-full border-2 border-red-500 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-red-500 transition duration-150 ease-in-out hover:border-red-700 hover:bg-red-100 focus:border-red-700 focus:outline-none focus:ring-0 active:border-red-800 active:text-red-800 motion-reduce:transition-none dark:text-neutral-600 dark:hover:bg-red-800 dark:focus:bg-red-800`}
        >
          Delete
        </button>
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default Card;
