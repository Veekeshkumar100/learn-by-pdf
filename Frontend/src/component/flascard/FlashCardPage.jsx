import React, {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteFlashCard,
  getAllFlashCardSets,
  reviewedCount,
  toggleStarredFlshCards,
} from "../../services/flashCardservice";
import { generateFlashCards } from "../../services/aiServices";
import Spinner from "../common/spinar";
import moment from "moment";
import {
  Brain,
  Trash2,
  SparklesIcon,
  ArrowLeftIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import FlashCard from "./FlashCard";
import EmptySet from "../common/EmptySet";

const FlashCardPage = () => {
  const { id: documentId } = useParams();
  const [flashcardSet, setFlashCardSet] = useState([]);
  const [selectedSet, SetSelectedSet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentCordIndex, SetcurrentCardIdex] = useState(0);
  const [generatingFlashCardSet, setGeneratingFlashCardSet] = useState(false);
  const [deleteModelOpened, isDeleteModelOpened] = useState(false);
  const handleFetchFlashCardPage = async () => {
    setLoading(true);
    try {
      const responce = await getAllFlashCardSets(documentId);
      setFlashCardSet(responce.data);
    } catch (error) {
      console.log(error.message || "fialed to fetched document");
    } finally {
      setLoading(false);
    }
  };
    useEffect(()=>{
    handleFetchFlashCardPage();
    },[documentId])
  const generatFlaCardset = async () => {
    setGeneratingFlashCardSet(true);
    try {
      await generateFlashCards(documentId);
      isDeleteModelOpened(false);
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
      const upadatedFlashCardsSet = flashcardSet.map((set) => {
        if (selectedSet._id === set._id) {
          const upadatedCard = set.cards.map((card) => {
            return card._id === id
              ? { ...card, isStarred: !card.isStarred }
              : card;
          });
          return { ...set, cards: upadatedCard };
        }
      });
      setFlashCardSet(upadatedFlashCardsSet);
      SetSelectedSet(
        upadatedFlashCardsSet.find((set) => set._id === selectedSet._id),
      );
    } catch (error) {
      console.log(error || "Failed to toggle star");
      toast.error("Failed to toggle star");
    }
  };
  const handelReviewed = async () => {
    const currentCard = selectedSet.cards[currentCordIndex];
    try {
      await reviewedCount(currentCard._id);
      toast.success("FlashCard Reviewd");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreCard = () => {
    if (selectedSet) {
      handelReviewed(currentCordIndex);
      SetcurrentCardIdex((prev) => prev - 1);
    }
  };
  const handleNextCard = () => {
    if (selectedSet) {
      handelReviewed(currentCordIndex);
      SetcurrentCardIdex((prev) => prev + 1);
    }
  };

  const handleDeleteRequest = async (id) => {
    setLoading(true);
    try {
      const res = await deleteFlashCard(id);
      if (res.status === 201) {
        handleFetchFlashCardPage();
        toast.success("flashCard Deleted !");
      }
    } catch (error) {
      console.log(error.message || "Can't delete the FlashCard");
    } finally {
      setLoading(false);
    }
  };

  const renderFLashCardViewers = () => {
    const currentCard = selectedSet.cards[currentCordIndex];

    return (
      <div className="w-full h-full p-5">
        <div className="">
          <button
            className="bg-slate-100 rounded-xl p-3 flex justify-center items-center gap-2 "
            onClick={() => SetSelectedSet(null)}
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
                {selectedSet.cards.length}
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
  const renderSetList = () => {
    if (loading) {
      return (
        <div className=" min-h-[60vh] flex justify-center items-center">
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
          generatQuizzes={generatFlaCardset}
          generating={generatingFlashCardSet}
          isDeleteModelOpened={isDeleteModelOpened}
          deleteModelOpened={deleteModelOpened}
        />
      );
    }

    return (
      
      <div className="w-full max-w-7xl mx-auto mt-10">

  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    
    <div>
      <h2 className="text-2xl font-semibold text-slate-800">
       Your Flashcard Sets
      </h2>
      <p className="text-slate-500 text-sm mt-1">
        {flashcardSet.length}{" "}
        {flashcardSet.length === 1 ? "Set" : "Sets"} available
      </p>
    </div>

    <button
      onClick={generatFlaCardset}
      disabled={generatingFlashCardSet}
      className="flex items-center gap-2 px-5 py-2.5 rounded-lg 
      bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium 
      transition shadow-sm disabled:opacity-60"
    >
      <SparklesIcon className="w-4 h-4" />
      {generatingFlashCardSet
        ? "Generating..."
        : "Generate Flashcards"}
    </button>
  </div>

  {/* Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {flashcardSet?.map((set, index) => {
      return (
        <div
          key={index}
          onClick={() => SetSelectedSet(set)}
          className="group relative bg-white border border-slate-200 rounded-xl p-5 
          hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          
          {/* Delete */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteRequest(set._id);
            }}
            className="absolute top-3 right-3 p-1.5 rounded-md 
            text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
          >
            <Trash2 size={16} />
          </button>

          {/* Top */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600">
              <Brain className="w-5 h-5" />
            </div>

            <h3 className="text-base font-semibold text-slate-800">
              Flashcard Set
            </h3>
          </div>

          {/* Meta */}
          <p className="text-sm text-slate-500">
            Created {moment(set?.createAt).format("MMM D, YYYY")}
          </p>

          {/* Divider */}
          <div className="border-t border-slate-100 my-4" />

          {/* Bottom */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
              {set?.cards?.length}{" "}
              {set?.cards?.length === 1 ? "card" : "cards"}
            </span>

            <span className="text-xs text-purple-600 opacity-0 group-hover:opacity-100 transition">
              Open →
            </span>
          </div>

        </div>
      );
    })}
  </div>
</div>
    );
  };

  return (
    <div className="">
      {selectedSet ? renderFLashCardViewers() : renderSetList()}
    </div>
  );
};
export default FlashCardPage;
