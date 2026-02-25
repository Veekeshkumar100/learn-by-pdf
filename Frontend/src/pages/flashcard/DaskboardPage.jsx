

import  { useEffect, useState } from 'react'
import { getDaskBord } from '../../services/dashBord'
import toast from 'react-hot-toast'
import Loaderforloading from '../../utils/loader'
import { BookOpen, Clock, FileText, TrendingUp } from 'lucide-react'


const DaskboardPage = () => {
  const [dashbordData,SetdashbordData]=useState(null)
  const [loading,Setloading]=useState(false);

       useEffect(()=>{
        Setloading(true);
         const fatchDocumnetData=async()=>{
          try {
             const response= await getDaskBord();
          console.log(response);
          SetdashbordData(response);
          Setloading(false)
          } catch (error) {
            toast.error("Failed to fetch dashbord data");
            console.error("failed to fetch dashbord data")
          }
         
         }
         fatchDocumnetData();
       },[]);

       if(loading){
        return <Loaderforloading/>
       }


if(!dashbordData || !dashbordData.overview){
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 flex flex-col items-center gap-4 animate-bounce">
        
        <div className="bg-amber-100 p-4 rounded-full shadow-inner">
          <TrendingUp className="w-10 h-10 text-amber-500" />
        </div>

        <h2 className="text-lg font-semibold text-gray-700">
          Loading Dashboard...
        </h2>

        <p className="text-sm text-gray-500 text-center max-w-xs">
          Please wait while we fetch your analytics data.
        </p>

      </div>
    </div>
  );
}


return (
  <>
  <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 p-6">
    {/* Header */}
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        Dashboard Overview
      </h1>
      <p className="text-gray-500 mt-2">
        Welcome back! Here’s your analytics summary.
      </p>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {[
        {
          label: "Total Documents",
          value: dashbordData.overview.totalDocument,
          icon: FileText,
          gradient: "from-blue-500 to-cyan-500",
        },
        {
          label: "Total Flashcards",
          value: dashbordData.overview.totalFlashcard,
          icon: BookOpen,
          gradient: "from-purple-500 to-pink-500",
        },
        {
          label: "Total Quizzes",
          value: dashbordData.overview.totalQuiz,
          icon: TrendingUp,
          gradient: "from-amber-500 to-orange-500",
        },
      ].map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl p-6 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            
            {/* {/* Gradient Background Effect */}
            <div
              className={`absolute inset-0 opacity-10 bg-gradient-to-br ${item.gradient}`}
            ></div> 

            {/* Content */}
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">
                  {item.label}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
                  {item.value}
                </h2>
              </div>

              <div
                className={`p-4 rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>
            </div>
          </div>
        );
      })}

    </div>


 
  <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

  {/* Header */}
  <div className="flex items-center gap-3 mb-6">
    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
      <Clock className="w-5 h-5" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800">
      Recent Activity
    </h3>
  </div>

  {
    dashbordData?.recentActivity &&
    (
      (dashbordData.recentActivity.Quizzs?.length > 0) ||
      (dashbordData.recentActivity.documents?.length > 0)
    )
      ?
      (
        <div className="space-y-4">

          {[
            ...(dashbordData.recentActivity.documents || []).map((doc) => ({
              id: doc._id,
              description: doc.title,
              timeStamp: doc.lastAccessed,
              link: `/documents/${doc._id}`,
              type: 'document'
            })),

            ...(dashbordData.recentActivity.Quizzs || []).map((quiz) => ({
              id: quiz._id,
              description: quiz.title,
              timeStamp: quiz.lastAccess,
              link: `/quizs/${quiz._id}`,
              type: 'quiz'
            }))
          ]
            .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))
            .map((item) => (

              <div
                key={item.id}
                className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-200"
              >

                {/* Left Side */}
                <div className="flex items-center gap-4">

                  {/* Animated Dot */}
                  <div className={`w-2 h-2 rounded-full animate-pulse
                    ${item.type === 'document'
                      ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                      : "bg-gradient-to-br from-amber-500 to-orange-500"
                    }`}>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">
                      {item.type === 'document'
                        ? "Accessed Document:"
                        : "Attempted Quiz:"}
                      <span className="ml-1 font-medium text-gray-800">
                        {item.description}
                      </span>
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(item.timeStamp).toLocaleString()}
                    </p>
                  </div>

                </div>

                {/* View Button */}
                {item.link && (
                  <a
                    href={item.link}
                    className="text-sm font-semibold text-indigo-500 hover:text-indigo-800 transition-colors duration-200"
                  >
                    View 
                  </a>
                )}

              </div>

            ))}

        </div>
      )
      :
      (
        <div className="flex flex-col items-center justify-center py-10 text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-500">No recent activity yet</p>
        </div>
      )
  }

</div>

  </div>
  </>
);
}

export default DaskboardPage



