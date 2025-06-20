import { createInstance } from "i18next";
import type { i18n } from "i18next";

import { appConfig } from "@/config/app";
import { getSettings as getPersistedSettings } from "@/lib/settings";

async function initI18next(): Promise<i18n> {
	const settings = await getPersistedSettings();
	const language = settings.language ?? appConfig.language;

	const i18nInstance = createInstance();

	await i18nInstance.init({
		debug: false,
		ns: ["common"],
		defaultNS: "common",
		fallbackNS: "common",
		lng: language,
		fallbackLng: "en",
		supportedLngs: ["en"],
		resources: {
			en: {
				common: {}
			}
		},
	});

	return i18nInstance;
}

export async function getTranslation(): Promise<{ t: i18n["t"]; i18n: i18n }> {
	const i18nextInstance = await initI18next();

	return {
		t: i18nextInstance.t,
		i18n: i18nextInstance,
	};
}
