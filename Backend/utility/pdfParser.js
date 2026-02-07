import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const {PDFParse} = require("pdf-parse");

export const textExchangFromPdf=async(filePath)=>{
try {
    const databuffer =  fs.readFileSync(filePath, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("file reading data",data);
});
   
     const uint8Array = new Uint8Array(databuffer)
    //  pdf-pase except the Unit8array not buffer
    const parser = new  PDFParse(uint8Array);
    const data =await parser.getText();

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




