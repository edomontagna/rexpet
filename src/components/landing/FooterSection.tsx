import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const FooterSection = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-hero noise-overlay text-white relative" role="contentinfo">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container px-6 lg:px-8 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="font-serif text-3xl font-light text-gradient-gold inline-block mb-4">RexPet</Link>
            <p className="text-sm text-white/30 leading-relaxed font-light">
              {t("footer.description")}
            </p>
            <div className="mt-6">
              <LanguageSwitcher variant="outline" />
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-20">
            <div>
              <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/30 mb-5">{t("footer.product")}</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#gallery" className="text-white/50 hover:text-gold transition-colors duration-300 font-light">{t("nav.gallery")}</a></li>
                <li><a href="#pricing" className="text-white/50 hover:text-gold transition-colors duration-300 font-light">{t("nav.pricing")}</a></li>
                <li><a href="#faq" className="text-white/50 hover:text-gold transition-colors duration-300 font-light">{t("nav.faq")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/30 mb-5">{t("footer.account")}</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/login" className="text-white/50 hover:text-gold transition-colors duration-300 font-light">{t("nav.signIn")}</Link></li>
                <li><Link to="/signup" className="text-white/50 hover:text-gold transition-colors duration-300 font-light">{t("auth.signUp")}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/30 mb-5">{t("footer.legal")}</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/privacy" className="text-white/50 hover:text-gold transition-colors duration-300 font-light">{t("footer.privacy")}</Link></li>
                <li><Link to="/terms" className="text-white/50 hover:text-gold transition-colors duration-300 font-light">{t("footer.terms")}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">&copy; {new Date().getFullYear()} RexPet. All rights reserved.</p>
          <p className="text-xs text-white/20 font-light">{t("footer.madeWith")}</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
