import { File, SparklesIcon } from 'lucide-react'
import React from 'react'

const EmptySet = ({ name,title,description,generatQuizzes,generating}) => {
 
  return  <div className="w-full min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white shadow-xl rounded-2xl p-8 border border-slate-200">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-emerald-100 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6l4 2M4 6h16M4 10h16M4 14h10"
              />
            </svg>
            {/* <File/> */}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">
         {title}
        </h2>

        {/* Description */}
        <p className="text-slate-500 text-sm mb-6">
         {description}
        </p>

        {/* Button */}
        {
        generatQuizzes &&  <button
         onClick={generatQuizzes}
        disabled={generating}
          className="  flex justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-xl transition duration-200 shadow-md"
        > 
        <SparklesIcon/>
            {
                generating ? ` Generate ${name}...` :`Generate ${name}`
            }
          
        </button>
        } 
          
      </div>
    </div>
    
}

export default EmptySet
