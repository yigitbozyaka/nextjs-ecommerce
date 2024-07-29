import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = { id: '1', email: `${process.env.NEXTAUTH_EMAIL}`, password: `${process.env.NEXTAUTH_PASSWORD}` }
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],

    debug: process.env.NODE_ENV === 'development',

    session: {
        strategy: "jwt",
    },

    secret: process.env.SECRET,

    pages: {
        signIn: '/admin/login',
        error: '/auth/error',
        newUser: '/admin/login',
    },

    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },

};

export default NextAuth(authOptions)
