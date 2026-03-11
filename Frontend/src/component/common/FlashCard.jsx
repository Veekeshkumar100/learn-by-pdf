


import { useState } from "react";
import { Star } from "lucide-react";

const FlashCard = ({currentCard,onToggle}) => {
  const [flipped, setFlipped] = useState(false);
  const [starred, setStarred] = useState(false);
     
   
      
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center gap-6 p-6">

      {/* Modes */}
   
      {/* Flashcard */}
      <div
        className="w-full max-w-md cursor-pointer" style={{perspective:"1100px"}}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className="relative h-56 w-full rounded-2xl transition-transform duration-500 "
          style={{
            transformStyle:"preserve-3d",
            transform: flipped ? "rotateY(180deg)" : ""
          }}
        >

          {/* Question Side */}
          <div className="absolute inset-0 bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center text-center " style={{backfaceVisibility:"hidden"}}>
             <div className="absolute top-4 left-4 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition" >{currentCard.difficulty}</div>
            {/* Star Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
            onToggle(currentCard._id)
              }}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition"
            >
              <Star
                className={`w-5 h-5 ${
                  currentCard.isStarred ? "fill-yellow-400 text-yellow-400" : "text-slate-500"
                }`}
                
              />
            </button>

            <p className="text-lg font-semibold text-slate-800">
              {currentCard.question}
            </p>
          </div>

          {/* Answer Side */}
          <div className="absolute inset-0 bg-emerald-500 text-white rounded-2xl shadow-lg p-6 flex items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <p className="text-lg font-semibold">
              {currentCard.answer}
            </p>
          </div>
           

        </div>
      </div>

      {/* Selected Mode */}
      
    </div>
  );
};

export default FlashCard;