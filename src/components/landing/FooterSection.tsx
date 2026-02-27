import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const FooterSection = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-secondary text-secondary-foreground py-16" role="contentinfo">
      <div className="container px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          <div>
            <Link to="/" className="font-serif text-2xl font-bold text-gradient-gold">RexPet</Link>
            <p className="mt-3 text-sm text-secondary-foreground/60 max-w-xs leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="mt-4">
              <LanguageSwitcher variant="outline" />
            </div>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="font-sans text-xs font-semibold tracking-widest uppercase text-secondary-foreground/40 mb-4">{t("footer.product")}</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#gallery" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">{t("nav.gallery")}</a></li>
                <li><a href="#pricing" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">{t("nav.pricing")}</a></li>
                <li><a href="#faq" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">{t("nav.faq")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-xs font-semibold tracking-widest uppercase text-secondary-foreground/40 mb-4">{t("footer.account")}</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/login" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">{t("nav.signIn")}</Link></li>
                <li><Link to="/signup" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">{t("auth.signUp")}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-xs font-semibold tracking-widest uppercase text-secondary-foreground/40 mb-4">{t("footer.legal")}</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/privacy" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">{t("footer.privacy")}</Link></li>
                <li><Link to="/terms" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">{t("footer.terms")}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-secondary-foreground/40">&copy; {new Date().getFullYear()} RexPet. All rights reserved.</p>
          <p className="text-xs text-secondary-foreground/40">{t("footer.madeWith")}</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
