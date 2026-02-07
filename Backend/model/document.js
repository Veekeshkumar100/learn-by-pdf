import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
    },
    filePath:{
    type: String,
        required: true
    },
    extreactedText:{
      type: String,
     
    },
   chunk:[{
     content:String,
    chunkIndex:Number,

    pageNumber:Number,}],
    uploadedDate:{
        type: Date,
        default: Date.now,
    },
    lastAccessed:{
        type: Date,
        default: Date.now,
    },
    status:{
        type: String,
        enum: ['processing', 'ready', 'failed'],
        default: 'processing',
    },

}, { timestamps: true });

documentSchema.index({ userId: 1, document: 1 });   

export const Document= mongoose.model("Document",documentSchema);