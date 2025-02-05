// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req: NextRequest) {
  // const auth = NextAuth(authConfig).auth(req);
  console.log("HEADERS:", req.headers);
console.log("COOKIES:", req.cookies);

  const token = await getToken({ req, secret: 'wVOQjLdrpG1TWCHhDzv3o',
   });
  console.log("MIDDLEWARE TOKEN", token); // Перевіримо, чи є токен
  if (!token) {
    console.log("No token found, redirecting...");
  }

  const userRole = token?.role;
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  // console.log("TOKEN", token);
  
    // Якщо користувач намагається зайти в /admin без прав, редиректимо на головну
    if (isAdminRoute && (!token || (userRole !== 'admin' && userRole !== 'manager'))) {
      return NextResponse.redirect(new URL('/', req.url));
    }

  // return auth;
  return NextResponse.next(); // Пропускаємо далі
}

// Де застосовувати middleware
export const config = {
  matcher: ['/admin/:path*'], // Виконується тільки для адмінки
};
