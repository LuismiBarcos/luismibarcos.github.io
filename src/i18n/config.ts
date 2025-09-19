import type { I18nStrings } from "./types";
import ENLocale from "./locales/en";
import ESLocale from "./locales/es";

export type LocaleProfile = {
  name: string;
  messages: I18nStrings;
  langTag: string;
  direction: "rtl" | "ltr" | "auto";
  googleFontName: string;
  default?: boolean;
};

export type LocaleKey = keyof typeof localeToProfile;

export const localeToProfile = {
  // locale key must be in lowercase
  en: {
    name: "English", // Name presented in language picker
    messages: ENLocale, // Locale translations
    langTag: "en-US", // Extremly important used in localizing dates, numbers and sitemap,  only English alphabet and hyphen allowed
    direction: "ltr", // UI layout direction
    googleFontName: "IBM+Plex+Mono", // For OG image generation, font must support 400 and 700 weights, write name as it should goes in a URL, words separated with '+' instead of spaces
    default: true,
  },
  es: {
    name: "Español",
    messages: ESLocale,
    langTag: "es-ES",
    direction: "ltr",
    googleFontName: "IBM+Plex+Mono",
    default: false,
  },
} satisfies Record<string, LocaleProfile>;

export const SUPPORTED_LOCALES = Object.keys(localeToProfile) as LocaleKey[];

export const DEFAULT_LOCALE =
  SUPPORTED_LOCALES.find(
    key => (localeToProfile[key] as LocaleProfile)?.default === true
  ) ?? SUPPORTED_LOCALES[0];

export const LOCALES_TO_LANG = Object.fromEntries(
  // For Sitemap
  Object.entries(localeToProfile).map(([locale, profile]) => [
    locale,
    profile.langTag,
  ])
) as Record<keyof typeof localeToProfile, string>;
