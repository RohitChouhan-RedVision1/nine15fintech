"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FeedbackForm = () => {
    const [mainData, setMainData] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        // Check if feedback has already been submitted
        const feedbackSubmitted = localStorage.getItem("feedbackSubmitted");
        if (feedbackSubmitted) {
            setIsSubmitted(true);
        } else {
            fetchdata();
        }
    }, []);

    const fetchdata = async () => {
        const data = await fetch("/api/admin/site-settings");
        if (data.ok) {
            const maindata = await data.json();
            setMainData(maindata[0]);
        }
    };

    const [formData, setFormData] = useState({
        designSatisfaction: "",
        onTimeDelivery: "",
        coordinationSatisfaction: "",
        additionalFeedback: "",
        emojiRating: "😍",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEmojiClick = (rating) => {
        setFormData({ ...formData, emojiRating: rating });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailData = {
            user: "Redvision Technology",
            to: process.env.NEXT_PUBLIC_SMTP_MAIL,
            subject: `Feedback`,
            text: `
              ${mainData.title} Feedback details are as below.\n
              Were you satisfied with the website's design and functionality? - (${formData.designSatisfaction})\n
              Was the website delivered on time? - (${formData.onTimeDelivery})\n
              Were you satisfied with the coordination and communication during the process? - (${formData.coordinationSatisfaction})\n
              We would love to listen to anything about our services - (${formData.emojiRating})\n
              Regards,\n
              Website Team,\n
              Redvision Technology
            `,
        };
        try {
            await axios.post('/api/email/', emailData);
            await axios.get(`${process.env.NEXT_PUBLIC_DATA_API}/api/feedback?designSatisfaction=${formData.designSatisfaction}&onTimeDelivery=${formData.onTimeDelivery}&coordinationSatisfaction=${formData.coordinationSatisfaction}&additionalFeedback=${formData.additionalFeedback}&emojiRating=${formData.emojiRating}&email=${mainData.email}&title=${mainData.title}`);
            toast.success("Feedback sent successfully.");
            localStorage.setItem("feedbackSubmitted", "true");
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error:", error);
            toast.error("An unexpected error occurred.");
        }
    };

    if (isSubmitted) {
        return (
            <div className="relative min-h-screen flex items-center justify-center">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('images/feedback/feedback-bg.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: 0.2, // Adjust opacity here
                    }}
                ></div>
                <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h1>
                    <p className="text-gray-700">
                        We appreciate your feedback. Your input helps us improve our services.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            {/* Background Image with Reduced Opacity */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: "url('images/feedback/feedback-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.2, // Adjust opacity here
                }}
            ></div>

            {/* Form Content */}
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Feedback Form</h1>
                <form onSubmit={handleSubmit}>
                    {/* Emoji Rating */}
                    <div className="mb-4">
                        <p className="text-gray-700 font-medium">
                            How satisfied are you with our services overall?
                        </p>
                        <div className="flex justify-around mt-2">
                            <button
                                type="button"
                                onClick={() => handleEmojiClick("😡")}
                                className={`text-3xl ${formData.emojiRating === "😡" ? "opacity-100" : "opacity-50"
                                    }`}
                            >
                                😡
                            </button>
                            <button
                                type="button"
                                onClick={() => handleEmojiClick("😞")}
                                className={`text-3xl ${formData.emojiRating === "😞" ? "opacity-100" : "opacity-50"
                                    }`}
                            >
                                😞
                            </button>
                            <button
                                type="button"
                                onClick={() => handleEmojiClick("😐")}
                                className={`text-3xl ${formData.emojiRating === "😐" ? "opacity-100" : "opacity-50"
                                    }`}
                            >
                                😐
                            </button>
                            <button
                                type="button"
                                onClick={() => handleEmojiClick("😊")}
                                className={`text-3xl ${formData.emojiRating === "😊" ? "opacity-100" : "opacity-50"
                                    }`}
                            >
                                😊
                            </button>
                            <button
                                type="button"
                                onClick={() => handleEmojiClick("😍")}
                                className={`text-3xl ${formData.emojiRating === "😍" ? "opacity-100" : "opacity-50"
                                    }`}
                            >
                                😍
                            </button>
                        </div>
                    </div>
                    {/* Question 1 */}
                    <div className="mb-4">
                        <p className="text-gray-700 font-medium">
                            Were you satisfied with the websites design and functionality?
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="designSatisfaction"
                                    value="Yes"
                                    className="form-radio text-blue-500"
                                    onChange={handleChange}
                                />
                                <span className="ml-2 text-gray-700">Yes</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="designSatisfaction"
                                    value="No"
                                    className="form-radio text-blue-500"
                                    onChange={handleChange}
                                />
                                <span className="ml-2 text-gray-700">No</span>
                            </label>
                        </div>
                    </div>
                    {/* Question 2 */}
                    <div className="mb-4">
                        <p className="text-gray-700 font-medium">
                            Was the website delivered on time?
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="onTimeDelivery"
                                    value="Yes"
                                    className="form-radio text-blue-500"
                                    onChange={handleChange}
                                />
                                <span className="ml-2 text-gray-700">Yes</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="onTimeDelivery"
                                    value="No"
                                    className="form-radio text-blue-500"
                                    onChange={handleChange}
                                />
                                <span className="ml-2 text-gray-700">No</span>
                            </label>
                        </div>
                    </div>
                    {/* Question 2 */}
                    <div className="mb-4">
                        <p className="text-gray-700 font-medium">
                            Were you satisfied with the coordination and communication during the process?
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="coordinationSatisfaction"
                                    value="Yes"
                                    className="form-radio text-blue-500"
                                    onChange={handleChange}
                                />
                                <span className="ml-2 text-gray-700">Yes</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="coordinationSatisfaction"
                                    value="No"
                                    className="form-radio text-blue-500"
                                    onChange={handleChange}
                                />
                                <span className="ml-2 text-gray-700">No</span>
                            </label>
                        </div>
                    </div>
                    {/* Additional Feedback */}
                    <div className="mb-4">
                        <label
                            htmlFor="additionalFeedback"
                            className="text-gray-700 font-medium block mb-2"
                        >
                            We would love to listen to anything about our services
                        </label>
                        <textarea
                            id="additionalFeedback"
                            name="additionalFeedback"
                            rows="4"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your feedback..."
                            value={formData.additionalFeedback}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    {/* Submit Button */}
                    <div className="text-right">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
                        >
                            Submit Feedback
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackForm;
