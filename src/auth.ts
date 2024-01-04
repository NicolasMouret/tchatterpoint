import { db } from '@/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
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
              latitude: res.latitude,
              longitude: res.longitude,
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
    async jwt({ token, user, account, session, trigger }: any) {

      // WHEN USER UPDATE HIS LOCATION WE UPDATE THE JWT 
      // session.update([newValues]) => trigger jwt update => update token => update session
      if (trigger === 'update' && session?.latitude && session?.longitude) {
        token.latitude = session.latitude
        token.longitude = session.longitude      
      }

      // WHEN USER SIGN IN WITH GOOGLE OR GITHUB 
      if (account?.provider === 'google' || account?.provider === 'github') {
        return {
          ...token,
          id: user.id,
          role: user.role,
          latitude: user.latitude,
          longitude: user.longitude,
        }
      }

      // WHEN USER SIGN IN WITH EMAIL AND PASSWORD
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          latitude: user.latitude,
          longitude: user.longitude,
        }
      }
      
      return token;
    },
    async session({ session, token }: any) {

      // SET THE SESSION FROM THE JWT
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          image: token.picture,
          role: token.role,
          latitude: token.latitude,
          longitude: token.longitude,
        }
      }
    },
  },
});