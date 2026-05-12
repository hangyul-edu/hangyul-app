import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

import ko from "./locales/ko.json";
import en from "./locales/en.json";

export const SUPPORTED_LANGUAGES = ["ko", "en"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_STORAGE_KEY = "@hangyul/language";

/** AsyncStorage에서 저장된 언어를 불러오고, 없으면 기기 언어 → 기본값 ko */
export async function getInitialLanguage(): Promise<SupportedLanguage> {
  try {
    const saved = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved && SUPPORTED_LANGUAGES.includes(saved as SupportedLanguage)) {
      return saved as SupportedLanguage;
    }
    const deviceLang = Localization.getLocales()[0]?.languageCode ?? "ko";
    return SUPPORTED_LANGUAGES.includes(deviceLang as SupportedLanguage)
      ? (deviceLang as SupportedLanguage)
      : "ko";
  } catch {
    return "ko";
  }
}

/** 언어 변경 + AsyncStorage 저장 */
export async function changeLanguage(lang: SupportedLanguage) {
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  await i18n.changeLanguage(lang);
}

export async function initI18n() {
  const lng = await getInitialLanguage();

  await i18n.use(initReactI18next).init({
    lng,
    fallbackLng: "ko",
    resources: {
      ko: { translation: ko },
      en: { translation: en },
    },
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
