import mongoose from "mongoose";

const { Schema } = mongoose;
const ChatHistorySchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    message: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timeStamp: {
          type: Date,
          default: Date.now,
        },
        relevantChunk: {
          type: [Number],
          default: [],
        },
      },
    ],
  },
  { timestamps: true },
);

ChatHistorySchema.index({ user: 1, documentId: 1 });

export const ChatHistory = mongoose.model("ChatHistory", ChatHistorySchema);
