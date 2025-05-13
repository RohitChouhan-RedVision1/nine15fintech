
import mongoose from 'mongoose'


const RiskQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answers: [{
        text: {
            type: String,
            required: true
        },
        marks: {
            type: Number,
            required: true
        }
    }],
},
    {
        timestamps: true
    })

const RiskQuestionModel = mongoose.models.riskquensions || mongoose.model('riskquensions', RiskQuestionSchema);

export default RiskQuestionModel;