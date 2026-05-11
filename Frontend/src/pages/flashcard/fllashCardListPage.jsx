import React, { useEffect, useState } from 'react';
import { deleteFlashCard, getAllFlashCardData } from '../../services/flashCardservice';
import Spinner from '../../component/common/spinar';
import EmptySet from '../../component/common/EmptySet';
import FlashCardsSetCard from './flashCardSetCard';
import toast from 'react-hot-toast';


const FlashCardListPage = () => {
  const [loading,setLoading]=useState(false);
  const [FlashCardSets,setFlashCardSets]=useState([]);
  
   const fehtchAllFlaceCards=async()=>{
     setLoading(true)
    try {
          const res = await getAllFlashCardData();
          setFlashCardSets(res.data)
    } catch (error) {
     console.log(error || "failed to faetch data of flashCard") 
    }finally{
      setLoading(false)
    }
   }
   useEffect(()=>{
fehtchAllFlaceCards();
   },[])

      const handleDeleteRequest=async(id)=>{
        setLoading(true)
        try {
        const res= await deleteFlashCard(id);
        if(res.status===201){
            fehtchAllFlaceCards();   
            toast.success("flashCard Deleted !")
        }
        } catch (error) {
             console.log(error.message || "Can't delete the FlashCard")
        }finally{
            setLoading(false)
        }
       }

   const rendeeFlashCard=()=>{
    if(loading){
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner/>
      </div>
    }
     
  if(FlashCardSets.length===0){
return <EmptySet name="FlashCard" title="No FlashCardsSet Yet" description=" You haven’t created any FlashCard yet. Generate your first set to
          start learning and reviewing concepts quickly."  />
    }

    return (
      <div className='grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {
        FlashCardSets.map((flashCard)=>{
         return <FlashCardsSetCard key={flashCard._id} flashCard={flashCard} onDelete={handleDeleteRequest} />
        })
      }
      </div>
    )

   }
   
  return (
     <div className=''>
      <div className='mt-6'>
        <h1 className='text-slate-900 text-3xl font-semibold'>All FlashCard Sets </h1>
        </div> 
        {rendeeFlashCard()}

     </div>
  )
}

export default FlashCardListPage
