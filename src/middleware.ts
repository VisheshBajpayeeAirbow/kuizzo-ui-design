import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // console.log("PATHNAME", request.nextUrl.pathname);
    console.log(request.nextauth.token);

    const { pathname } = request.nextUrl;
    const role = request.nextauth.token?.role;
    console.log("ROLE: ", role);
    // Define access control based on user roles and route prefixes
    const roleAccessMap = {
      institution: "/institution-dashboard",
      instructor: "/instructor-dashboard",
      student: "/student-dashboard",
    };

    // Iterate over the roleAccessMap to handle role-based access
    for (const [roleKey, pathPrefix] of Object.entries(roleAccessMap)) {
      if (pathname.startsWith(pathPrefix) && role !== roleKey) {
        return NextResponse.redirect(new URL("/access-denied", request.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/institution-dashboard/:path*",
    "/instructor-dashboard/:path*",
    "/student-dashboard/:path*",
  ],
};
