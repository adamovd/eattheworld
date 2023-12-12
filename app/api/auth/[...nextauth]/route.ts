import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth/next";
import { CookiesOptions, NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const cookies: Partial<CookiesOptions> = {
  sessionToken: {
    name: `next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: "none",
      path: "/",
      domain: process.env.NEXT_PUBLIC_DOMAIN,
      secure: true,
    },
  },
  callbackUrl: {
    name: `next-auth.callback-url`,
    options: {},
  },
  csrfToken: {
    name: "next-auth.csrf-token",
    options: {},
  },
};

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
        const user = prisma.user.findUnique({
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
          await user.then((user) => {
            return user?.hashedPassword as string;
          })
        );
        if (!matchingPasswords) {
          console.log("Wrong Password");

          return null;
        }
        return user;
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,

  pages: {
    signIn: "(auth)/sign-in",
  },

  callbacks: {
    session: ({ session, token }): Session => {
      console.log("Session callback", { session, token });
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
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log("JWT callback", { token, user });
      if (user) {
        const u = user as unknown as User;
        return {
          ...token,
          id: u.id,
          firstname: u.firstname,
          lastname: u.lastname,
          image: u.image,
          role: u.role,
        };
      }
      return token;
    },
  },
  cookies: cookies,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
