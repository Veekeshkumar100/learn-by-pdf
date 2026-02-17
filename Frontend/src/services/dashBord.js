import { axiosInstance } from "../utils/apiInstance.js";


const BASE_URL='http://localhost:3000/api/v1/dashbord';

export const getDaskBord =async()=>{
    try{
    const response = await axiosInstance.get('/getdaskbord');

    console.log(response);
    return response.data;
    }catch(error){
      if (error.response) {
        return error.response.data;
  } else {
    console.log("Server not responding");
  }
    }
}