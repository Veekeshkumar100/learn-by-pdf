import axios from "axios";
const BASE_URL='http//:localhost:300/api/v1/quizz';

export const  getAllQuize=async(documentId)=>{
     try{
    const response = await axios.get(`${BASE_URL}/${documentId}`);
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to get the all quizes"}
    }
}
export const  getQuize=async(id)=>{
     try{
    const response = await axios.get(`${BASE_URL}/quiz/${id}`,)
    
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to get the all quizes"}
    }
}

export const submitequizesAnswer=async(answers,id)=>{
      try{
    const response = await axios.post(`${BASE_URL}/${id}/submit`,{answers})
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to get the all quizes"}
    }
}
export const detailedResult=async(id)=>{
      try{
    const response = await axios.post(`${BASE_URL}/${id}/result`,{answers})
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to get the all quizes"}
    }
}
export const deleteQuiz=async(id)=>{
      try{
    const response = await axios.delete(`${BASE_URL}/${id}/delete`,)
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to get the all quizes"}
    }
}



