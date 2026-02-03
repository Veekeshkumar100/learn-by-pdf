import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Quiz title is required'],
        trim: true
    },
    documentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true,
    },
    questions: [
        {
            questionText: {
                type: String,
                required: [true, 'Question text is required']
            },
            options: {
                type: [String],
                required: [true, 'Options are required'],
                validate: [arrayLimit => arrayLimit.length === 4, 'At least four options are required']
            },
            correctAnswer: {
                type: String,
                required: [true, 'Correct answer is required']
            },
            explanation: {
                type: String,
                default: ''
            },
            difficulty: {
                type: String,
                enum: ['easy', 'medium', 'hard'],
                default: 'medium'
            },
        }],
        userAnswers: [
        {
           questionIndex: {
                type: Number,
                required: true
              },
              selectedOption: {
                type: String,
                required: true
                },
                isCorrect: {
                type: Boolean,
                required: true,
                },
                answeredAt: {
                type: Date,
                default: Date.now
                }
            }],
    score: {
        type: Number,
        default: 0

    },
    totalQuestions: {
        type: Number,
        default: 0
    },
    completedAt: {
        type: Date,
        default: null
    },
}, { timestamps: true });
quizSchema.index({ userId: 1, documentId: 1 }, { unique: true });
export const Quizz = mongoose.model('Quizz', quizSchema);
    