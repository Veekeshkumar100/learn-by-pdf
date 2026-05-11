
import React from "react";
import { BookMarked, BrainCircuit, Clock, FileText, Trash2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return "0 Bytes";

  let size = bytes;
  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;

  while (size > 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

const DocumentCard = ({ document, onDelete }) => {
  const navigate = useNavigate();

  const handleNavigation = (e) => {
    e.preventDefault();
    navigate(`/documents/${document._id}`);
  };

  const handleDeleteCard = (doc, e) => {
    e.stopPropagation();
    onDelete(doc);
  };

  return (
    <div
      onClick={handleNavigation}
      className="group relative w-full rounded-3xl p-[1px] bg-gradient-to-br from-purple-500 via-indigo-500 to-violet-500 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
    >
      {/* Inner Card */}
      <div className="bg-white rounded-3xl p-5 h-full shadow-md hover:shadow-2xl transition-all duration-300">

        {/* Top Section */}
        <div className="flex justify-between items-start mb-3">
          <div className="p-3 rounded-2xl bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
            <FileText size={20} />
          </div>

          <button
            onClick={(e) => handleDeleteCard(document, e)}
            className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-slate-800 line-clamp-2 mb-1">
          {document.title}
        </h2>

        {/* File Size */}
        {document.fileSize !== undefined && (
          <p className="text-sm text-slate-500 mb-3">
            {formatFileSize(document.fileSize)}
          </p>
        )}

        {/* Stats */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {document.flashCardCount !== undefined && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-50 text-purple-600">
              <BookMarked className="w-3 h-3" />
              {document.flashCardCount} Cards
            </div>
          )}

          {document.quizzCount !== undefined && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600">
              <BrainCircuit className="w-3 h-3" />
              {document.quizzCount} Quiz
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{document.createdAt}</span>
          </div>

          <span className="text-purple-500 font-medium opacity-0 group-hover:opacity-100 transition">
            Open →
          </span>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;