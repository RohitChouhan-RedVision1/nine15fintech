
import mongoose from 'mongoose'


const FinancialHealthQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

const FinancialHealthQuestionModel = mongoose.models.financialhealthquestions || mongoose.model('financialhealthquestions', FinancialHealthQuestionSchema);

export default FinancialHealthQuestionModel;