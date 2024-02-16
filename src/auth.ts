import { db } from '@/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing google client credentials');
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
    signIn: "/sign-in", // Set URL for Sign in page
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
        }
        return {
          id: profile.sub,
          role: userRole,
          name: profile.name,
          email: profile.email,
          image: user?.image || "/default-avatar.webp",
        }
      }
    }),
    CredentialsProvider({
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

    // JWT CALLBACK IS CALLED WHEN - SIGNIN | UPDATE TRIGGER | SESSION IS ACCESSED 
    async jwt({ token, user, account, session, trigger }: any) {     

      // WHEN USER UPDATE AN INFO WE UPDATE THE JWT 
      // session.update([newValues]) => trigger jwt update => update token => update session

      // LOCATION 
      if (trigger === 'update' && session?.latitude && session?.longitude) {
        token.latitude = session.latitude
        token.longitude = session.longitude      
      }
      // NAME AND BIOGRAPHY
      if (trigger === 'update' && session.name && session.biography) {
        token.name = session.name
        token.biography = session.biography
      }
      
      // THIS IS EXECUTED AT SIGNIN TO ADD DATA TO THE TOKEN
      // AFTER THAT IT WILL DIRECTLY RETURN THE TOKEN
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
    
    // SESSION CALLBACK IS CALLED WHEN SESSION IS CHECKED
    // JWT CALLBACK IS CALLED BEFORE EVERY SESSION CALL
    async session({ session, token }: any) {
      
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