
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Applayout = ({ children }) => {
  const [isSideBaropen, SetisSideBaropen] = useState(true);

  const toggleSideBar = () => {
    SetisSideBaropen(!isSideBaropen);
  };

  return (
    <div className="flex min-h-screen  bg-neutral-50 text-neutral-900">
      
      {/* Sidebar */}
     
        <Sidebar
          isSideBaropen={isSideBaropen}
          toggleSideBar={toggleSideBar}
        />
   

      {/* Main Section */}
      <div className="flex flex-col flex-1 w-full">
        
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white shadow-sm">
          <Header toggleSideBar={toggleSideBar} />
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6 mt-2 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
};

export default Applayout;
