import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string; // Додаємо поле role
    } & DefaultSession['user'];
    accessToken: string; // Додаємо токен доступу
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string; // Додаємо поле role
    token: string;
  }
}
