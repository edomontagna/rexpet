import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, Frame } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const PrintShopSection = () => {
  const { t } = useTranslation();

  const features = [
    { icon: Frame, titleKey: "printShop.quality", descKey: "printShop.qualityDesc" },
    { icon: Truck, titleKey: "printShop.shipping", descKey: "printShop.shippingDesc" },
    { icon: ShieldCheck, titleKey: "printShop.secure", descKey: "printShop.secureDesc" },
  ];

  return (
    <section id="prints" className="py-28 lg:py-36 bg-gradient-hero noise-overlay relative" aria-labelledby="prints-heading">
      <div className="container px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text content */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xs font-semibold tracking-[0.3em] uppercase text-gold mb-4"
              >
                Physical Prints
              </motion.p>
              <motion.h2
                id="prints-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-serif text-display-sm font-light text-white mb-6"
              >
                {t("printShop.title")}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/40 text-lg font-light leading-relaxed mb-10"
              >
                {t("printShop.subtitle")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  size="lg"
                  asChild
                  className="rounded-full px-10 h-14 bg-gradient-to-r from-gold-dark via-gold to-gold-light text-secondary hover:opacity-90 transition-all font-semibold tracking-wide border-0 shadow-glow-gold group"
                >
                  <Link to="/signup">
                    {t("printShop.cta")}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Right: Feature cards */}
            <div className="space-y-5">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.titleKey}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                  className="flex items-start gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-gold/20 transition-all duration-500 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center shrink-0 group-hover:shadow-glow-gold transition-all duration-500">
                    <feat.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-normal text-white mb-1">{t(feat.titleKey)}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{t(feat.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrintShopSection;
