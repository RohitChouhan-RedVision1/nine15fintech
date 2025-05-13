"use client"
import React, { useState } from "react";
import axios from "axios";

export default function Signin() {
    const [error, setError] = useState("");
    const [mobileno, setMobileNo] = useState("");
    const [otp, setOtp] = useState("");
    const [otpField, setOtpField] = useState(false);
    const [provider, setProvider] = useState({
        userName: "",
        type: "CLIENT",
        source: "link",
    });
    const otpData = {
        'OtpMobileNo': mobileno,
        'mobileOtp': otp
    }
    // 448310
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (otpField) {
                const response = await axios.post('/api/submit-forget-password-otp', otpData);
                if (response.data.msgType === 'success') {
                    setOtpField(true);
                    setError(response.data.msg);
                }
                else {
                    setError(`${response.data.msg}`);
                }
            }
            else {
                const response = await axios.post('/api/forget-password', provider);
                if (response.data.msgType === 'success') {
                    setOtpField(true);
                    setError(`One Time Password (OTP) has been sent to your mobile ******${response.data.mobileLastFourDigit} And e-mail to ${response.data.email}, please enter the same here to login`);
                    setMobileNo(response.data.encryptedMobileNo)
                }
                else {
                    setError(`${response.data.msg}`);
                }
            }

        } catch (error) {
            console.error("Error submitting the form:", error);
            setError("An error occurred while submitting the form. Please try again.");
        }
    };

    return (
        <>
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div className="mt-12 flex flex-col items-center">
                    <h1 className="text-2xl xl:text-3xl font-extrabold">Forget Password</h1>
                    <div className="w-full flex-1 mt-8">
                        <div className="mx-auto max-w-xs">
                            <form onSubmit={handleSubmit}>
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email"
                                    placeholder="Email"
                                    value={provider.userName}
                                    onChange={(e) =>
                                        setProvider({ ...provider, userName: e.target.value })
                                    }
                                />
                                {otpField && (
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-6"
                                        type="text"
                                        placeholder="OTP"
                                        value={provider.otp}
                                        onChange={(e) =>
                                            setOtp(e.target.value)
                                        }
                                    />
                                )}
                                <button className="mt-5 tracking-wide font-semibold primarybgcolor text-gray-100 w-full py-4 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg
                                        className="w-6 h-6 -ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy={7} r={4} />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">Submit</span>
                                </button>
                                {otpField ? (
                                    <div>
                                        {error && <div className="text-green-600 mt-2">{error}</div>}
                                    </div>
                                ) : (
                                    <div>
                                        {error && <div className="text-red-600 mt-2">{error}</div>}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="userName"
                        className="mb-2.5 block font-medium text-dark dark:text-white"
                    >
                        userName
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter your userName"
                            name="userName"
                            value={provider.userName}
                            onChange={(e) =>
                                setProvider({ ...provider, userName: e.target.value })
                            }
                            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        />
                    </div>
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="mb-2.5 block font-medium text-dark dark:text-white"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            autoComplete="password"
                            value={provider.password}
                            onChange={(e) =>
                                setProvider({ ...provider, password: e.target.value })
                            }
                            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={provider.remember}
                            onChange={(e) =>
                                setProvider({ ...provider, remember: e.target.checked })
                            }
                        />
                        <label
                            htmlFor="remember"
                            className="ml-2 text-sm font-medium text-dark dark:text-white"
                        >
                            Remember me
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="rounded-md bg-blue-600 text-white px-4 py-2"
                    >
                        Sign In
                    </button>
                </div>
            </form> */}
        </>
    );
}
