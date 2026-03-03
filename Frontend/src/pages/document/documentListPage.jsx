import React, { useState } from "react";
import {
  deletetDocumentbyid,
  getDocuments,
  uploadDocument,
} from "../../services/documentServise.js";
import toast from "react-hot-toast";
import Button from "../../component/common/button.jsx";

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
    console.log(file);
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
      console.log(response);
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
         return <div className="w-full flex flex-wrap gap-4">
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
  <>

  <div className="w-full min-h-screen px-4 sm:px-6 lg:px-12 py-6">
  
  {/* Header Section */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    
    {/* Title Section */}
    <div className="flex flex-col gap-1 text-center sm:text-left">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
        My Documents
      </h1>
      <p className="text-sm sm:text-base text-slate-600">
        Manage and organize your Learning materials
      </p>
    </div>

    {/* Button */}
    <Button
      className="w-full sm:w-auto text-sm sm:text-base flex items-center justify-center gap-2"
      onClick={() => setisUploadModelOpen(true)}
    >
      <Plus size={18} />
      Upload Document
    </Button>

  </div>

  {/* Document Section */}
  <div className="mt-6">
    {renderDocument()}
  </div>

</div>
{
    isUploadModelOpen && (
     <div className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4   `} >
  <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-emerald-200 overflow-hidden">

    {/* Emerald Gradient Top Border */}
    <div className="h-2 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500" />

    {/* Close Button */}
    <button
      onClick={() => setisUploadModelOpen(false)}
      className="absolute top-4 right-4 text-slate-500 hover:text-emerald-600 transition"
    >
      <X strokeWidth={2} size={22} />
    </button>

    <div className="p-6 sm:p-8">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">
          Upload Document
        </h2>
        <p className="text-sm text-slate-500">
          Add a PDF document to your library.
        </p>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-5">

        {/* Title Input */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-600 tracking-wider">
            DOCUMENT TITLE
          </label>
          <input
            value={uploadTitle}
            onChange={(e) => setUploadTitle(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
            placeholder="Enter document title..."
            required
          />
        </div>

        {/* File Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-600 tracking-wider">
            PDF FILE
          </label>

          <label className="relative flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-emerald-300 rounded-xl cursor-pointer hover:bg-emerald-50 transition">
            
            <Upload className="text-emerald-500" strokeWidth={2} size={30} />

            {uploadFile ? (
              <span className="text-sm font-medium text-slate-700">
                {uploadFile.name}
              </span>
            ) : (
              <span className="text-sm text-slate-500 text-center">
                <span className="text-emerald-600 font-semibold">
                  Click to upload
                </span>{" "}
                or drag and drop
              </span>
            )}

            <span className="text-xs text-slate-400">
              PDF up to 10MB
            </span>

            <input
              type="file"
              accept="application/pdf"
              onChange={handelFielChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              required
            />
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          
          <button
            type="button"
            onClick={() => setisUploadModelOpen(false)}
            className="w-full sm:w-1/2 h-11 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={uploading}
            onClick={handleUplaodDoc}
            className="w-full sm:w-1/2 h-11 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white font-medium shadow-lg hover:scale-[1.02] active:scale-95 transition disabled:opacity-60"
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
