import {Bell, Menu, User} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
const Header = ({toggleSideBar}) => {
    const {user}=useAuth();
  return (
   <div className='sticky top-0 z-40 bg-white/80 backdrop-blur-2xl  w-full  h-16  flex justify-between  items-center px-5   '>
        <button  onClick={()=>toggleSideBar()}
        aria-label='toggle sidebar'
        className='w-8 h-8  inline-flex p-2  justify-center items-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded md:hidden'
            >
            <Menu className='text-[15px]' size={24}/>
        </button>
           <div className='hidden md:block'></div>
         {/* profile */}
        <div className=' flex justify-center items-center gap-5 '>
            <button className='relative w-10 h-10 border-r-2 pr-2 inline-flex  justify-center items-center border-slate-300 text-slate-400 hover:text-slate-900 '>
               <Bell  size={22} className='hover:scale-110 transition-transform duration-300 ' />
               <span className='absolute p-1 bg-emerald-500 rounded-full   top-1 right-2.5'></span>
            </button>

            <div className=''>
                <div className=' flex-1 flex justify-center items-center gap-2 '>
                    <div className='bg-emerald-500 p-2 rounded-lg text-white hover:bg-emerald-400'>
                        <User strokeWidth={2} size={22} />
                    </div>
                    <div className='text-[13px] flex flex-col'>
                        <p>{user?.username || "User"}</p>
                        <p>{user?.email || "email"}</p>
                    </div>
                </div>
                   
            </div>     
        </div>
 
    </div>
  )
}

export default Header
