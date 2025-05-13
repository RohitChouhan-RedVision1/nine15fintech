import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Enter username",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Validate credentials with your database here
                const res = await axios.get("http://localhost:3000/api/admin/user");
                const user = res?.data[0]
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                const isAuthorized = user?.username === credentials?.username && isPasswordValid

                if (isAuthorized) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    pages: {
        signIn: "/signin",
        error: "/signin?error=true",
    },

};