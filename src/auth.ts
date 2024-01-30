import { db } from '@/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET');
}

export const {
  handlers: { GET, POST},
  auth,
  signOut,
  signIn,
} = NextAuth({
  adapter: PrismaAdapter(db),
  trustHost: true,
  pages: {
    signIn: "/sign-in",
  },
  providers: [
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
        // return the 
        return {
          id: profile.sub,
          role: userRole,
          name: profile.name,
          email: profile.email,
          image: user?.image,
        }
      }
    }),
    CredentialsProvider({
      name: 'email et mot de passe',
      credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Mot de passe", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await db.user.findUnique({
          where: { email: credentials!.email as string,
           },
        });
        if (res && res.pwHash) {
          const passwordValid = await compare(credentials!.password as string, res.pwHash);
          if (passwordValid) {
            return {
              id: res.id,
              name: res.name,
              email: res.email,
              image: res.image,
              role: res.role,
              latitude: res.latitude,
              longitude: res.longitude,
            }
          } 
        }
        if (!res) {
          throw new Error(`L'adresse mail ou le mot de passe est incorrect`);
        }
        return null;
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
      if (trigger === 'update' && session.image) {
        token.image = session.image
      }

      if (account?.provider === 'google' || user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          image: user.image,
          latitude: user.latitude,
          longitude: user.longitude,
        }
      }
      
      return token;
    },
    async session({ session, token, user }: any) {
      const unreads = await db.userUnreadMessages.findMany({
        where: {
          userId: token.id,
        },
        select: {
          chatId: true,
          count: true,
        }
      })

      // SET THE SESSION FROM THE JWT
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          image: token.image,
          role: token.role,
          latitude: token.latitude,
          longitude: token.longitude,
        }
      }
    },
  },
});