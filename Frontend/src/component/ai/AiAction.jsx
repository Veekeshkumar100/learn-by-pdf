
import React, { useState } from "react";
import { Sparkles, BookOpen, Send, FileText, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { explainContext, generateDocumentSummary } from "../../services/aiServices";
import AIResponse from "../common/AiResponce";

const AiAction = () => {
  const { id: documentId } = useParams();
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState("");

  const handleSummarize = async () => {
    setLoading("summary");
    try {
      const response = await generateDocumentSummary(documentId);
      setSummary(response?.data?.documentSummarry);
    } catch (error) {
      console.error("failed to fetch summary", error);
    } finally {
      setLoading("");
    }
  };

  const handleExplain = async () => {
    if (!content) return;
    setLoading("explanation");
    try {
      const response = await explainContext(documentId, content);
      setExplanation(response?.data?.explaination);
    } catch (error) {
      console.error("failed to fetch explanation", error);
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-50 via-indigo-50 to-purple-50 p-4 md:p-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
          Intelligent Workspace
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Leverage advanced AI to dissect complex documents or get instant clarity on specific concepts.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid  gap-8">
        
        {/* --- CARD 1: SUMMARIZER --- */}
        <div className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-1 shadow-2xl transition-all duration-500 hover:shadow-indigo-200/50">
          <div className="h-full bg-white rounded-[22px] p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600 group-hover:rotate-12 transition-transform">
                <Sparkles size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Smart Summary</h2>
                <p className="text-sm text-gray-500">Condense the entire document into key insights.</p>
              </div>
            </div>

            <div className="flex-grow bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl p-5 mb-6 overflow-y-auto min-h-[300px] max-h-[400px]">
              {loading === "summary" ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <Loader2 className="animate-spin text-indigo-500" size={32} />
                  <p className="text-indigo-400 font-medium animate-pulse">Analyzing document...</p>
                </div>
              ) : (
                <AIResponse content={summary || "Your document summary will materialize here..."} />
              )}
            </div>

            <button
              onClick={handleSummarize}
              disabled={loading === "summary"}
              className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-indigo-200"
            >
              <FileText size={20} />
              {loading === "summary" ? "Processing..." : "Generate Summary"}
            </button>
          </div>
        </div>

        {/* --- CARD 2: CONCEPT EXPLAINER --- */}
        <div className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-1 shadow-2xl transition-all duration-500 hover:shadow-purple-200/50">
          <div className="h-full bg-white rounded-[22px] p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-100 rounded-2xl text-purple-600 group-hover:rotate-12 transition-transform">
                <BookOpen size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Concept Explainer</h2>
                <p className="text-sm text-gray-500">Deep dive into specific parts or terms.</p>
              </div>
            </div>

            <div className="flex-grow flex flex-col gap-4 mb-6">
              {/* Context Input Field */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="What would you like me to explain?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 outline-none transition-all pr-12 shadow-inner bg-slate-50/30"
                />
                <button 
                  onClick={handleExplain}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>

              {/* Response Box */}
              <div className="flex-grow bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl p-5 overflow-y-auto min-h-[230px] max-h-[320px]">
                {loading === "explanation" ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <Loader2 className="animate-spin text-purple-500" size={32} />
                    <p className="text-purple-400 font-medium animate-pulse">Breaking it down...</p>
                  </div>
                ) : (
                  <AIResponse content={explanation || "Ask about a specific term or paragraph above."} />
                )}
              </div>
            </div>

            <button
              onClick={handleExplain}
              disabled={loading === "explanation" || !content}
              className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-bold flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-purple-200"
            >
              <Sparkles size={20} />
              {loading === "explanation" ? "Thinking..." : "Explain Concept"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AiAction;