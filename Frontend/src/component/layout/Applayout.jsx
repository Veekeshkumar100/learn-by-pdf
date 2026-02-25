
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Applayout = ({ children }) => {
  const [isSideBaropen, SetisSideBaropen] = useState(true);

  const toggleSideBar = () => {
    SetisSideBaropen(!isSideBaropen);
  };

  return (
    <div className=" flex min-h-screen  bg-neutral-50 text-neutral-900">
      
  

        <Sidebar 
          isSideBaropen={isSideBaropen}
          toggleSideBar={toggleSideBar}
          />
      
   
         

      {/* Main Section */}
      <div className=" md:pl-64 flex flex-col flex-1 overflow-hidden ">
          
        {/* Header */}
        
          <Header toggleSideBar={toggleSideBar} />
           <main className="flex-1 p-6 mt-10  overflow-y-auto">
          <Outlet/>
        </main>

        {/* Page Content */}
      
      </div>
 </div>
  );
};

export default Applayout;
