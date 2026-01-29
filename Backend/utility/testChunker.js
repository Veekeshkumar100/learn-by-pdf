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
function chunkText(text, chunkSize = 200, overlap = 50) {
  if (typeof text !== "string" || !text.trim()) return [];
  if (overlap >= chunkSize) {
    throw new Error("overlap must be smaller than chunkSize");
  }

  const words = text
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  const chunks = [];
  let index = 0;

  while (index < words.length) {
    const chunk = words.slice(index, index + chunkSize).join(" ");
    chunks.push(chunk);
    index += chunkSize - overlap;
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
function findRelevantChunks(query, chunks, topK = 3) {
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
