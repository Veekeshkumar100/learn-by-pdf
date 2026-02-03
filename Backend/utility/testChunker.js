/**
 * Text Chunking Utility for AI Processing
 * --------------------------------------
 * - Splits text into chunks with optional overlap
 * - Finds relevant chunks for a given query
 * - Useful for embeddings, RAG, and LLM context management
 */
/** 
 * Splits text into chunks with optional overlap.
 * Designed for embeddings, RAG, and LLM context windows.
 *
 * @param {string} text - Input text
 * @param {number} chunkSize - Words per chunk
 * @param {number} overlap - Overlapping words between chunks
 * @returns {string[]} Chunks of text
 */
// export const chunkText=(text, chunkSize = 500, overlap = 50) =>{
//   if (typeof text !== "string" || !text.trim()) return [];
//   if (overlap >= chunkSize) {
//     throw new Error("overlap must be smaller than chunkSize");
//   }

//   const words = text
//     .replace(/\s+/g, " ")
//     .trim()
//     .split(" ");

//   const chunks = [];
//   let index = 0;

//   while (index < words.length) {
//     const chunk = words.slice(index, index + chunkSize).join(" ");
//     chunks.push(chunk);
//     index += chunkSize - overlap;
//   }

//   return chunks;
// }


export const chunkText=(text, pageNumber=0, chunkSize = 500, overlap = 50)=> {
  console.log(text);
  if (!text || typeof text !== "string") return [];

  if (overlap >= chunkSize) {
    throw new Error("overlap must be smaller than chunkSize");
  }

  // -------- 1. CLEAN TEXT (PDF SAFE) --------
  const cleanedText = text
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // -------- 2. SPLIT BY PARAGRAPH --------
  const paragraphs = cleanedText.split(/\n\n+/);

  const chunks = [];
  let currentChunkWords = [];
  let chunkIndex = 0;

  // -------- 3. PROCESS EACH PARAGRAPH --------
  for (const para of paragraphs) {
    const paraWords = para.split(/\s+/);

    // CASE A: Paragraph itself is larger than chunkSize
    if (paraWords.length > chunkSize) {
      let start = 0;

      while (start < paraWords.length) {
        const slice = paraWords.slice(start, start + chunkSize);
        chunks.push({
          content: slice.join(" "),
          chunkIndex,
          pageNumber
        });
        chunkIndex++;
        start += chunkSize - overlap;
      }
      continue;
    }

    // CASE B: Paragraph fits, but adding it exceeds chunk size
    if (currentChunkWords.length + paraWords.length > chunkSize) {
      chunks.push({
        content: currentChunkWords.join(" "),
        chunkIndex,
        pageNumber
      });
      chunkIndex++;

      // Create overlap from previous chunk
      currentChunkWords = currentChunkWords.slice(-overlap);
    }

    // Add paragraph to current chunk
    currentChunkWords.push(...paraWords);
  }

  // -------- 4. ADD LAST CHUNK --------
  if (currentChunkWords.length > 0) {
    chunks.push({
      content: currentChunkWords.join(" "),
      chunkIndex,
      pageNumber
    });
  }

  // -------- 5. FALLBACK: NO CHUNKS CREATED --------
  if (chunks.length === 0) {
    const words = cleanedText.split(/\s+/);
    let start = 0;

    while (start < words.length) {
      chunks.push({
        content: words.slice(start, start + chunkSize).join(" "),
        chunkIndex,
        pageNumber
      });
      chunkIndex++;
      start += chunkSize - overlap;
    }
  }

  return chunks;
}


/* ------------------ Helpers ------------------ */
/**
 * Finds the most relevant chunks for a query.
 *
 * @param {string} query - User query
 * @param {string[]} chunks - Chunked documents
 * @param {number} topK - Number of relevant chunks
 * @returns {{chunk: string, score: number}[]}
 */
 
export const findRelevantChunks=(query, chunks, topK = 3)=>{
  if (!query || !chunks.length) return [];

  const queryVector = textToVector(query);

  return chunks
    .map(chunk => ({
      chunk,
      score: cosineSimilarity(queryVector, textToVector(chunk))
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
