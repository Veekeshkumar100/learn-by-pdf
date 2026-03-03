import axios from "axios";
import { axiosInstance } from "../utils/apiInstance";



export const generateFlashCards =async(documentId)=>{
    try{
        console.log(documentId)
        
    const response = await axiosInstance.post(`/v1/ai/generate-FlashCard`,{
       documentId,
     
    })
    return response.data;
    }catch(error){
        console.log(error);
    }
}
export const generateQuizs =async(documentId,option)=>{
    try{
    const response = await axios.post(`/v1/ai/generate-Quiz`,{
       documentId,
       ...option,
    })
    return response.data;
    }catch(error){
        console.log(error);
    }
}
export const generateDocumentSummary =async(documentId)=>{
    try{
    const response = await axiosInstance.post(`/v1/ai/generate-Summary`,{
       documentId,
    })
    return response.data;
    }catch(error){
        console.log(error);
    }
} 
export const Chating =async(meggase,documentId)=>{
    try{
    const response = await axiosInstance.post(`/v1/ai/generate-Chat`,{
        question:meggase,
        documentId:documentId,
    })

    return response.data;
    }catch(error){
        console.log(error);
    }
}
export const explainContext =async(documentId,concept)=>{
    try{
    const response = await axiosInstance.post(`v1/ai/generate-Explaination`,{
        documentId,
       concept,
    })
    return response.data;
    }catch(error){
        console.log(error.meggase || "fetched request failed");
    }
}



export const generateChatHistory=async(documentId)=>{
      try{
    const response = await axiosInstance.post(`/v1/ai/generate-getchatHistory`,{
        documentId,
    })
 
    return response.data;
    }catch(error){
        console.log(error);
    } 
}
