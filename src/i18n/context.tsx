import * as i18n from '@solid-primitives/i18n';
import { createSignal, createContext, useContext, type JSX } from 'solid-js';
import { isServer } from 'solid-js/web';
import { getRequestEvent } from 'solid-js/web';
import { dictionaries, locales, type Locale, type Dictionary } from './config';

export function getLocale(): Locale {
  let detected: string | undefined | null;

  if (isServer) {
    const event = getRequestEvent();
    if (event) {
      // 1. Check Cookie header
      const cookieHeader = event.request.headers.get('cookie');
      if (cookieHeader) {
        const cookies = cookieHeader.split(';').reduce(
          (acc, cookie) => {
            const [name, value] = cookie.trim().split('=');
            acc[name] = value;
            return acc;
          },
          {} as Record<string, string>
        );
        detected = cookies['locale'];
      }

      // 2. Check Accept-Language header
      if (!detected) {
        const acceptLanguage = event.request.headers.get('accept-language');
        if (acceptLanguage) {
          detected = acceptLanguage.split(',')[0].split('-')[0];
        }
      }
    }
  } else {
    // 1. Check Cookie
    const cookies = document.cookie.split(';').reduce(
      (acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = value;
        return acc;
      },
      {} as Record<string, string>
    );
    detected = cookies['locale'];

    // 2. Check Navigator
    if (!detected && navigator.language) {
      detected = navigator.language.split('-')[0];
    }
  }

  // Validate
  if (detected && (locales as readonly string[]).includes(detected)) {
    return detected as Locale;
  }

  return 'en';
}

export type I18nContextInterface = {
  locale: () => Locale;
  setLocale: (l: Locale) => void;
  t: i18n.Translator<i18n.Flatten<Dictionary>>;
};

export const I18nContext = createContext<I18nContextInterface>();

export function I18nProvider(props: { children: JSX.Element }) {
  const initialLocale = getLocale();
  const [locale, setLocale] = createSignal<Locale>(initialLocale);

  const dict = () => i18n.flatten(dictionaries[locale()]);
  const t = i18n.translator(dict);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {props.children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n: cannot find a I18nContext');
  }
  return context;
}
