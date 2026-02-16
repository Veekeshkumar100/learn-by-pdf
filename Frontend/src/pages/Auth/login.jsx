
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BrainCircuit, Lock, Mail } from "lucide-react";
import { loginUser } from "../../services/authServices";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";



const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focusField,setFocusField] =useState(null);
  const [email,SetEmail]=useState("");
  const [password,Setpassword]=useState("");
const {login}=useAuth();
const handleFormSubmitr=async(e)=>{
   e.preventDefault();
   setError('')
   setLoading(true);
   const formData={
    email,
    password,
   }
try {
  const responce=await loginUser(formData);
  console.log(responce)
  if(responce.status===200){
   const {user,token} =responce;
   login(user,token)
   setLoading(false); 
   navigate("/dashboard");
   toast.success('Login successful ')
  }else if(responce.error){
    SetEmail("")
    Setpassword("")
   setError(responce.error);
    setLoading(false);  
  }else if(responce.errors){
    const error=responce.errors.map((cur)=> cur.msg).join(",")
    setError(error)
      setLoading(false); 
  }
  
} catch(error) {
  console.error(error)
  setError(error.responce || "Failed to fetch data from the server");
  setLoading(false)
}
}

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="w-sm max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="text-white  bg-emerald-500 p-4 rounded-lg">
          <BrainCircuit strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-semibold mt-2">Welcome Back</h1>
          <p className="text-gray-500 text-sm">
            Sign in to continue your journey
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Email */}
          <div className="">
            <label className="block text-1xl font-medium">Email</label>
            <div className="relative flex items-center ">
              <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none duration-200
                ${focusField ==="email"?'text-emerald-500':'text-slate-500'} `}>
              <Mail size={18} />  
              </div>
              <input
                type="email"
                placeholder="you@gmail.com"
                value={email}
                className="w-full h-12 pl-10 outline-none border-2 rounded-md px-2 mt-1 border-slate-200 focus:text-emerald-500 focus:border-emerald-500"
                onFocus={()=>setFocusField("email")}  
                onChange={(e)=>SetEmail(e.target.value)}
               
              />
            </div>
          </div>

          {/* Password */}
           <div className="">
            <label className="block text-1xl font-medium">Password</label>
            <div className="relative flex items-center ">
              <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none duration-200
                ${focusField ==="password"?'text-emerald-500':'text-slate-500'} `}>
              <Lock size={18} />  
              </div>
              <input
                type="email"
                placeholder="..."
                value={password}
                className="w-full h-12 pl-10 outline-none border-2 rounded-md px-2 mt-1 border-slate-200 focus:text-emerald-500 focus:border-emerald-500"
                onFocus={()=>setFocusField("password")}  
                onChange={(e)=>Setpassword(e.target.value)}
               
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* Button */}
          <button
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold text-1xl py-2 rounded-md hover:bg-emerald-400 transition"
            onClick={handleFormSubmitr}>
            {loading ? "Signing in..." : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
    <hr className="border-1 text-sm text-slate-300 mt-5"/>
        {/* Footer */}
        <div className="mt-6 text-center text-1xl">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-emerald-500">
              Sign up
            </Link>
          </p>
        </div>

        <p className="text-xs text-center text-gray-400 mt-4">
          By continuing, you agree to our terms and policy.
        </p>

      </div>
    </div>
  );
};

export default Login;


