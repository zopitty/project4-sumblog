import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
// similar to getSession, but more suited for database
export const authOptions: NextAuthOptions = {
  // configs below
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // CredentialsProvider({
    //   name: "as Guest",
    //   credentials: {},
    //   async authorize(credentials) {
    //     const user = {
    //       id: Math.random().toString(),
    //       name: "Guest",
    //       email: "guest@examples.com",
    //     };
    //     return user;
    //   },
    // }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          //lets authjs know it's wrong
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          return null;
        }
        const passwordValid = await compare(
          credentials.password,
          //temp fix
          user.password!
        );
        if (!passwordValid) {
          return null;
        }
        return {
          id: user.id + "",
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
};

// any GET or POST request will be handled by nextauth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
