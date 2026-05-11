import React from "react";
import { useNavigate } from 'react-router-dom';
import {
  BrainCircuit,
  SparklesIcon,
  Trash2,
  TrendingUp,
} from "lucide-react";

const FlashCardsSetCard = ({ flashCard, onDelete }) => {
  
  const navigate = useNavigate();
  const handleStudyNow = () => {
    navigate(`/documents/${flashCard.documentId._id}/flashcards`);
  };

  const reviewedCount = flashCard.cards.filter(
    (set) => set.lastReviewed,
  ).length;
  const totalCard = flashCard.cards.length;
  const progress =
    totalCard > 0 ? Math.round((reviewedCount / totalCard) * 100) : 0;

  return (
    <div className=" max-w-md mx-autu md:max-w-2xl " on >
      <div className="  w-full bg-linear-to-br from-purple-400 to-purple-600 rounded-xl shadow-lg overflow-hidden  transform hover:scale-105 transition duration-300 ease-in-out p-4 mt-8 ">
        {/* Delete Button */}
        <button
          onClick={(e) =>{ e.stopPropagation(), onDelete(flashCard?._id)}}
          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-red-500 hover:text-white transition"
        >
          <Trash2 className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="  w-10  h-10 bg-white/20 backdrop-blur-md  rounded-full text-white  flex items-center justify-around">
            <BrainCircuit className="w-6 h-6 " />
          </div>
          <h2 className="text-2xl font-bold text-white flex flex-col ">
            {flashCard?.documentId?.title}
          </h2>

          <span className="text-sm text-purple-100">
            Created: {new Date(flashCard.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Total Questions */}
        <div className="text-white text-sm mb-4">
          <p className="flex gap-4">
            {/* Total Questions:{" "} */}
            <span className="bg-white/20 backdrop-blur-md  rounded-full text-white p-2 shadow-2xl shadow-white flex justify-center items-center">
              {totalCard} Question
            </span>
            <span className="bg-white/20 backdrop-blur-md  rounded-full text-white p-2 shadow-2xl shadow-white flex justify-center items-center gap-2">
              <TrendingUp /> {`${Math.round(progress)}%`}
            </span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-base font-medium text-white">Progress</span>
            <span className="text-sm font-medium text-white">
              {`${reviewedCount}/${totalCard} reviewed`}
            </span>
          </div>

          <div className="w-full bg-purple-200 rounded-full h-2.5">
            <div
              className="bg-purple-400 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button onClick={handleStudyNow} className="px-8 py-3 bg-white text-purple-700 font-bold rounded-full text-lg shadow-md hover:bg-purple-50 hover:text-purple-800 transition duration-300 ease-in-out transform hover:-translate-y-1 flex justify-center items-center gap-2">
            <SparklesIcon />
            Study Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashCardsSetCard;
