import { NativeModules, Platform } from "react-native";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import tr from "./locales/tr.json";

export const languageResources = {
  en: { translation: en },
  tr: { translation: tr },
};

let locale =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;
locale = locale.substring(0, 2);

i18next.use(initReactI18next).init({
  lng: locale,
  compatibilityJSON: "v3",
  fallbackLng: "en",
  resources: languageResources,
});

export default i18next;
