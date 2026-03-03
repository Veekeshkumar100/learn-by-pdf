import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getAllFlashCardSets } from '../../services/flashCardservice';
import { generateFlashCards } from '../../services/aiServices';

const FlashCardPage = () => {
    const {id:documentId}=useParams();
    
    const [flashcardSet,setFlashCardSet]=useState('');
    const [isUploadModelOpen,setisUploadModelOpen]=useState(false)
    const [loading ,setLoading]=useState(false);

    // const handleFetchFlashCardPage=async()=>{
    //     setLoading(true);
    //     try {
    //         const responce = await getAllFlashCardSets(documentId)
    //         setFlashCardSet(responce.data)
    //         setisUploadModelOpen(true);
    //     } catch(error) {
    //         console.log(error.message || "fialed to fetched document");
    //     }finally{
    //         setLoading(false);
    //     }
    // }
 

    const generatFlaCardset=async()=>{
        setLoading(true);
        try {
     const responce = await generateFlashCards(documentId)
     console.log(responce);   
        }catch(error) {
            console.log(error.message || "fialed to fetched document");
        }finally{
            setLoading(false);
        }
    }

    
    useEffect(()=>{
           generatFlaCardset()
        // handleFetchFlashCardPage()
       },[documentId]);

  return  <div className=''>
    <div>
        </div>       
    </div>
  

}
export default FlashCardPage;
