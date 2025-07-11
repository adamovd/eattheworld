import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth/next";
import { CookiesOptions, NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          console.log("No user");
          return null;
        }

        const matchingPasswords = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!matchingPasswords) {
          console.log("Wrong Password");
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          image: user.image,
          role: user.role,
          countryIDs: user.countryIDs,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          nationality: user.nationality,
          password: user.hashedPassword,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/sign-in",
    signOut: "/",
  },

  callbacks: {
    session: ({ session, token }): Session => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          createdAt: token.createdAt as Date,
          updatedAt: token.updatedAt as Date,
          firstname: token.firstname as string,
          lastname: token.lastname as string,
          email: token.email as string,
          password: token.password as string,
          nationality: token.nationality as string,
          image: token.image as string,
          role: token.role as string,
          countryIDs: token.countryIDs as [],
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as User;
        return {
          ...token,
          id: u.id,
          firstname: u.firstname,
          lastname: u.lastname,
          image: u.image,
          role: u.role,
          countryIDs: u.countryIDs,
        };
      }
      return token;
    },
  },

  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
