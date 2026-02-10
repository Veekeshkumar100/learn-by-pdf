import axios from "axios";

const BASE_URL='http//:localhost:300/api/v1/users';

export const login =async(email,password)=>{
    try{
    const response = await axios.post(`${BASE_URL}/login`,{
        email,
        password,
    })
    return response.data;
    }catch(error){
        console.log(error);
    }
}

export const register =async(email,password)=>{
    try{
    const response = await axios.post(`${BASE_URL}/register`,{
       username,
       email,
       password
    })
    return response.data;
    }catch(error){
        console.log(error);
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






