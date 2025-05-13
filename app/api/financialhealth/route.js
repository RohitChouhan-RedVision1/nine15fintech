import { ConnectDB } from "@/lib/db/ConnectDB"
import FinancialHealthQuestionModel from "@/lib/models/FinancialHealthQuestionModel";
import FinancialHealthUsersModel from "@/lib/models/FinancialHealthUsersModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
    await ConnectDB();
}

LoadDB()

export async function POST(request) {
    const data = await request.json();
    try {
        await FinancialHealthUsersModel.create({
            username: data.user.username,
            mobile: data.user.mobile,
            email: data.user.email,
            message: data.user.message,
            score: data.score,
            healthprofile: data.healthprofile,
            result: data.answers.map((item) => ({
                question: item.question,
                mark: item.selectedAnswerMarks
            }))
        })
        // await transporter.sendMail(mailOptions);
        return NextResponse.json({ msg: "Created" }, { status: 201 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: "Error sending message." }, {
            status: 500
        })
    }
}

export async function GET(request) {
    const questions = await FinancialHealthQuestionModel.find({});
    return NextResponse.json(questions, { status: 200 })
}