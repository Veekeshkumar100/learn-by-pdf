import axios from "axios";
const BASE_URL='http//:localhost:300/api/v1/flashcard';
export const uploadDocument1 =async()=>{
    try{
    const response = await axios.post(`${BASE_URL}`)
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to upload the document"}
    }
}  
export const getFlashCards =async(documnetId)=>{
    try{
    const response = await axios.get(`${BASE_URL}/${documnetId}`);
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to getFashcard the document"}
    }
}  

export const getAllFlashCardSets =async()=>{
    try{
    const response = await axios.get(`${BASE_URL}`)
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to upload the document"}
    }
}  


export const reviewedCount =async()=>{
    try{
    const response = await axios.post(`${BASE_URL}/${cardId}/reviewed`,{
        cardIndex,
    })
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to upload the document"}
    }
}  
export const toggleStarredFlshCards =async(cardId)=>{
    try{
    const response = await axios.post(`${BASE_URL}/${cardId}/started`)
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to upload the document"}
    }
} 

export const deleteFlashCard=async(id)=>{
     try{
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to upload the document"}
    }
}


