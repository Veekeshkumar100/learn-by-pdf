import { axiosInstance } from "../utils/apiInstance.js";




export const getDaskBord =async()=>{
    try{
    const response = await axiosInstance.get('/v1/dashbord/getdaskbord');
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