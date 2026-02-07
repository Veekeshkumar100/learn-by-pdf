import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

if (!process.env.GEMINI_API_KEY) {
  console.error("api key is not feyched from evn folder");
  process.exit(1);
}

export const generateFlashCardfromAi = async (text, count = 10) => {
  const prompt = `generate exactly ${count} educational flashcards from the following text.
        Formart each FlashCards as:
        Q:[clear,specific question]
        A:[concise , accurate answer]
        D:[defficulty level: easy,medium, or hard]

       seperate each flashcard with "---"

        TEXT:
        ${text.substring(0, 1500)}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    console.log("res", response.text);
    const generatedText = response.text;
    const FlashCard = [];
    const cards = generatedText.split("---");
    // console.log("cards in gem",cards)
    for (const card of cards) {
      let lines = card.trim().split("\n");
      let question = "",
        answer = "",
        difficulty = "medium";
      console.log("lines", lines);
      for (const line of lines) {
        if (line.startsWith("Q:")) {
          question = line.substring(2).trim();
        } else if (line.startsWith("A:")) {
          answer = line.substring(2).trim();
        } else if (line.startsWith("D:")) {
          const diff = line.substring(2).trim().toLowerCase();
          if (["easy", "medium", "hard"].includes(diff)) {
            difficulty = diff;
          }
        }
      }
      if (question && answer) {
        FlashCard.push({ question, answer, difficulty });
      }
    }
    return FlashCard.splice(0, count);
  } catch (error) {
    console.log("gemini api error", error);
    throw new Error("Failed to generate flashcard");
  }
};

export const generateQuiz = async (text, numQuize = 5) => {
  const prompt = `generate exactly ${numQuize} multiple choice question from the following text.
    Formart :
    Q:[Question]
    Q1:[option1]
    Q2:[option2]
    Q3:[option3]
    Q4:[option4]
    c:[currect option- exactly as written above]
    E:[Brief explanation]
    D:[difficulty:easy,midium, or hard]
   
       seperate each flashcard with "---"

        TEXT:
        ${text.substring(0, 1500)}
        `;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const generatedText = response.text;
    console.log(generatedText);
    const questions = [];
    const questionBlocks = generatedText.split("---").filter((q) => q.trim());
    for (const block of questionBlocks) {
      let lines = block.trim().split("\n");
      
      let question = "",
        option = [],
        currectanswer = "",
        explanation = "",
        difficulty = "medium";
      for (const line of lines) {
        const trimmed = line.trim();
        const optionMatch = trimmed.match(/^Q[1-4]:\s*(.+)$/i);
       
        if (optionMatch) {
          option.push(optionMatch[1].trim());
        } else if (/^C:/i.test(trimmed)) {
          currectanswer = trimmed.substring(2).trim();
        } else if (/^Q:/i.test(trimmed)) {
          question = trimmed.substring(2).trim();
        } else if (trimmed.startsWith("E:")) {
          explanation = trimmed.substring(2).trim();
        } else if (trimmed.startsWith("D:")) {
          let diff = trimmed.substring(2).trim();
          if (["easy", "medium", "hard"].includes(diff)) {
            difficulty = diff;
          }
        }
      }

      if (question && option.length === 4 && currectanswer) {
        questions.push({
          question,
          option,
          currectanswer,
          explanation,
          difficulty,
        });
      }
    }
    console.log("questions", questions);
    return questions.splice(0, numQuize);
  } catch (error) {
    console.log("gemini api error", error);
    throw new Error("Failed to generate quize");
  }
};

export const generatText = async (text) => {
  const prompt = `provide a concise summary of following text,highlighting the key concepts,main ideas ,important points
     keep the summary clear and structured
 TEXT:
        ${text.substring(0, 1500)}
        `;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const generatedText = response.text;
    return generatedText;
  } catch (error) {
    console.log("gemini api error", error);
    throw new Error("Failed to generate quize");
  }
};

export const chatwithcontext = async (question, chunk) => {
  const context = chunk.map(
    (c, i) => `[chunk  ${i + 1}] \n ${c.content}.join('\n\n)`,
  );

 
  const prompt = `Based on the following context from the document .Analyse the document and answer the following quetion
    if the answer is not in the context ,say so,
    context:
    ${context}
    Question:
    ${question}
    Answer:
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const chatAnswer = response.text;
    return chatAnswer;
  } catch (error) {
    console.log("gemini api error", error);
    throw new Error("Failed to generate answer");
  }
};

export const explainConcept = async (concept, context) => {
  const prompt = `explain the concept of "${concept}" based on the following context.
    Provide a clear, educational explaination that clear to understand.
    include the explample if relevant
    Context:
    ${context.substring(0, 10000)}
    `;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const generatedText = response.text;
    return generatedText;
  } catch (error) {
    console.log("gemini api error", error);
    throw new Error("Failed to generate quize");
  }
};
