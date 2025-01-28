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

        //Check entered data format
        const parsedCredentials = schema.safeParse(credentials);
        if (!parsedCredentials) {
          console.error(
            'Invalid credentials format:',
            parsedCredentials.error.errors,
          );
          return null;
        }

        const { email, password } = parsedCredentials.data;

        try {
          const user = await userLoginOperation(email, password);

          if (!user || !user.token) {
            throw new Error('Invalid credentials');
          }

          return {
            id: user.email,
            name: user.name,
            email: user.email,
            role: user.role,
            token: user.token,
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
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role; // Зберігаємо роль користувача
        token.accessToken = user.token; // Зберігаємо токен доступу
      }
      return token;
    },
    async session({ session, token }) {
    session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role, // Додаємо роль до сесії
    };
    session.accessToken = token.accessToken;
    return session;
  },
  },
});

// export default NextAuth(authOptions);