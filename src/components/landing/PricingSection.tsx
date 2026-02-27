import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const PricingSection = () => {
  const { t } = useTranslation();

  const plans = [
    {
      nameKey: "pricing.starter",
      descKey: "pricing.starterDesc",
      credits: 2,
      price: "4.99",
      features: [
        t("pricing.features.highRes"),
        t("pricing.features.allStyles"),
        t("pricing.features.download"),
      ],
      popular: false,
    },
    {
      nameKey: "pricing.bundle",
      descKey: "pricing.bundleDesc",
      credits: 10,
      price: "14.99",
      features: [
        t("pricing.features.highRes"),
        t("pricing.features.allStyles"),
        t("pricing.features.download"),
        t("pricing.features.noExpiry"),
      ],
      popular: true,
    },
    {
      nameKey: "pricing.collection",
      descKey: "pricing.collectionDesc",
      credits: 20,
      price: "24.99",
      features: [
        t("pricing.features.highRes"),
        t("pricing.features.allStyles"),
        t("pricing.features.download"),
        t("pricing.features.noExpiry"),
        t("pricing.features.priority"),
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-28 lg:py-36 bg-background relative" aria-labelledby="pricing-heading">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-gold mb-4"
          >
            Investment
          </motion.p>
          <motion.h2
            id="pricing-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-display-sm font-light text-foreground mb-5"
          >
            {t("pricing.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto text-lg font-light"
          >
            {t("pricing.subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.nameKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={plan.popular ? "md:-mt-4 md:mb-[-16px]" : ""}
            >
              <div className={`relative h-full flex flex-col rounded-2xl p-8 transition-all duration-500 hover:shadow-luxury-lg ${
                plan.popular
                  ? "bg-gradient-hero text-white border border-gold/20 shadow-glow-gold"
                  : "bg-card border border-border shadow-luxury hover:border-gold/20"
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light text-secondary text-xs font-semibold tracking-wide">
                      <Sparkles className="h-3 w-3" />
                      {t("pricing.popular")}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8 pt-4">
                  <p className={`text-xs tracking-[0.2em] uppercase mb-2 ${plan.popular ? "text-gold-light" : "text-muted-foreground"}`}>
                    {t(plan.descKey)}
                  </p>
                  <h3 className={`font-serif text-2xl font-normal mb-6 ${plan.popular ? "text-white" : "text-foreground"}`}>
                    {t(plan.nameKey)}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`font-serif text-5xl lg:text-6xl font-light tracking-tight ${plan.popular ? "text-white" : "text-foreground"}`}>
                      €{plan.price}
                    </span>
                  </div>
                  <p className={`text-sm mt-2 ${plan.popular ? "text-white/50" : "text-muted-foreground"}`}>
                    {plan.credits} {t("pricing.credits")}
                  </p>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

                <ul className="space-y-4 flex-1" role="list">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-3 text-sm ${plan.popular ? "text-white/70" : "text-foreground/70"}`}>
                      <Check className={`h-4 w-4 mt-0.5 shrink-0 ${plan.popular ? "text-gold" : "text-gold"}`} strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`mt-10 w-full rounded-full h-12 font-semibold tracking-wide transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-gold-dark via-gold to-gold-light text-secondary hover:opacity-90 border-0 shadow-glow-gold"
                      : "bg-transparent border border-foreground/15 text-foreground hover:bg-foreground/5 hover:border-foreground/25"
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  <Link to="/signup">{t("pricing.getCta", { plan: t(plan.nameKey) })}</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
