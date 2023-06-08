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
        };
      },
    }),
  ],
  // use callbacks to take info from the jwt to put into session
  // if not, session will only have name, email and image
  callbacks: {
    //handle session that's passed around
    session: async ({ session, token }) => {
      // console.log("Session callback: ", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    //creation and management of jwt
    jwt: async ({ token, user }) => {
      // console.log("JWT callback: ", { token, user });
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
  },
};
// THE FLOW: JWT callback first, user: defined then Session callback
//if want to pass info, after authorised > user info > JWT > session

// any GET or POST request will be handled by nextauth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
