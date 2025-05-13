"use client"
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Signin() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [selectedRole, setSelectedRole] = useState("Client");
    const [provider, setProvider] = useState({
        username: "admin",
        password: "admin",
        remember: false,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await signIn("credentials", {
            username: provider.username,
            password: provider.password,
            redirect: false,
        });
        if (res?.error) {
            // Handle login error
            setError("Invalid username or password");
        } else if (res?.ok) {
            // Redirect to dashboard or other page on successful login
            router.push("/");
        }
    };

    const roles = ["Client", "Employee", "Admin", "Advisors", "Branch"];
    return (
        <>
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div className="flex gap-3">
                    {roles.map((role) => (
                        <button
                            key={role}
                            className={`mt-5 tracking-wide font-semibold w-full py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${selectedRole !== role
                                ? "border border-primarybgcolor text-gray-800"
                                : "primarybgcolor text-gray-100 hover:bg-gray-700"
                                }`}
                            onClick={() => setSelectedRole(role)}
                        >
                            <span className="text-sm">{role}</span>
                        </button>
                    ))}
                </div>
                <div className="mt-12 flex flex-col items-center">
                    <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
                    <div className="w-full flex-1 mt-8">
                        <div className="mx-auto max-w-xs">
                            <form onSubmit={handleSubmit}>
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email"
                                    placeholder="Email"
                                    value={provider.username}
                                    onChange={(e) =>
                                        setProvider({ ...provider, username: e.target.value })
                                    }
                                />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password"
                                    placeholder="Password"
                                    value={provider.password}
                                    onChange={(e) =>
                                        setProvider({ ...provider, password: e.target.value })
                                    }
                                />
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
                                    <span className="ml-3">Sign In</span>
                                </button>
                                {error && <div className="text-red-600 mt-2">{error}</div>}
                                <p className="mt-6 text-sm text-gray-600 text-right">
                                    <Link href="/forget-password" className="border-b border-gray-500 border-dotted">
                                        Forget Password?
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="mb-2.5 block font-medium text-dark dark:text-white"
                    >
                        Username
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter your username"
                            name="username"
                            value={provider.username}
                            onChange={(e) =>
                                setProvider({ ...provider, username: e.target.value })
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
