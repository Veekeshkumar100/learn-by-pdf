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
 * Finds the most relevant chunks for a given question
 * @param {string} question - User question
 * @param {Array} chunks - Array of chunk objects { content, chunkIndex, pageNumber }
 * @param {number} topK - Number of top relevant chunks to return
 * @returns {Array} - Top K relevant chunks with score
 */
// export const  findRelevantChunks=(question, chunks, topK = 3)=>{
//   if (!question || !Array.isArray(chunks) || chunks.length === 0) {
//     return []
//   }

//   // ---------- helpers ----------
//   const normalize = (text) =>
//     text
//       .toLowerCase()
//       .replace(/[^\w\s]/g, '')
//       .split(/\s+/)
//       .filter(Boolean)

//   const questionTokens = normalize(question)

//   // ---------- scoring ----------
//   const scoredChunks = chunks.map(chunk => {
//     const chunkTokens = normalize(chunk.content)
//       console.log("ct",chunkTokens);
//     let score = 0
//     const tokenFrequency = {}

//     // build frequency map for chunk
//     for (const token of chunkTokens) {
//       tokenFrequency[token] = (tokenFrequency[token] || 0) + 1
//     }

//     // score based on overlap + frequency
//     for (const qToken of questionTokens) {
//       if (tokenFrequency[qToken]) {
//         score += tokenFrequency[qToken]
//       }
//     }
    
//     return {
//       ...chunk,
//       score
//     }
//   })

//   console.log(scoredChunks)

//   // ---------- sort + select ----------
//   return scoredChunks
//     .filter(chunk => chunk.score > 0)
//     .sort((a, b) => b.score - a.score)
//     .slice(0, topK)
// }


export const findRelevantChunks = (chunks, query, maxChunks = 3) => {

if (!chunks || chunks.length === 0 || !query) {
return [];
}

// Common stop words to exclude
const stopWords = new Set(['the', 'is', 'at', 'which', 'on', 'a', 'an', 'and','or', 'in', 'with', 'to', 'for', 'of', 'as', 'by', 'this', 'that' ]);

// Extract and clean query words

const queryWords = 
query
.toLowerCase()
.split(/\s+/)
.filter(w => w.length > 2 && !stopWords.has(w));

if (queryWords.length === 0) {
// Return clean chunk objects without Mongoose metadata
return chunks.slice(0, maxChunks).map(chunk => ({
content: chunk.content,
chunkIndex: chunk.chunkIndex,
pageNumber: chunk.pageNumber, _id: chunk._id

}));
}

const scoredChunks = chunks.map((chunk, index) => {
const content = chunk.content.toLowerCase();
const contentWords = content.split(/\s+/).length;
let score = 0;
// Score each query word
for (const word of queryWords) {
// Exact word match (higher score)
const exactMatches = (content.match(new RegExp('\\b${word}\\b','g')) || []).length;
score += exactMatches * 3;
// Partial match (lower score)
const partialMatches = (content.match(new RegExp(word, 'g')) || []).length;
score += Math.max(0, partialMatches - exactMatches) * 1.5;
}

// Bonus: Multiple query words found

const uniqueWordsFound =queryWords.filter(word =>content.includes(word)).length;
if (uniqueWordsFound > 1) {
score += uniqueWordsFound * 2;
}

// Normalize by content length


const normalizedScore = score / Math.sqrt(contentWords);

//Small bonus for earlier chunks

const positionBonus = 1 -(index / chunks.length) * 0.1;

// Return clean object without Mongoose metadata
return {
content: chunk.content,
chunkIndex: chunk.chunkIndex,
pageNumber: chunk.pageNumber,
_id: chunk._id,
score: normalizedScore * positionBonus,
rawScore: score,
matchedWords: uniqueWordsFound
};
});

return scoredChunks
.filter(chunk => chunk.score > 0)
.sort((a, b) => {
if (b.score !== a.score) {
return b.score -a.score;
}
if (b.matchedWords !== a.matchedWords) {
return b.matchedWords - a.matchedWords;
}

return a.chunkIndex - b.chunkIndex;
})
.slice(0, maxChunks);
}
