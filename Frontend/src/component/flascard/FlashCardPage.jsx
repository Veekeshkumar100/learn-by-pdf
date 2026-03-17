import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { deleteFlashCard, getAllFlashCardSets, reviewedCount, toggleStarredFlshCards } from '../../services/flashCardservice';
import { generateFlashCards } from '../../services/aiServices';
import Spinner from '../common/spinar';
import moment from "moment";
import { Brain, Trash2, SparklesIcon,  ArrowLeftIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import FlashCard from './FlashCard';
import EmptySet from '../common/EmptySet';

const FlashCardPage = () => {

    const {id:documentId}=useParams();
    const [flashcardSet,setFlashCardSet]=useState([]);
    const [selectedSet,SetSelectedSet]=useState(null)
    const [loading ,setLoading]=useState(false);
    const [currentCordIndex,SetcurrentCardIdex]=useState(0)
    const [generatingFlashCardSet,setGeneratingFlashCardSet]=useState(false);

    console.log(flashcardSet);
    const handleFetchFlashCardPage=async()=>{
      console.log("vveke/")
        setLoading(true);
        try {
            const responce = await getAllFlashCardSets(documentId)
           console.log(responce);
            setFlashCardSet(responce.data);
        } catch(error) {
            console.log(error.message || "fialed to fetched document");
        }finally{
            setLoading(false);
        }
    }
 

    const generatFlaCardset=async()=>{
        setGeneratingFlashCardSet(true);
        try {
      await generateFlashCards(documentId)
handleFetchFlashCardPage()
        }catch(error) {
            console.log(error.message || "fialed to fetched document");
        }finally{
            setGeneratingFlashCardSet(false);
        }

    
    }
    useEffect(()=>{
        handleFetchFlashCardPage()
       },[documentId]);



       const handleToggleStart=async(id)=>{
           console.log(id);
         try {
                await toggleStarredFlshCards(id)
                console.log(flashcardSet)
              const upadatedFlashCardsSet = flashcardSet.map((set)=>{
                console.log(set);
                console.log(set,selectedSet._id);
                    if(selectedSet._id===set._id){
                        const upadatedCard= set.cards.map((card)=>{
                          return card._id===id ? {...card,isStarred:!card.isStarred} : card;
                        }) 
                        console.log(upadatedCard);
                        return { ...set , cards:upadatedCard}
                    }
                })
                console.log(upadatedFlashCardsSet);
                setFlashCardSet(upadatedFlashCardsSet);
                SetSelectedSet(upadatedFlashCardsSet.find((set) => set._id===selectedSet._id));
              } catch (error) {
                console.log(error || "Failed to toggle star")
                toast.error("Failed to toggle star")
              }

       }
       const handelReviewed=async()=>{
        
       const currentCard=selectedSet.cards[currentCordIndex];
       try{
          await reviewedCount(currentCard._id)
          toast.success("FlashCard Reviewd");
       }catch(error){
        console.log(error)
       }
       }

       const handlePreCard=()=>{
         if(selectedSet){
            handelReviewed(currentCordIndex);
            SetcurrentCardIdex((prev)=> (prev -1));
         }

       }
     const  handleNextCard=()=>{
        if(selectedSet){
          handelReviewed(currentCordIndex);
            SetcurrentCardIdex((prev)=> (prev +1));
        }
              
         }
     

       const handleDeleteRequest=async(id)=>{
        setLoading(true)
        try {
        const res= await deleteFlashCard(id);
        if(res.status===201){
            handleFetchFlashCardPage()
            toast.success("flashCard Deleted !")
        }
        } catch (error) {
             console.log(error.message || "Can't delete the FlashCard")
        }finally{
            setLoading(false)
        }
       }


     const renderFLashCardViewers=()=>{
        
        const currentCard=selectedSet.cards[currentCordIndex];
        
        return  <div className='w-full h-full p-5'>
            <div className=''>
                <button className='bg-slate-100 rounded-xl p-3 flex justify-center items-center gap-2 ' onClick={()=>SetSelectedSet(null)}>
                    <ArrowLeftIcon className='w-4 h-4' strokeWidth={2}/>
                   Back To Set
                </button>
                {/* flashCard set */}
                <div className='flex flex-col items-center space-y-8 '>
                        <FlashCard currentCard={currentCard} onToggle={handleToggleStart}/>
                </div>

              
     <div className="flex items-center justify-center gap-4 mt-6">

  {/* Previous Button */}
  <button
    onClick={handlePreCard}
    disabled={currentCordIndex +1 <= 1}
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
    disabled={currentCordIndex +1 >= 10}
    onClick={handleNextCard}
    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Next
    <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
  </button>

</div>
            </div>

        </div>
     }
     const renderSetList=()=>{
    if(loading){
        return <div className=' min-h-[60vh] flex justify-center items-center'>
          <Spinner/> 
        </div>
    }
    
    
    if(flashcardSet.length===0){
return <EmptySet name="FlashCard" title="No FlashCard Yet" description=" You haven’t created any FlashCard yet. Generate your first set to
          start learning and reviewing concepts quickly." generatQuizzes={generatFlaCardset} generating={generatingFlashCardSet}  />
    }


return <div className="w-full max-w-6xl mx-auto px-4 py-6">

  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

    <div>
      <h2 className="text-2xl font-semibold text-slate-800">
        Your FlashCards
      </h2>

      <p className="text-slate-500 text-sm mt-1">
        {flashcardSet.length}{" "}
        {flashcardSet.length === 1 ? "Set" : "Sets"} available
      </p>
    </div>

    <button
      onClick={generatFlaCardset}
      disabled={generatingFlashCardSet}
      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition shadow-md disabled:opacity-60"
    >
      <SparklesIcon className="w-5 h-5" />
      {generatingFlashCardSet
        ? "Generating Flashcards..."
        : "Generate Flashcards"}
    </button>

  </div>


  {/* FlashCard Grid */}
  <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" >
 
  {flashcardSet?.map((set, index) => { 
     return (
        <div
          key={index}
          className="relative group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition cursor-pointer"
          onClick={()=>SetSelectedSet(set)}
        >


          {/* Delete Button */}
          <button className="absolute top-3 right-3 p-2 rounded-lg hover:bg-red-100 text-slate-500 hover:text-red-500 transition" onClick={()=>handleDeleteRequest(set._id)}>
            <Trash2 size={18} strokeWidth={2} />
          </button>

          {/* Card Content */}
          <div className="flex items-start gap-4">

            {/* Icon */}
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600">
              <Brain className="w-6 h-6" />
            </div>

            {/* Text */}
            <div className="flex-1">

              <h3 className="text-lg font-semibold text-slate-800">
                FlashCard Set
              </h3>

              <p className="text-sm text-slate-500 mt-1">
              created { moment(set?.createAt).format("MMMM Do YYYY")}
              </p>

              {/* Card Count */}
              <div className="mt-3">
                <span className="text-xs font-medium bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
                  {set?.cards?.length}{" "}
                  {set?.cards?.length === 1 ? "card" : "cards"}
                </span>
              </div>

            </div>

          </div>

        </div>
); 
   })}

  </div>

</div>
    
  
     }

     
  return  <div className=''>
    {selectedSet ? renderFLashCardViewers(): renderSetList()}      
    </div>
  
}
export default FlashCardPage;
