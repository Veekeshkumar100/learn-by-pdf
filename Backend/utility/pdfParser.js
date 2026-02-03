import  fs from "fs";
import {PDFParse} from "pdf-parse";

export const textExchangFromPdf=async(filePath)=>{
try {
    console.log("file url in text",filePath);
    console.log((PDFParse));
    const databuffer = await fs.readFile(filePath,"utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("file reading data",data);
});
    console.log("databuffer",databuffer);
     const uint8Array = new Uint8Array(databuffer)
    //  pdf-pase except the Unit8array not buffer
      
    const parser = new  PDFParse(uint8Array);
    const data =await parser.getText();
     console.log("extrected data",data);
     
    return {
        text:data.text,
        pageNum:data.numpages,
        data:data.info
    }
} catch (error) {
    console.log('PDF parsing error :',error)
    throw new Error("failed to covert text  from pdfinto error")
} 


}


