import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session }) {
            // const user = await prisma.user.findUnique({
            //     where: { email: session.user?.email || "" },
            // });
            // if (user) {
            //     session.user = {
            //         ...user,
            //     };
            // }
            return session;
        },
        async jwt({ token, session }) {
            if (session) {
                token.user = session.user
            }
            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};