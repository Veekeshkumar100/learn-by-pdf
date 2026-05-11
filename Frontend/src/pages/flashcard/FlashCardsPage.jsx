import { useState } from "react";
import { ArrowLeftIcon, ChevronLeft, ChevronRight,  Trash2 } from "lucide-react";
import {
  deleteFlashCard,
  getAllFlashCardSets,
  reviewedCount,
  toggleStarredFlshCards,
} from "../../services/flashCardservice";
import { generateFlashCards } from "../../services/aiServices";
import toast from 'react-hot-toast';
import { Navigate, useParams } from "react-router-dom";
import Spinner from "../../component/common/spinar";
import EmptySet from "../../component/common/EmptySet";
import FlashCard from "../../component/flascard/FlashCard";
import { useEffect } from "react";

const FlashCardsPage = ({}) => {
  const [flipped, setFlipped] = useState(false);
  const [starred, setStarred] = useState(false);

  const { id } = useParams();
  const [flashcardSet, setFlashCardSet] = useState([]);
  const [selectedSet, SetSelectedSet] = useState(null);
  const [FlashCards, setFlashCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCordIndex, SetcurrentCardIdex] = useState(0);
  const [generatingFlashCardSet , setGeneratingFlashCardSet] = useState(false);
  const handleFetchFlashCardPage = async () => {
    setLoading(true);
    try {
      const responce = await getAllFlashCardSets(id);
      setFlashCardSet(responce?.data[0]);
      setFlashCards(responce.data[0]?.cards || []);
    } catch (error) {
      console.log(error.message || "fialed to fetched document");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleFetchFlashCardPage();
  }, []);

  const generatFlaCardset = async () => {
    setGeneratingFlashCardSet(true);
    try {
      await generateFlashCards(documentId);
      handleFetchFlashCardPage();
    } catch (error) {
      console.log(error.message || "fialed to fetched document");
    } finally {
      setGeneratingFlashCardSet(false);
    }
  };

  const handleToggleStart = async (id) => {
    try {
      await toggleStarredFlshCards(id);
        setFlashCards((preFlashCard)=>{
          return preFlashCard.map((card)=>{
           return card._id === id
              ? { ...card, isStarred: !card.isStarred }
              : card;
          })
        })
          toast.success("FlashCard Stared successfully");
    } catch (error) {
      console.log(error || "Failed to toggle star");
      toast.error("Failed to toggle star");
    }
  };
  const handelReviewed = async () => {
    const currentCard =FlashCards[currentCordIndex];
    try {
      await reviewedCount(currentCard._id);
      toast.success("FlashCard Reviewd");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreCard = () => {
      handelReviewed(currentCordIndex);
      SetcurrentCardIdex((prev) => prev - 1);
  };
  const handleNextCard = () => {
      handelReviewed(currentCordIndex);
      SetcurrentCardIdex((prev) => prev + 1);
  };

  const handleDeleteRequest = async () => {
    setLoading(true);
    try {
      const res = await deleteFlashCard(flashcardSet._id);
      if (res.status === 201) {
        Navigate('/flashcards');
        toast.success("flashCard Deleted !");

        handleFetchFlashCardPage();
      }
    } catch (error) {
      console.log(error.message || "Can't delete the FlashCard");
    } finally {
      setLoading(false);
    }
  };

  const renderFLashCardViewers = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center w-full h-screen">
          <Spinner />
        </div>
      );
    }

    if (flashcardSet.length === 0) {
      return (
        <EmptySet
          name="FlashCard"
          title="No FlashCard Yet"
          description=" You haven’t created any FlashCard yet. Generate your first set to
          start learning and reviewing concepts quickly."
          
        />
      );
    }

    const currentCard = FlashCards[currentCordIndex];

    return (
      <div className="w-full h-full p-5">
        <div className="">
          <button
            className="bg-slate-100 rounded-xl p-3 flex justify-center items-center gap-2 "
            onClick={() => SetSelectedSet(currentCard)}
          >
            <ArrowLeftIcon className="w-4 h-4" strokeWidth={2} />
            Back To Set
          </button>
          {/* flashCard set */}
          <div className="flex flex-col items-center space-y-8 ">
            <FlashCard currentCard={currentCard} onToggle={handleToggleStart} />
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            {/* Previous Button */}
            <button
              onClick={handlePreCard}
              disabled={currentCordIndex + 1 <= 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
              Previous
            </button>

            {/* Card Counter */}
            <div className="flex items-center text-sm font-semibold text-slate-600 bg-slate-100 px-4 py-2 rounded-lg">
              <span>
                {currentCordIndex + 1}
                <span className="mx-1 text-slate-400">/</span>
                {FlashCards.length}
              </span>
            </div>

            {/* Next Button */}
            <button
              disabled={currentCordIndex + 1 >= 10}
              onClick={handleNextCard}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className=" mt-6">
        <div className=" flex justify-between">
           <h1 className="text-2xl font-semibold">FlashCards</h1>
           <button onClick={handleDeleteRequest} className="bg-purple-500 p-3 rounded-xl flex justify-center items-center gap-2 text-white font-semibold">
           <Trash2 className="w-4 h-4" /> Delete Set
           </button>
        </div>

      {renderFLashCardViewers()}
      </div>

  );
};

export default FlashCardsPage;
