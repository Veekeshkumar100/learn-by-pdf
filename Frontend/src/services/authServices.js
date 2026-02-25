import axios from "axios";
import { axiosInstance } from "../utils/apiInstance.js";


const BASE_URL='http://localhost:3000/api/v1/users';

export const loginUser =async(formData)=>{
    console.log(formData);
    try{
    const response = await axiosInstance.post('/v1/users/login',formData);

    console.log(response);
    return response.data;
    }catch(error){
      if (error.response) {
        console.log(error.response);
        return error.response.data;
  } else {
    console.log("Server not responding");
  }
    }
}

export const register =async(formData)=>{
    try{
    const response = await axiosInstance.post(`${BASE_URL}/register`,formData)
    return response.data;
    }catch(error){
        if (error.response) {
        return error.response.data;
  } else {
    console.log("Server not responding");
  }
    }
}

export const getProfile =async ()=>{
    try{
    const response = await axios.get(`${BASE_URL}/profile`)
    return response.data;
    }catch(error){
        console.log(error);
    }
}
export const updateProfile =async(username,email)=>{
    try{
    const response = await axios.post(`${BASE_URL}/profile`,{
        username,
        email,
    })
    return response.data;
    }catch(error){
        console.log(error);
    }
}
export const changePassword =async(currentPassword,newPassword)=>{
    try{
    const response = await axios.post(`${BASE_URL}/change-password`,{
      currentPassword,newPassword
    })
    return response.data;
    }catch(error){
        console.log(error);
    }
}






