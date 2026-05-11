import {Bell, Menu, User} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = ({toggleSideBar}) => {

    const {user}=useAuth();
     const users= JSON.parse(localStorage.getItem("user"));
  return (


 <div className="fixed top-0 left-0 right-0 z-50 h-16
                bg-white/80 backdrop-blur-xl
                border-b border-slate-200
                flex items-center justify-between
                px-4 sm:px-6">

 
  <div className="flex items-center gap-3">
    <button
      onClick={toggleSideBar}
      aria-label="toggle sidebar"
      className="w-8 h-8 flex items-center justify-center
                 text-slate-500 hover:text-slate-900
                 hover:bg-slate-100 rounded-md
                 transition md:hidden"
    >
      <Menu size={22} />
    </button>


  
    <h1 className="text-[18px]  font-semibold text-slate-700">
      DG LEARN
    </h1>
  </div>

  <div className="flex items-center gap-3 sm:gap-5">


<div className=' flex justify-center items-center gap-5 '>
            <button className='relative w-10 h-10 border-r-2 pr-2 inline-flex  justify-center items-center border-slate-300 text-slate-400 hover:text-slate-900 '>
               <Bell  size={22} className='hover:scale-110 transition-transform duration-300 ' />
               <span className='absolute p-1 bg-purple-500 rounded-full   top-1 right-2.5'></span>
            </button>

            <div className=''>
                <div className=' flex-1 flex justify-center items-center gap-2 '>
                    <div className='bg-purple-500 p-2 rounded-lg text-white hover:bg-purple-400'>

                        <User strokeWidth={2} size={22} />
                    </div>
                    <div className='text-[13px] flex flex-col'>
                        <p>{user?.username ||users?.username || "User"}</p>
                        <p>{user?.email||users?.email || "email"}</p>
                    </div>
                </div>


  </div>

</div> 
</div> 
</div> 
  )
}

export default Header


  