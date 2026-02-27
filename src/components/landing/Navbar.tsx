import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-border/40 shadow-sm"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex items-center justify-between h-18 px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" aria-label="RexPet home">
          <span className="font-serif text-2xl font-semibold tracking-tight text-gradient-gold">RexPet</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <a href="#gallery" className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors duration-300">{t("nav.gallery")}</a>
          <a href="#pricing" className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors duration-300">{t("nav.pricing")}</a>
          <a href="#faq" className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors duration-300">{t("nav.faq")}</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <Button variant="ghost" asChild className="text-[13px] tracking-wide">
            <Link to="/login">{t("nav.signIn")}</Link>
          </Button>
          <Button asChild className="rounded-full px-7 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-secondary hover:opacity-90 transition-opacity font-semibold text-[13px] tracking-wide border-0">
            <Link to="/signup">{t("nav.getStarted")}</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-border/40 px-6 py-6 space-y-1 animate-fade-in">
          <a href="#gallery" className="block text-sm font-medium text-muted-foreground py-3 tracking-wide uppercase" onClick={() => setMobileOpen(false)}>{t("nav.gallery")}</a>
          <a href="#pricing" className="block text-sm font-medium text-muted-foreground py-3 tracking-wide uppercase" onClick={() => setMobileOpen(false)}>{t("nav.pricing")}</a>
          <a href="#faq" className="block text-sm font-medium text-muted-foreground py-3 tracking-wide uppercase" onClick={() => setMobileOpen(false)}>{t("nav.faq")}</a>
          <div className="flex items-center justify-between pt-4 pb-2">
            <LanguageSwitcher />
          </div>
          <div className="flex flex-col gap-3 pt-3">
            <Button variant="outline" asChild className="w-full rounded-full">
              <Link to="/login">{t("nav.signIn")}</Link>
            </Button>
            <Button asChild className="w-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light text-secondary border-0">
              <Link to="/signup">{t("nav.getStarted")}</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
