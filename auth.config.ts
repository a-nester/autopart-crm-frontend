import { NextAuthConfig, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export const authConfig: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    callbackUrl: {
      name: process.env.NODE_ENV === "production"
        ? "__Secure-authjs.callback-url"
        : "authjs.callback-url",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token) {
        session.user.role = (token.role as string) || '';
      }
      return session;
    },
    async authorized({ auth }) {
      return !!auth?.user;
    },
  },
  providers: [], // TODO: OAuth провайдери
};
