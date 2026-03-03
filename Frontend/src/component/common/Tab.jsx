
import React from "react";

const Tab = ({ tab, active, setActive }) => {
  return (
    <div className="w-full max-w-4xl  mt-8">
      
      {/* Tab Header */}
      <div className="flex gap-4 justify-between border-b border-slate-200 relative">
        {tab.map((item, index) => (
          <button
            key={index}
            onClick={() => setActive(item.name)}
            className={`relative px-5 py-2 font-medium transition-all duration-300   
            ${
              active === item.name
                ? "text-emerald-600 "
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            <span className={`${active === item.name?"":"hover:bg-linear-to-r from-emerald-400 to-emerald-300 p-2  rounded-2xl hover:text-white"} transition duration-300 `}>{item.name}</span>

            {/* Active underline */}
            {active === item.name && (
              <div className="absolute left-0 bottom-0 w-full h-0.5 bg-emerald-500 rounded-full transition-all duration-300" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6 bg-white rounded-2xl shadow-md  transition-all duration-300">
        {tab.map((item, index) =>{
     if(active === item.name){
        console.log(item)
            return <div key={index} className="w-full h-full text-slate-700">
              {item.content()}
            </div>
          }
          return null;
        }
        )}
      </div>
    </div>
  );
};

export default Tab;