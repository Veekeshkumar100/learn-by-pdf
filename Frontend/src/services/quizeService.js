import axios from "axios";
import { axiosInstance } from "../utils/apiInstance";
const BASE_URL='http//:localhost:300/api/v1/quizz';

export const  getAllQuize=async(documentId)=>{
     try{
    const response = await axiosInstance.get(`v1/quizz/${documentId}`);
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to get the all quizes"}
    }
}
export const  getQuize=async(id)=>{
     try{

    const response = await axiosInstance.get(`v1/quizz/quiz/${id}`)
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to get the all quizes"}
    }
}

export const submitequizesAnswer=async(answers,id)=>{
      try{
    const response = await axiosInstance.post(`/v1/quizz/${id}/submit`,{answers})
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to get the all quizes"}
    }
}
export const detailedResult=async(id)=>{
      try{
    const response = await axiosInstance.post(`/v1/quizz//${id}/result`);
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to get the all quizes"}
    }
}
export const deleteQuiz=async(id)=>{
      try{
    const response = await axiosInstance.delete(`v1/quizz/${id}/delete`,)
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to get the all quizes"}
    }
}



