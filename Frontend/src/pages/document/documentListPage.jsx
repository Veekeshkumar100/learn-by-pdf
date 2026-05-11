import React, { useState } from "react";
import {
  deletetDocumentbyid,
  getDocuments,
  uploadDocument,
} from "../../services/documentServise.js";
import toast from "react-hot-toast";
// import Button from "../../component/common/button.jsx";
// import { Plus, Upload, X, FileText } from "lucide-react";

import {FileText, Plus, Upload, X} from "lucide-react"
import Spinner from "../../component/common/spinar.jsx";


import { useNavigate } from "react-router-dom";
import DocumentCard from "./DocumentCard.jsx";
const DocumentListPage = () => {
  const navigate= useNavigate();
  const [documents, setDocuments] = useState("");
  const [loading, SetLoading] = useState(null);

  //state for uploading document
  const [isUploadModelOpen, setisUploadModelOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploading, setupLoading] = useState(null);
  // delete documentment

  //function for uploading document
  const fetchDocument = async () => {
    SetLoading(true);
    try {
      const response = await getDocuments();
     
      setDocuments(response);
      SetLoading(false);
    } catch (error) {
      toast.error("Failed to fetched document ");
      console.log(error);
    } finally {
      SetLoading(false);
    }
  };
  useState(() => {
    fetchDocument();
  }, []);

  const handelFielChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      setUploadTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  //handle upload document
  const handleUplaodDoc = async (e) => {
    e.preventDefault();
    if (!uploadFile || !uploadTitle) {
      toast.error("must provid file and title");
      return;
    }
    setupLoading(true);
    const formData = new FormData();
    formData.append("pdf", uploadFile);
    formData.append("title", uploadTitle);
    try {
      const response = await uploadDocument(formData);
      toast.success("File uploaded soccessfully");
      navigate('/documents')
      setisUploadModelOpen(false);
      setUploadFile(null);
      setUploadTitle("");
      SetLoading(true);
      fetchDocument();
    } catch (error) {
      console.log(error);
      toast.success("Filed to uploaded document");
    } finally {
      setupLoading(false);
    }
  };


  const handleConfirmDelete = async (doc) => {
    try {
      SetLoading(true)
      const responce = await deletetDocumentbyid(doc._id);
      navigate('/documents')
      if(responce){
        toast.success(`${doc.title} deleted`);
      }else{
        toast.success(`Failed to delete document`);
      }

      const lestL= documents.filter((d)=>d._id!==doc._id)
      
       if(lestL){
         setDocuments(lestL);
       }
       SetLoading(false); 
    } catch (error) {
      toast.error(error.message||"Filed to deleted document");
    }

  };
    if(loading ){
         return <div className=" w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        }

     const renderDocument=()=>{
        if(loading ){
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        }
        if(documents.length === 0){
          return <div className="flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-50 p-5 rounded-full animate-bounce">
            <FileText className="w-10 h-10 text-emerald-500" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
       No Documents Yet
        </h2>

        {/* Description */}
        <p className="text-slate-500 text-sm mb-6">
         You haven’t uploaded any documents. Start by adding your first document
        </p>

        {/* Action Button */}
        {  
          <button
            onClick={()=>setisUploadModelOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          >
            Upload Document
          </button>
        }
      </div>
    </div>
        }

        if(documents.length >0){
         return <div className=" w-full max-w-5xl  mx-auto   gap-3  grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 ">
          {documents?.map((doc,index)=>{
          
            return <DocumentCard 
            key={index}
            document={doc}
            onDelete={handleConfirmDelete}
            />
          })
          }
         </div>
        }


     }

    
  return (
//   <>

// <div className="w-full min-h-screen px-4 sm:px-6 lg:px-12 py-6">
  
//   {/* Header Section */}
//   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    
//     {/* Title Section */}
//     <div className="flex flex-col gap-1 text-center sm:text-left">
//       <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
//         My Documents
//       </h1>
//       <p className="text-sm sm:text-base text-slate-600">
//         Manage and organize your Learning materials
//       </p>
//     </div>

//     {/* Button */}
//     <Button
//       className="w-full sm:w-auto text-sm sm:text-base flex items-center justify-center gap-2"
//       onClick={() => setisUploadModelOpen(true)}
//     >
//       <Plus size={18} />
//       Upload Document
//     </Button>

//   </div>

//   {/* Document Section */}
//   <div className="mt-6">
//     {renderDocument()}
//   </div>

//  </div>
// {
//     isUploadModelOpen && (
//      <div className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4   `} >
//   <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-emerald-200 overflow-hidden">

//     {/* Emerald Gradient Top Border */}
//     <div className="h-2 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500" />

//     {/* Close Button */}
//     <button
//       onClick={() => setisUploadModelOpen(false)}
//       className="absolute top-4 right-4 text-slate-500 hover:text-emerald-600 transition"
//     >
//       <X strokeWidth={2} size={22} />
//     </button>

//     <div className="p-6 sm:p-8">
      
//       {/* Header */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-semibold text-slate-800">
//           Upload Document
//         </h2>
//         <p className="text-sm text-slate-500">
//           Add a PDF document to your library.
//         </p>
//       </div>

//       {/* Form */}
//       <form className="flex flex-col gap-5">

//         {/* Title Input */}
//         <div className="flex flex-col gap-2">
//           <label className="text-xs font-semibold text-slate-600 tracking-wider">
//             DOCUMENT TITLE
//           </label>
//           <input
//             value={uploadTitle}
//             onChange={(e) => setUploadTitle(e.target.value)}
//             className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
//             placeholder="Enter document title..."
//             required
//           />
//         </div>

//         {/* File Upload */}
//         <div className="flex flex-col gap-2">
//           <label className="text-xs font-semibold text-slate-600 tracking-wider">
//             PDF FILE
//           </label>

//           <label className="relative flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-emerald-300 rounded-xl cursor-pointer hover:bg-emerald-50 transition">
            
//             <Upload className="text-emerald-500" strokeWidth={2} size={30} />

//             {uploadFile ? (
//               <span className="text-sm font-medium text-slate-700">
//                 {uploadFile.name}
//               </span>
//             ) : (
//               <span className="text-sm text-slate-500 text-center">
//                 <span className="text-emerald-600 font-semibold">
//                   Click to upload
//                 </span>{" "}
//                 or drag and drop
//               </span>
//             )}

//             <span className="text-xs text-slate-400">
//               PDF up to 10MB
//             </span>

//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={handelFielChange}
//               className="absolute inset-0 opacity-0 cursor-pointer"
//               required
//             />
//           </label>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row gap-3 mt-4">
          
//           <button
//             type="button"
//             onClick={() => setisUploadModelOpen(false)}
//             className="w-full sm:w-1/2 h-11 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             disabled={uploading}
//             onClick={handleUplaodDoc}
//             className="w-full sm:w-1/2 h-11 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white font-medium shadow-lg hover:scale-[1.02] active:scale-95 transition disabled:opacity-60"
//           >
//             {uploading ? "Uploading..." : "Upload"}
//           </button>

//         </div>

//       </form>
//     </div>
//   </div>
// </div>
//     )
// }

//   </>

 <>
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 sm:px-8 lg:px-16 py-8">

  {/* Header Card */}
  <div className="bg-white/70 backdrop-blur-xl rounded-2xl  shadow-md p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

    {/* Left */}
    <div>
      <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight">
        📂 My Documents
      </h1>
      <p className="text-slate-500 mt-1 text-sm">
        Organize, upload and manage your learning files easily
      </p>
    </div>

    {/* Right */}
    <button
      onClick={() => setisUploadModelOpen(true)}
      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 text-white text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
    >
      <Plus size={18} />
      New Upload
    </button>
  </div>

  {/* Document Section */}
  <div className="mt-8">
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
      {renderDocument()}
    </div>
  </div>
</div>

{/* MODAL */}
{
  isUploadModelOpen && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4">

      <div className="w-full max-w-xl bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 relative overflow-hidden">

        {/* Decorative Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/20 blur-3xl rounded-full" />

        {/* Close */}
        <button
          onClick={() => setisUploadModelOpen(false)}
          className="absolute top-5 right-5 text-slate-500 hover:text-red-500 transition"
        >
          <X size={22} />
        </button>

        <div className="p-8">

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Upload New Document
            </h2>
            <p className="text-sm text-slate-500">
              Add your PDF file securely
            </p>
          </div>

          <form className="flex flex-col gap-6">

            {/* Title */}
            <div>
              <label className="text-xs font-semibold text-slate-500">
                DOCUMENT TITLE
              </label>
              <input
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                placeholder="e.g. React Notes"
                className="mt-2 w-full h-12 px-4 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition"
                required
              />
            </div>

            {/* Upload Box */}
            <label className="relative flex flex-col items-center justify-center gap-3 p-8 rounded-2xl border border-dashed border-slate-300 bg-white hover:bg-slate-50 cursor-pointer transition group">

              <div className="p-4 rounded-full bg-slate-100 group-hover:scale-110 transition">
                <Upload size={28} className="text-slate-700" />
              </div>

              {uploadFile ? (
                <p className="text-sm font-medium text-slate-700 text-center">
                  {uploadFile.name}
                </p>
              ) : (
                <p className="text-sm text-slate-500 text-center">
                  Drag & drop your PDF here <br />
                  <span className="text-slate-800 font-medium">
                    or click to browse
                  </span>
                </p>
              )}

              <span className="text-xs text-slate-400">
                Max size: 10MB
              </span>

              <input
                type="file"
                accept="application/pdf"
                onChange={handelFielChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                required
              />
            </label>

            {/* Buttons */}
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setisUploadModelOpen(false)}
                className="w-1/2 h-11 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={uploading}
                onClick={handleUplaodDoc}
                className="w-1/2 h-11 rounded-xl bg-slate-900 text-white font-medium shadow-lg hover:scale-105 active:scale-95 transition disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
</>
   

  )
};

export default DocumentListPage;



