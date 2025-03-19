import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const response = NextResponse.next();

	if (request.nextUrl.pathname.match(/\.(js|css)$/)) {
		response.headers.set(
			"Cache-Control",
			"public, max-age=604800, stale-while-revalidate=86400",
		);
	} else if (request.nextUrl.pathname.match(/\.(jpg|jpeg|gif|png|ico|svg|woff|woff2|ttf|eot)$/)) {
		response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
	}

	return response;
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
