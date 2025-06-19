import * as React from "react";
import type { Metadata, Viewport } from "next";
import { Auth0Provider } from "@auth0/nextjs-auth0";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

import "@/styles/global.css";

import { appConfig } from "@/config/app";
import { getSettings as getPersistedSettings } from "@/lib/settings";
import { Analytics } from "@/components/core/analytics";
import { EmotionCacheProvider } from "@/components/core/emotion-cache";
import { I18nProvider } from "@/components/core/i18n-provider";
import { AuthStrategy } from "@/lib/auth-strategy";
import { LocalizationProvider } from "@/components/core/localization-provider";

import { SettingsProvider } from "@/components/core/settings/settings-context";
import { ThemeProvider } from "@/components/core/theme-provider";
import { Toaster } from "@/components/core/toaster";

export const metadata = { title: appConfig.name } satisfies Metadata;

export const viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: appConfig.themeColor,
} satisfies Viewport;

let AuthProvider: React.FC<React.PropsWithChildren> = React.Fragment;

if (appConfig.authStrategy === AuthStrategy.AUTH0) {
	AuthProvider = Auth0Provider as React.FC<React.PropsWithChildren>;
} else {
	AuthProvider = Auth0Provider as React.FC<React.PropsWithChildren>;
}

interface LayoutProps {
	children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps): Promise<React.JSX.Element> {
	const settings = await getPersistedSettings();
	const language = settings.language ?? appConfig.language;

	return (
		<html lang={language} suppressHydrationWarning>
			<body>
				<InitColorSchemeScript attribute="class" />
				<AuthProvider>
					<Analytics>
						<LocalizationProvider>
							<SettingsProvider settings={settings}>
								<I18nProvider lng={language}>
									<EmotionCacheProvider options={{ key: "mui" }}>
										<ThemeProvider>
											{children}
											<Toaster position="bottom-right" />
										</ThemeProvider>
									</EmotionCacheProvider>
								</I18nProvider>
							</SettingsProvider>
						</LocalizationProvider>
					</Analytics>
				</AuthProvider>
			</body>
		</html>
	);
}
