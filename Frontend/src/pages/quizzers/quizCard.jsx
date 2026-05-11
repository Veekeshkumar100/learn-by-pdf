
import React, { useState } from "react";
import {
  Search,
  Trash2,
  Calendar,
  FileQuestion,
  Trophy,
  Filter,
  BarChart2,
  Play
} from "lucide-react";
import { Link } from "react-router-dom";

const QuizDashboard = ({ quizzes, onDelete }) => {
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
    <div className="min-h-screen  p-6">

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-slate-800">
          Quiz Dashboard
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search quizzes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 
              focus:ring-2 focus:ring-purple-500 outline-none bg-white shadow-sm"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white shadow-sm">
            <Filter size={16} className="text-slate-500" />
            <select
              className="outline-none bg-transparent text-sm"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="score">Best Score</option>
              <option value="recent">Recent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="text-center text-slate-500 mt-20">
          No quizzes found
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

          {filtered.map((quiz) => {
            const percentage = (quiz.score / 100) * 100;

            return (
              <div
                key={quiz.id}
                className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-purple-500 via-indigo-500 to-violet-500 hover:scale-[1.02] transition-all duration-300"
              >
                {/* Inner Card */}
                <div className="bg-white rounded-3xl p-6 h-full shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">

                  {/* Delete */}
                  <button
                    onClick={() => onDelete(quiz._id)}
                    className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Top */}
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                      {quiz.title}
                    </h2>

                    {/* Score Badge */}
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                      <Trophy size={14} />
                      {percentage.toFixed(1)}%
                    </div>

                    {/* Progress */}
                    <div className="mt-4">
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-700"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="mt-5 space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <FileQuestion size={15} />
                        {quiz.totalQuestions} Questions
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar size={15} />
                        {quiz.createdAt}
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="mt-6">
                    {quiz?.userAnswers?.length > 1 ? (
                      <Link to={`/quizz/${quiz._id}/result`}>
                        <button className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition">
                          <BarChart2 size={16} />
                          View Result
                        </button>
                      </Link>
                    ) : (
                      <Link to={`/quizz/${quiz._id}`}>
                        <button className="w-full h-11 flex items-center justify-center gap-2 rounded-xl border border-purple-200 text-purple-600 hover:bg-purple-50 transition text-sm font-medium">
                          <Play size={16} />
                          Start Quiz
                        </button>
                      </Link>
                    )}
                  </div>

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