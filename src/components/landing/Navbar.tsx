import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2" aria-label="RexPet home">
          <span className="font-serif text-2xl font-bold text-gradient-gold">RexPet</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#gallery" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("nav.gallery")}</a>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("nav.pricing")}</a>
          <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t("nav.faq")}</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <Button variant="ghost" asChild>
            <Link to="/login">{t("nav.signIn")}</Link>
          </Button>
          <Button asChild className="rounded-full px-6">
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
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
          <a href="#gallery" className="block text-sm font-medium text-muted-foreground py-2" onClick={() => setMobileOpen(false)}>{t("nav.gallery")}</a>
          <a href="#pricing" className="block text-sm font-medium text-muted-foreground py-2" onClick={() => setMobileOpen(false)}>{t("nav.pricing")}</a>
          <a href="#faq" className="block text-sm font-medium text-muted-foreground py-2" onClick={() => setMobileOpen(false)}>{t("nav.faq")}</a>
          <div className="flex items-center justify-between pt-2 pb-1">
            <LanguageSwitcher />
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <Button variant="outline" asChild className="w-full">
              <Link to="/login">{t("nav.signIn")}</Link>
            </Button>
            <Button asChild className="w-full rounded-full">
              <Link to="/signup">{t("nav.getStarted")}</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
