import axios from "axios";
export const axiosInstance= axios.create({
      baseURL: "http://localhost:3000/api",
    timeOut:80000,
    headers:{
        "Content-type":"Application/json",
        Accept:"Application/json",
    }
})


axiosInstance.interceptors.request.use((config)=>{
    const accessToken = localStorage.getItem("token");
    if(accessToken){
     config.headers.Authorization=`Bearer ${accessToken}`;
    }
    return config;
},
(error)=>{
  if(error){
    return Promise.reject(1);
  }
}
)


axiosInstance.interceptors.response.use(
    (response)=>{
   return response;
    }, 
(error)=>{
    if(error.response){
  if(error.response.status==401){
     console.error("server error,Please try again");
  }else if(error.code === "ECONNABORTED"){
    console.log("request timoue . Please try again");
  }
    }

}
)


