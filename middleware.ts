import { NextRequest, NextResponse } from "next/server";

const isProtectedRoute = (pathname: string) => {
  return pathname.startsWith("/api/v1/protected");
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isProtectedRoute(pathname)) {
    const token = req.headers.get("x-auth-token");

    if (token !== process.env.ADMIN_LOGIN_TOKEN)
      return NextResponse.redirect(
        new URL("/api/v1/auth/unauthorized", req.url)
      );

    return NextResponse.next();

    // TODO X-Auth-Token validation
    // https://blog.tericcabrel.com/protect-your-api-routes-in-next-js-with-middleware/
    // https://github.com/tericcabrel/blog-tutorials/blob/main/next-api-middleware/middleware.ts
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/v1/protected/:path*"],
};
