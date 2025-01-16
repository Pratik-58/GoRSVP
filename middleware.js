import { NextResponse } from "next/server";

export function middleware(request) {
  // token exists only when session is created and user is signed in .

  const token = request.cookies.get("next-auth.session-token");
  //paths where signin required
  const protectedPaths = ["/createevent","/editevent","/organizer-dashboard","/admin-dashboard","/my-rsvps","/my-events","/profile","/rsvps","/admin-events","/admin-organizers","/admin-users"];
  const SigninPath = ["/signin"];

  // Check if the request path is one of the protected paths
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path));

  const isSigninPath = SigninPath.some((path) =>
    request.nextUrl.pathname.startsWith(path));

  // Redirect to sign-in page if the user is not authenticated
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  //won't let you go to signin page if you are already signed in
  if (token && isSigninPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
//with session you can't go here
export const config = {
  matcher: ["/signin/:path*", "/createevent", "/editevent/:path*","/organizer-dashboard","/admin-dashboard","/my-rsvps","/my-events","/profile","/rsvps","/admin-events","/admin-organizers","/admin-users"],
};
