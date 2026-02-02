import { A } from '@solidjs/router';
import { useI18n } from '~/i18n/context';
import { LanguageSwitcher } from './language-switcher';

export const Footer = () => {
  const { t } = useI18n();
  return (
    <footer class="w-full bg-neutral-100 text-neutral-500 text-center py-4 mt-8 text-sm">
      <p>
        &copy; 2022 - {new Date().getFullYear()} Octahedron World / Matthias
        Reis. {t('footer.copyright')}
      </p>
      <p class="flex justify-center gap-4 mt-2">
        <A href={t('footer.about_href')} class="underline hover:font-bold">
          {t('footer.about')}
        </A>
        <A href={t('footer.privacy_href')} class="underline hover:font-bold">
          {t('footer.privacy')}
        </A>
        <A href={t('footer.imprint_href')} class="underline hover:font-bold">
          {t('footer.imprint')}
        </A>
      </p>
      <div class="mt-4 flex justify-center">
        <LanguageSwitcher />
      </div>
    </footer>
  );
};
