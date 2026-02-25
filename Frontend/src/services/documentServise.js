import axios from "axios";
import { axiosInstance } from "../utils/apiInstance";

export const uploadDocument =async(formData)=>{
    try{
    const response = await axiosInstance.post(`${BASE_URL}/uploads`,formData,{
       headers:{
        "Content-Type":"multipart/form-data"
       }
    })
    return response.data;
    }catch(error){
        throw error.response?.data || {message : "Failed to upload the document"}
    }
}
export const getDocuments =async()=>{
    try{
    const response = await axiosInstance.get(`/v1/documets`)
    return response.data?.data;
    }catch(error){
             throw error.response?.data || {message : "Failed to get the documents"}

    }
}

export const getDocumentbyid =async(id)=>{
    try{
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
    }catch(error){
             throw error.response?.data || {message : "Failed to get a document"}

    }
}
export const deletetDocumentbyid =async(id)=>{
    try{
        
    const response = await axiosInstance.delete(`/v1/${id}/delete`)
    return response.data;
    }catch(error){
             throw error.response?.data || {message : "Failed to delete the document"}

    }
}







