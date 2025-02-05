import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import { userLoginOperation } from '@/globalState/operations';

export const {auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'example@mail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const schema = z.object({
          email: z.string().email(),
          password: z.string().min(6),
        });

        //тут перевірка введених даних
        const parsedCredentials = schema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error(
            'Invalid credentials format:',
            parsedCredentials.error.errors,
          );
          return null;
        }

        const { email, password } = parsedCredentials.data;


        try {
          
          const response = await userLoginOperation(email, password);
          const user = response.data;
          
          if (!user || !user.accessToken) {
            throw new Error('Invalid credentials');
          }

          return {
            id: user.email,
            name: user.name,
            email: user.email,
            role: user.role,
            token: user.accessToken,
          };
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        console.log("User found in JWT callback:", user);
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role; // Зберігаємо роль користувача
        token.accessToken = user.token; // Зберігаємо токен доступу
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session token:", token);
    session.user = {
        id: String(token.id),
        name: String(token.name),
        email: String(token.email),
        role: String(token.role), // Додаємо роль до сесії
        token: String(token.accessToken),
        emailVerified: null,
    };
    session.accessToken = String(token.accessToken);
    return session;
  },
  },
});
