
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
  
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-50 via-white to-slate-50 px-4 sm:px-6">
  
  <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 sm:p-8">
    
    {/* Header */}
    <div className="flex flex-col items-center text-center mb-6">
      <div className="text-white bg-emerald-500 p-3 sm:p-4 rounded-xl">
        <BrainCircuit strokeWidth={2} />
      </div>

      <h1 className="text-xl sm:text-2xl font-semibold mt-3">
        Welcome Back
      </h1>

      <p className="text-gray-500 text-sm sm:text-base">
        Sign in to continue your journey
      </p>
    </div>

    {/* Form */}
    <div className="space-y-5">

      {/* Email */}
      <div>
        <label className="block text-sm sm:text-base font-medium mb-1">
          Email
        </label>

        <div className="relative flex items-center">
          <div
            className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none duration-200
              ${focusField === "email" ? "text-emerald-500" : "text-slate-500"}
            `}
          >
            <Mail size={18} />
          </div>

          <input
            type="email"
            placeholder="you@gmail.com"
            value={email}
            className="w-full h-11 sm:h-12 pl-10 pr-3 outline-none border-2 rounded-md border-slate-200 focus:border-emerald-500 transition"
            onFocus={() => setFocusField("email")}
            onChange={(e) => SetEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm sm:text-base font-medium mb-1">
          Password
        </label>

        <div className="relative flex items-center">
          <div
            className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none duration-200
              ${focusField === "password" ? "text-emerald-500" : "text-slate-500"}
            `}
          >
            <Lock size={18} />
          </div>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            className="w-full h-11 sm:h-12 pl-10 pr-3 outline-none border-2 rounded-md border-slate-200 focus:border-emerald-500 transition"
            onFocus={() => setFocusField("password")}
            onChange={(e) => Setpassword(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* Button */}
      <button
        className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white font-semibold text-sm sm:text-base py-2.5 rounded-md hover:bg-emerald-600 transition"
        onClick={handleFormSubmitr}
      >
        {loading ? "Signing in..." : (
          <>
            Sign In
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </div>

    <hr className="border-slate-200 mt-6" />

    {/* Footer */}
    <div className="mt-6 text-center text-sm sm:text-base">
      <p>
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:text-emerald-500 transition"
        >
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


