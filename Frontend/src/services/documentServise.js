import axios from "axios";
const BASE_URL='http//:localhost:300/api/v1/documets';
export const uploadDocument =async(formData)=>{
    try{
    const response = await axios.post(`${BASE_URL}/uploads`,formData,{
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
    const response = await axios.get(`${BASE_URL}/`)
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
    const response = await axios.delete(`${BASE_URL}/${id}`)
    return response.data;
    }catch(error){
             throw error.response?.data || {message : "Failed to delete the document"}

    }
}







