
import React from "react";

const Tab = ({ tab, active, setActive }) => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      
      {/* Wrapper */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
        
        {/* Header */}
        <div className="relative flex  border-b border-slate-200 pb-2   justify-around">
          
          {tab.map((item, index) => (
            <button
              key={index}
              onClick={() => setActive(item.name)}
              className={`relative px-2 py-2  font-medium transition-all duration-300  
                ${
                  active === item.name
                    ? "text-purple-600"
                    : "text-slate-500 hover:text-slate-800"
                }`}
            >
              {item.name}

              {/* Active Indicator */}
              {active === item.name && (
                <span className=" absolute left-0 -bottom-[-2px] h-[2px] w-full bg-purple-600 rounded-full transition-all duration-300" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-6 p-2 ">
          {tab.map((item, index) => {
            if (active === item.name) {
              return (
                <div
                  key={index}
                  className="text-slate-700 animate-in fade-in duration-300 "
                >
                  {item.content()}
                </div>
              );
            }
            return null;
          })}
        </div>

      </div>
    </div>
  );
};

export default Tab;
// // import React, { useEffect, useRef, useState } from "react";

// // const Tab = ({ tab, active, setActive }) => {
// //   const containerRef = useRef(null);
// //   const [indicatorStyle, setIndicatorStyle] = useState({});

// //   useEffect(() => {
// //     const activeIndex = tab.findIndex((t) => t.name === active);
// //     const container = containerRef.current;

// //     if (container && container.children[activeIndex]) {
// //       const el = container.children[activeIndex];
// //       setIndicatorStyle({
// //         width: el.offsetWidth,
// //         left: el.offsetLeft,
// //       });
// //     }
// //   }, [active, tab]);

// //   return (
// //     <div className="w-full max-w-5xl mx-auto mt-10">
      
// //       {/* Wrapper */}
// //       <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4">
        
// //         {/* Header */}
// //         <div className="relative">
// //           <div
// //             ref={containerRef}
// //             className="flex gap-6 border-b border-slate-200 pb-2 relative"
// //           >
// //             {tab.map((item, index) => (
// //               <button
// //                 key={index}
// //                 onClick={() => setActive(item.name)}
// //                 className={`relative px-2 py-2 text-sm font-medium transition-all duration-300
// //                   ${
// //                     active === item.name
// //                       ? "text-purple-600"
// //                       : "text-slate-500 hover:text-slate-800"
// //                   }`}
// //               >
// //                 {item.name}
// //               </button>
// //             ))}

// //             {/* Sliding Indicator */}
// //             <span
// //               className="absolute bottom-0 h-[2px] bg-purple-600 rounded-full transition-all duration-300"
// //               style={indicatorStyle}
// //             />
// //           </div>
// //         </div>

// //         {/* Content */}
// //         <div className="mt-6 p-2">
// //           {tab.map((item, index) => {
// //             if (active === item.name) {
// //               return (
// //                 <div
// //                   key={index}
// //                   className="text-slate-700 animate-in fade-in duration-300"
// //                 >
// //                   {item.content()}
// //                 </div>
// //               );
// //             }
// //             return null;
// //           })}
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default Tab;