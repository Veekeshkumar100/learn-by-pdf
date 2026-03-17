import React, { useEffect, useState } from "react";
import { User, Mail, EyeOff, Eye, Lock } from "lucide-react";
import { changePassword, getProfile } from "../../services/authServices";
import toast from "react-hot-toast";

const UserProfile = ({ user }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);

  const UserProfile = async () => {
    try {
      const res = await getProfile();
       setUserName(res?.data?.user.username);
       setEmail(res?.data?.user.email);
    } catch (error) {
      console.error(error.message || "can not get the profile data");
    }
  };
  useEffect(() => {
    UserProfile();
  }, []);

 const  handlechangePassword=async()=>{
   if(confirmPassword!==newPassword){
    toast.success("password is not matched")
    return ;
   }
   if(newPassword.length < 6 ){
    toast.success("password must have six atleast character")
    return ;
   }

  try{
    const res = await changePassword(currentPassword,newPassword);
    toast.success("Password Change successfully");
    setCurrentPassword('')
    setconfirmPassword('')
    setNewPassword('')
  }catch(error){
    console.log(error);
  }
 }
  return (
    <div className="min-h-screen flex flex-col  items-center justify-center  px-4 mt-8">
      <div className="w-full  bg-slate-50 rounded-2xl shadow-lg p-6 border border-slate-200">
        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-700 text-center mb-6">
          User Profile
        </h1>

        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
            <User size={32} />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-slate-700">
            {userName}
          </h2>
        </div>

        {/* Info Section */}
        <div className="space-y-4">
          {/* Name */}
          <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
            <User className="text-slate-500" size={20} />
            <div>
              <p className="text-slate-500 text-sm">Full Name</p>
              <p className="text-slate-700 font-medium">{userName}</p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
            <Mail className="text-slate-500" size={20} />
            <div>
              <p className="text-slate-500 text-sm">Email Address</p>
              <p className="text-slate-700 font-medium">{email}</p>
            </div>
          </div>
        </div>

        {/* Button */}
   
      </div>

      {/* {update password} */}
      <div className="min-h-screen w-full  px-4 mt-8">
      <div className="w-full  bg-slate-50 rounded-2xl shadow-lg p-6 border border-slate-200">
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-700 text-center mb-6">
          Update Password
        </h1>

        {/* Form */}
        <div className="space-y-4">
          
          {/* Current Password */}
          <div className="bg-slate-100 p-4 rounded-md border  border-neutral-200 flex items-center gap-3 transition-colors duration-150 focus:outline-none focus:right-2 focus:ring-[#00d492] focus:border-transparenttransition-colors ">
            <Lock className="text-slate-500" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e)=>setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              className="w-full bg-transparent outline-none text-slate-700   placeholder-slate-400 "
            />
          </div>

          {/* New Password */}
          <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
            <Lock className="text-slate-500" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              placeholder="New Password"
              className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400"
              onChange={(e)=>setNewPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
            <Lock className="text-slate-500" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              placeholder="Confirm Password"
              className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400"
              onChange={(e)=>setconfirmPassword(e.target.value)}

            />

            {/* Toggle */}
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Button */}
        <button onClick={handlechangePassword} className="w-full mt-6 bg-slate-200 font-bold hover:bg-slate-300 text-slate-700 py-2 rounded-xl transition">
          Update Password
        </button>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
