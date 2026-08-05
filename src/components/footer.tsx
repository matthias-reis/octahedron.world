import { useI18n } from "~/i18n/context";
import { type FooterLink, Footer as SharedFooter } from "~/ui/footer";
import { LanguageSwitcher } from "./language-switcher";

/** Octahedron's footer: the shared component plus this site's links and chrome. */
export const Footer = () => {
  const { t } = useI18n();

  const links = (): FooterLink[] => [
    { href: t("footer.about_href"), label: t("footer.about") },
    { href: t("footer.privacy_href"), label: t("footer.privacy") },
    { href: t("footer.imprint_href"), label: t("footer.imprint") },
  ];

  return (
    <SharedFooter
      class="bg-can9 text-can4 text-center py-4 mt-8"
      linkClass="underline hover:font-bold"
      links={links()}
      copyright={
        <>
          &copy; 2022 - {new Date().getFullYear()} Octahedron World / Matthias
          Reis. {t("footer.copyright")}
        </>
      }
    >
      <LanguageSwitcher />
    </SharedFooter>
  );
};
