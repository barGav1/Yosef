import React from 'react';
import Card from '../components/Card.js';
import resumeIcon from '../Files/Resume_icon.png';
import ExampleResume from '../Files/ResumeExample.png';
const cards = [
  {
    title: 'Resume 1',
    description: 'This is the description for card 2.',
    image: ExampleResume, // Replace with your image URL
  },
  {
    title: 'Resume 1',
    description: 'This is the description for card 2.',
    image: ExampleResume, // Replace with your image URL
  },
  {
    title: 'Resume 1',
    description: 'This is the description for card 3.',
    image: ExampleResume, // Replace with your image URL
  },
  {
    title: 'Resume 1',
    description: 'This is the description for card 4.',
    image: ExampleResume, // Replace with your image URL
  },
];

// const handleDelete = (card) => {
//   // Implement logic to delete the card (e.g., remove from state or database)
//   console.log('Delete card:', card.title);
// };

// const handleEdit = (card) => {
//   // Implement logic to edit the card (e.g., navigate to an edit form)
//   console.log('Edit card:', card.title);
// };

const ResumeViewer = () => {
  return (
    <div className='bg-[#F9F7F7] min-h-screen'>
    <a href="/#" className="-m-1.5 p-1.5">
    <span className="sr-only">Your Company</span>
    <img className="h-16 w-auto hover:bg-slate-100" src={resumeIcon} alt=""/> 
</a>
    <div className="flex flex-rows gap-4  ">
      
      {cards.map((card) => (
        <div key={card.title} className="flex flex-col gap-2">
          <Card {...card} />
        </div>
      ))}
    </div>
    </div>
  );
};

export default ResumeViewer;
