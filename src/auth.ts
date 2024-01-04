import { db } from '@/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error('Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET');
}

export const {
  handlers: { GET, POST},
  auth,
  signOut,
  signIn,
} = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/signin",
  },
  providers: [
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        let userRole = 'user'
        const user = await db.user.findUnique({
          where: { email: profile?.email },
        })
        if (user) {
          userRole = user.role;
        } else if (profile.email === ADMIN_EMAIL) {
          userRole = 'admin';
        }

        return {
          id: profile.sub,
          role: userRole,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Mon mail" },
        password: {  label: "Mot de passe", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await db.user.findUnique({
          where: { email: credentials.email as string,
           },
        });

        if (res && res.pwHash) {
          const passwordValid = await compare(credentials.password as string, res.pwHash);
          if (passwordValid) {
            console.log(res);
            return {
              id: res.id,
              name: res.name,
              email: res.email,
              role: res.role,
            }
          } else {
            throw new Error('Invalid password');
          }
        } else {
          throw new Error('No user found');
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Usually not needed, here we are fixing a bug in nextauth
    async session({ session, user, token }: any) {
      if (session && user) {
        session.user.id = user.id;
      }
      session.accessToken = token.accessToken;   
      session.user.id = token.id;  
      return session;
    },
    async jwt({ token, user, account }: any) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? 
      Promise.resolve(url) 
      : Promise.resolve(baseUrl);
    }
  },
});