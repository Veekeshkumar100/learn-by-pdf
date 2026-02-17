import { useAuth } from '../../context/AuthContext'
 import { NavLink, useNavigate } from "react-router-dom";
import { BrainCircuit,LayoutDashboard,FileText,X, User, BookOpen, LogOut } from 'lucide-react'
const Sidebar = ({isSideBaropen,toggleSideBar}) => {
      const {logout}=useAuth()
      const navigate =useNavigate();

      const handleLogout=()=>{
           logout()
           navigate('/logout');
      }
        const navLinks=[
          {
            to:"/dashboard",icon:LayoutDashboard,text:"Dashboard"
          },
          {
            to:"/documents",icon:FileText,text:"Document"
          },
          {
            to:"/flashcards",icon:BookOpen,text:"Flashcard"
          },
          {
            to:"/profile",icon:User,text:"Profile"
          },
        ]
  
      

  return (
    // <div className='flex flex-col gap-2'>

      <aside className={`fixed  top-0 left-0 flex flex-col  backdrop-blur-2xl min-h-full max-h-full w-64 bg-white/80 border-r border-slate-200/50  z-50 md:relative md:shrink-0 md:flex  md:w-64 transition-transform duration-300 ease-in-out overflow-hidden ${isSideBaropen?"transtale-x-0":"-translate-x-full"}`}>
        <div className='flex justify-between h-16 px-5 items-center   w-64 backdrop-blur-lg border-b border-slate-200/60'>
          <div className=' flex items-center gap-3 '>
            <div className='flex items-center justify-center p-2 text-white rounded-lg bg-emerald-500'>
              <BrainCircuit size={22}/>
            </div>
          <h1 className='text-[18px] font-semibold '>AI Learing</h1>
          </div>
          <button className='' onClick={toggleSideBar}>
             <X size={22} className='md:hidden text-slate-' />
          </button>
   </div>
      <nav className='relative flex flex-col  items-center gap-2 mt-2 '>
         {navLinks.map((link,index)=>{
            return <div className=' '>
              <NavLink key={index} to={`${link.to}` }  className={({isActive})=>`flex justify-center items-center  gap-2 w-60  font-semibold py-3.5 rounded-lg px-2 ${isActive ? " bg-linear-to-r  from-emerald-500 to-teal-200 text-white  shadow-lg shadow-slate-200/60 ":"text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
              <link.icon size={22}/>
              <p>{link.text}</p>
                </NavLink>
                <div className='border-b border-slate-100 pt-1 shadow-xl shadow-slate-500 backdrop-blur-2xl '></div>
            </div>
           })
           }
          {/* logout */}
          <div className='group flex justify-center items-center   w-full py-2 text-center'>
            <button className='flex  gap-2 font-semibold text-slate-700  group-hover:scale-105' onClick={handleLogout}>
              <LogOut size={18} strokeWidth={2.5} className='transition-transform duration-300 '/>
              Logout
            </button>
          </div>
      </nav>
      </aside>
      //  </div> 
  
  )
}

export default Sidebar
