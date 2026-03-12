
import React, { useState } from "react";
import {
  Search,
  Trash2,
  Calendar,
  FileQuestion,
  Trophy,
  Filter,
  BarChart2,
  Plus,
  Play
} from "lucide-react";
import { Link } from "react-router-dom";


const QuizDashboard = ({quizzes,onDelete}) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = quizzes
    .filter((q) =>
      q.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === "score") return b.score - a.score;
      return 0;
    });

  return (

    <div className=" backdrop:border-blur-xl   ">

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col  gap-4 p-6">

        <h1 className="text-3xl font-bold text-gray-800">
          Quiz Dashboard
        </h1>

        {/* Search */}
        <div className="flex items-center gap-3">

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-2.5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search quiz..."
              className="pl-9 pr-4 py-2 rounded-lg focus:outline-none  focus:border-emerald-500  border-2 border-slate-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 bg-white  px-3 py-2 rounded-lg focus:border-emerald-500  border-2 border-slate-200">
            <Filter size={16} />
            <select
              className="outline-none bg-transparent"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="score">Best Score</option>
              <option value="recent">Recent</option>
            </select>
          </div>

        </div>
      </div>

      {/* Quiz Cards */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          No quizzes found
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-1  lg:grid-cols-2 p-2 ">

          {filtered.map((quiz) => {
            const percentage =
              (quiz.score / 100) * 100;
            return (
              <div
                key={quiz.id}
                className="bg-white rounded-2xl  p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition border-2 border-slate-200"
              >

                {/* Top */}
                <div>

                  <div className="flex justify-between">

                    <h2 className="font-semibold text-lg text-gray-800">
                      {quiz.title}
                    </h2>

                    <button className="p-2 rounded-lg hover:bg-red-50 text-red-500"  onClick={()=>onDelete(quiz._id)}>
                      <Trash2 size={18} />
                    </button>

                  </div>

                  {/* Score */}
                  <div className="mt-3 flex items-center gap-2 text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full w-fit">
                    <Trophy size={16} />
                    {percentage.toFixed(1)}/100 
                  </div>

                  {/* Progress */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div
                        className="bg-emerald-300 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-4 space-y-2 text-sm text-gray-600">

                    <div className="flex items-center gap-2">
                      <FileQuestion size={16} />

                      {quiz.totalQuestions} Questions
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {quiz.createdAt}
                    </div>

                  </div>

                </div>

                {/* Button */}
               
               <div className= "w-full flex justify-center mt-4 pt-2  border-t border-slate-100">
                {
                  quiz?.userAnswers?.length > 1 ? (
                    <Link to={`/quizz/${quiz._id}/result`} className="w-full" >
                       <button className="w-full h-11 font-semibold flex justify-center items-center bg-slate-100 px-5 rounded-2xl py-3 gap-4  hover:bg-slate-200 transition duration-300 ">
                        <BarChart2 className="w-4 h-4" strokeWidth={2.5}/>
                        View Result
                      </button>
                    </Link> 
                  ) :(
                     <Link to={`/quizz/${quiz._id}`}   className="w-full" >
                      <button className="w-full h-11 font-semibold flex justify-center items-center bg-slate-100 px-5 rounded-2xl py-3 gap-4  hover:bg-slate-200 transition duration-300 ">
                        <Play className="w-4 h-4" strokeWidth={2.5} />
                        Start quizz
                      </button>
                    </Link>  
                  )
                }
               </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizDashboard;

