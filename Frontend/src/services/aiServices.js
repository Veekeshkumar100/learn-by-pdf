import axios from "axios";

const BASE_URL='http//:localhost:300/api/v1/ai';

export const generateFlashCards =async(documentId,option)=>{
    try{
    const response = await axios.post(`${BASE_URL}/generate-FlashCard`,{
       documentId,
       ...option,
    })
    return response.data;
    }catch(error){
        console.log(error);
    }
}
export const generateQuizs =async(documentId,option)=>{
    try{
    const response = await axios.post(`${BASE_URL}/generate-Quiz`,{
       documentId,
       ...option,
    })
    return response.data;
    }catch(error){
        console.log(error);
    }
}
export const generateDocumentSummary =async(documentId,option)=>{
    try{
    const response = await axios.post(`${BASE_URL}/generate-Summary`,{
       documentId,
    })
    return response.data;
    }catch(error){
        console.log(error);
    }
} 
export const Chating =async(documentId,meggase)=>{
    try{
    const response = await axios.post(`${BASE_URL}/generate-Chat`,{
        question:meggase,
       documentId,
    })
    return response.data;
    }catch(error){
        console.log(error);
    }
}
export const explainContext =async(documentId,concept)=>{
    try{
    const response = await axios.post(`${BASE_URL}/generate-Explaination`,{
        documentId,
       concept,
    })
    return response.data;
    }catch(error){
        console.log(error);
    }
}



export const generateChatHistory=async()=>{
      try{
    const response = await axios.post(`${BASE_URL}/generate-getchatHistory`,{
        documentId,
    })
    return response.data;
    }catch(error){
        console.log(error);
    } 
}