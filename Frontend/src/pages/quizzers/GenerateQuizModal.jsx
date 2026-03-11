import { X, Sparkles } from "lucide-react";
import { useState } from "react";
import Spinner from "../../component/common/spinar";

const GenerateQuizModal = ({ onCancel, onGenerate,generating }) => {
  const [numQuestions, setNumQuestions] = useState("");

  const handleGenerate = () => {
    if (!numQuestions || numQuestions < 1) return;
    onGenerate(numQuestions);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center bg-black/40 backdrop-blur-sm pt-24 ">

      {/* Modal */}
      <div className="w-[90%] h-60 max-w-md bg-white rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in ">
              {
                generating ? (
                <div className=" flex justify-center items-center">
                <Spinner/>
                </div>
            ) : (
                <div className="w-full h-60 ">      <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Generate Quiz
          </h2>

          <button
            onClick={onCancel}
            className="p-1 rounded hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-sm text-gray-600">
            Number of Questions
          </label>

          <input
            type="number"
            min="1"
            placeholder="Enter number of questions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <Sparkles size={16} />
            Generate
          </button>

        </div>
        </div>
                )
              }
        {/* Header */}
      
      </div>
    </div>
  );
};

export default GenerateQuizModal;