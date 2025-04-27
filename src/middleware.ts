import { NextResponse, type NextMiddleware } from "next/server";
import { appConfig } from "@/config/app";
import { AuthStrategy } from "@/lib/auth-strategy";
import { middleware as auth0Middleware } from "@/lib/auth0/middleware";


let middleware: NextMiddleware = async (req) => {
	return NextResponse.next({ request: req });
};

if (appConfig.authStrategy === AuthStrategy.AUTH0) {
	middleware = auth0Middleware;
}
export { middleware };

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		"/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
