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
import DocumentCard from "./documentDetailPage.jsx";
import { space } from "postcss/lib/list";
const DocumentListPage = () => {
  const [documents, setDocuments] = useState("");
  const [loading, setLoading] = useState(null);

  //state for uploading document
  const [isUploadModelOpen, setisUploadModelOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploading, setupLoading] = useState(null);

  //delete documentment
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isDeletedModelOpen, setisDeletedModelOpen] = useState(false);

  //function for uploading document
  const fetchDocument = async () => {
    setLoading(true);
    try {
      const response = await getDocuments();
      console.log(response);
      setDocuments(response);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetched document ");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useState(() => {
    fetchDocument();
  }, []);

  const handelFielChange = (e) => {
    const file = e.target.file[0];
    if (file) {
      setUploadFile(file);
      setUploadTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  //handle upload document
  const handleUplaodDoc = async (e) => {
    e.preventDefault();
    if (!uploadFile || uploadTitle) {
      toast.error("must provid file and title");
      return;
    }
    setupLoading(true);
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("title", uploadTitle);
    try {
      response = await uploadDocument(formData);
      toast.success("File uploaded soccessfully");
      setisUploadModelOpen(false);
      setUploadFile(null);
      setUploadTitle("");
      setLoading(true);
      fetchDocument();
    } catch (error) {
      toast.success("Filed to uploaded document");
    } finally {
      setupLoading(false);
    }
  };

  const handleDeleteRequest = (doc) => {
    if (doc) {
      setSelectedDoc(doc);
      setisDeletedModelOpen(true);
    }
  };

  const handleConfirmDelete = async (doc) => {
     handleDeleteRequest(doc)
    try {
      const responce = await deletetDocumentbyid(selectedDoc._id);
      toast.success(`${selectedDoc.title} deleted`);
      setisDeletedModelOpen(true);
      setSelectedDoc(null);
      setDocuments(documents.filter((d)=>d._id!==selectedDoc._id));
    } catch (error) {
      toast.error(error.message||"Filed to deleted document");
    }

  };

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
         return <div className="grid sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-4 gap-4">
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
  <div className=" w-full h-screen ">
      <div className="flex justify-between p-6">
        <div className="flex flex-col gap-1 ">
       <h1 className="text-3xl font-bold ">My Documents</h1>
        <p className="text-slate-700">Manage and organize your Learning materials</p>
        </div>
          <Button className="text-base flex gap-1" onClick={()=>setisUploadModelOpen(true)}> <Plus size={20} />  upload document</Button>
      
      </div>
    {renderDocument()}
  </div> 

  {/* <div className=" fixed inset-0 z-100 bg-slate-900/50 backdrop-blur-sm h-screen w-full flex justify-center items-center">
    <div className=" relative bg-white/90 backdrop-blur-2xl  p-6 w-full max-w-lg border border-slate-200/50 shadow-2xl shadow-slate-900/200 rounded-2xl  ">
      <button onClick={()=>setisUploadModelOpen()} className="absolute right-5 top-5">
        <X strokeWidth={2} size={20} className="text-slate-600"/>
      </button>
      
        <div className="flex flex-col gap-1 ">
          <h2 className="text-xl font-medium tracking-tight text-slate-700">Upload Bocument</h2>
          <p className="text-sm text-slate-700">Add a pdf document t oyour library.</p>
        </div>

        
        <form className="flex flex-col gap-3 mt-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-700 tracking-wide"> DOCUMENT TITLE</label>
            <input 
            value={uploadTitle}
            onChange={()=>setUploadTitle(e.target.value)}
            className="w-full h-12 px-4  outline-none border-2 rounded-xl border-slate-400 bg-slate-50/50 text-slate-900  placeholder-slate-400"
          
            required
            placeholder="Enter document title.."
            />
          </div>
          <div className="">
            <label htmlFor="" className="text-xs font-semibold text-slate-700 tracking-wide">PDF FILE</label>
            <div className="relative border border-de border-slate-600 border-4">
             <input 
            value={uploadFile}
            onChange={handelFielChange}
            className=" outline-0 "
            required
           
            />
            <div className="">
            <div className="">
              <Upload strokeWidth={2}/>
            </div>
            <p className="">
              {
                uploadFile ? 
                (
                  <span className=""> {uploadFile.name}</span>
                ):
                (
                  <>
                  <span className="">
                    click to upload
                  </span>{" "}
                  or drage and drop
                  </>
                 
                )
              }
            </p>
            <p>PDF up to 10MB</p>  
            </div>
            </div>

          </div>

      

   
    <div className="">
      <button
      type="submit"
      onClick={()=>setisUploadModelOpen(false)}
      className=""
      disabled={uploading}
      >Cancel</button>

      <button  type="submit"
      className=""
      disabled={uploading}>
         {
          uploading ? (
            <span className="">
            <div/>
              uploading...</span>
          ):<span>upload</span>
         }
      </button>
    </div>
      </form>
    </div>  
     </div> */}
<div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
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
            className="w-full sm:w-1/2 h-11 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white font-medium shadow-lg hover:scale-[1.02] active:scale-95 transition disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

        </div>

      </form>
    </div>
  </div>
</div>
  </>
   
  )
};

export default DocumentListPage;
