import { BookMarked, BrainCircuit, Clock, FileText, Trash2 } from 'lucide-react';
import {useNavigate} from "react-router-dom"



export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return "0 Bytes";

  let size=bytes;
  const unites = ["Bytes", "KB", "MB", "GB", "TB"];
  let uniteIndex=0;
  while(size > 1024 && uniteIndex <= unites.length){
    size /=1024;
    uniteIndex++;
  }
  return `${size.toFixed(1)} ${unites[uniteIndex]}`

};

const DocumentCard = ({document,onDelete}) => {
   const navigate = useNavigate();
      
   const handleNavigation=(e)=>{
     e.preventDefault();
     navigate(`/document/${document._id}`)
   }

   const handleDeleteCard=(doc)=>{
   
    onDelete(doc)

   }

  return (
   
    <div className="group relative bg-white rounded-2xl border border-slate-200 
shadow-sm p-5 transition-all duration-300 
hover:shadow-xl hover:-translate-y-2 
cursor-pointer" >

  {/* Top Section */}
  <div className="flex justify-between items-start mb-2">
    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl 
    transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white">
      <FileText />
    </div>

    <Trash2 
      className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded transition-colors duration-200" 
      strokeWidth={2}
      size={34}
      onClick={()=>handleDeleteCard(document)}
    />
  </div>

  {/* Title */}
  <h2 
    className="text-lg font-semibold text-slate-800 truncate mb-2"
    title={document.title}

  >
    {document.title}
  </h2>

  {/* File Size */}
  {document.fileSize !== undefined && (
    <span className="text-sm text-slate-500">
      {`${formatFileSize(document.fileSize)}`}
    </span>
  )}

  {/* Stats Section */}
  <div className="flex justify-between mt-4 text-sm text-slate-600">

    {document.flashCardCount !== undefined && (
      <div className="flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600  py-2 px-2 rounded-lg ">
        <BookMarked className="w-4 h-4 " />
        <p >{document.flashCardCount} FlashCards</p>
      </div>
    )}

    {document.quizzCount !== undefined && (
      <div className="flex items-center justify-center gap-2 text-indigo-500 p-2 rounded-lg bg-indigo-50 ">
        <BrainCircuit className="w-4 h-4 " />
        <span>{document.quizzCount} Quizzes</span>
      </div>
    )}

  </div>

  {/* Divider */}
  <div className="border-t border-slate-200 my-4"></div>

  {/* Footer */}
  <div className="flex items-center gap-2 text-xs text-slate-400">
    <Clock className="w-4 h-4" />
    Uploaded {(document.createdAt)}
  </div>

</div>

  )
}

export default DocumentCard;
