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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: {
          label: "Password",
          placeholder: "password",
          type: "password",
        },
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
          id: user.id + "", //making it a string type kek
          email: user.email,
          name: user.name,
          randomKey: "monkey",
        };
      },
    }),
  ],
  // use callbacks to take info from the jwt to put into session
  // if not, session will only have name, email and image
  callbacks: {
    //handle session that's passed around
    session: ({ session, token }) => {
      console.log("Session callback: ", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    //creation and management of jwt
    // jwt return NO USER(?) user - only the first time user logs in
    jwt: ({ token, user }) => {
      console.log("JWT callback: ", { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: user.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};
// THE FLOW: JWT callback first, user: defined then session
//if we want to pass info, authorised > JWT > session

// any GET or POST request will be handled by nextauth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
