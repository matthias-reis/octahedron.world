import { createAsync, useLocation } from '@solidjs/router';
import { useI18n } from '~/i18n/context';
import { getRoute } from '~/model/model';

export function LanguageSwitcher() {
  const { locale } = useI18n();
  const location = useLocation();

  const slug = () => {
    const s = location.pathname.split('/')[1];
    return s || '';
  };

  const routeData = createAsync(() => getRoute(slug()));

  const toggle = () => {
    const current = locale();
    const next = current === 'en' ? 'de' : 'en';

    // 1. Set Cookie
    document.cookie = `locale=${next}; path=/; max-age=31536000`; // 1 year

    // 2. Find target slug
    const data = routeData();
    let targetPath = location.pathname;

    if (data && data.ref && data.language !== next) {
      // If the current page has a cross-reference, use it
      targetPath = `/${data.ref}`;
    }

    // 3. Reload to apply language change on server and client
    window.location.href = targetPath;
  };

  return (
    <button
      onClick={toggle}
      class="px-3 py-1 rounded bg-neutral-200 hover:bg-neutral-300 text-sm font-medium transition-colors"
    >
      {locale() === 'en' ? 'DE' : 'EN'}
    </button>
  );
}
