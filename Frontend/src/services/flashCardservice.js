import { axiosInstance } from "../utils/apiInstance";

export const getFlashCards =async(documnetId)=>{
    try{
    const response = await axiosInstance.get(`v1/flashcard/${documnetId}`);
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to getFashcard the document"}
    }
}  

export const getAllFlashCardSets =async(id)=>{
    try{
    const response = await axiosInstance.get(`/v1/flashcard/${id}/getAllFlashCard`)
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to ge the document flashcard"}
    }
}  

export const getAllFlashCardData =async()=>{
    try{
    const response = await axiosInstance.get(`/v1/flashcard`)
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to ge the document flashcard"}
    }
}  


export const reviewedCount =async(cardIndex)=>{
    try{
    const response = await axiosInstance.post(`v1/flashcard/${cardIndex}/reviewed`,)
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to upload the document"}
    }
}  
export const toggleStarredFlshCards =async(cardIndex)=>{
    try{
    const response = await axiosInstance.post(`v1/flashcard/${cardIndex}/started`,)
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to upload the document"}
    }
}  

export const deleteFlashCard=async(id)=>{
     try{
    const response = await axiosInstance.delete(`/v1/flashcard/${id}`);
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to upload the document"}
    }
}

 
