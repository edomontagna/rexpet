import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero noise-overlay">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/3 left-1/5 w-[500px] h-[500px] rounded-full bg-gold/[0.04] blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/5 w-[600px] h-[600px] rounded-full bg-gold/[0.03] blur-[150px] animate-float" style={{ animationDelay: "3.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/[0.02] blur-[200px] animate-glow-pulse" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 w-px h-32 bg-gradient-to-t from-transparent via-gold/20 to-transparent" />

      <div className="container relative z-10 px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-gold/20 bg-gold/[0.06] mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-glow-pulse" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-gold-light">{t("hero.badge")}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            className="font-serif text-display font-light text-white mb-8 text-balance"
          >
            {t("hero.title").split(",").map((part, i) =>
              i === 0 ? (
                <span key={i}>{part},<br className="hidden sm:block" /></span>
              ) : (
                <span key={i} className="text-gradient-gold font-medium italic">{part}</span>
              )
            )}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-14 font-light leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Button
              size="lg"
              asChild
              className="rounded-full px-10 h-14 text-base shadow-glow-gold group bg-gradient-to-r from-gold-dark via-gold to-gold-light text-secondary hover:opacity-90 transition-all duration-300 font-semibold tracking-wide border-0"
            >
              <Link to="/generate">
                {t("hero.cta")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              asChild
              className="rounded-full px-10 h-14 text-base text-white/70 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 tracking-wide"
            >
              <a href="#gallery">{t("hero.viewGallery")}</a>
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-white/40 animate-float" style={{ animationDuration: "2s" }} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
