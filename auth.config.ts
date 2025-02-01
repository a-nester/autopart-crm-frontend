import { NextAuthConfig } from "next-auth";

// Конфігурація для NextAuth
export const authConfig: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/error',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; // Користувач повинен бути аутентифікованим
      const isOnDashboard = nextUrl.pathname.startsWith('/');

      // Якщо користувач намагається зайти на /dashboard без авторизації
      if (isOnDashboard) {
        return isLoggedIn ? true : false; // Якщо не авторизований, редиректимемо на логін
      } else if (!isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }

      return true;
    },
  },
  providers: [], // Це порожній масив провайдерів// ToDo OAuth
};
