import { enUS } from "@fyi-newsletter/shared";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
	lng: "en-US",
	fallbackLng: "en-US",
	interpolation: { escapeValue: false },
	resources: {
		"en-US": {
			translation: enUS
		}
	}
});

export default i18n;
