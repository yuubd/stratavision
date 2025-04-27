export const paths = {
	home: "/",
	contact: "/contact",
	pricing: "/pricing",
	auth: {
		auth0: {
			callback: "/auth/auth0/callback",
			signIn: "/auth/auth0/sign-in",
			signUp: "/auth/auth0/sign-up",
			signOut: "/auth/auth0/sign-out",
			profile: "/auth/auth0/profile",
		},
	},
	dashboard: {
		overview: "/dashboard",
		aiSummarize: "/dashboard/ai-summarize",
		files: "/dashboard/files",
	},
	notAuthorized: "/errors/not-authorized",
	notFound: "/errors/not-found",
	internalServerError: "/errors/internal-server-error",
} as const;
