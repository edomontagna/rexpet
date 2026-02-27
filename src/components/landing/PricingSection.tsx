import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const PricingSection = () => {
  const { t } = useTranslation();

  const plans = [
    {
      nameKey: "pricing.starter",
      descKey: "pricing.starterDesc",
      credits: 2,
      price: "€4.99",
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
      price: "€14.99",
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
      price: "€24.99",
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
    <section id="pricing" className="py-24 lg:py-32 bg-muted/30" aria-labelledby="pricing-heading">
      <div className="container px-4 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            id="pricing-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            {t("pricing.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-xl mx-auto text-lg"
          >
            {t("pricing.subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.nameKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <Card className={`relative h-full flex flex-col ${plan.popular ? "border-primary shadow-luxury-lg scale-[1.02]" : "border-border shadow-luxury"}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold tracking-wide">
                      <Sparkles className="h-3 w-3" />
                      {t("pricing.popular")}
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-2 pt-8">
                  <CardDescription className="text-sm uppercase tracking-wide">{t(plan.descKey)}</CardDescription>
                  <CardTitle className="font-serif text-2xl">{t(plan.nameKey)}</CardTitle>
                  <div className="mt-4">
                    <span className="font-serif text-5xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-1 text-sm">/ {plan.credits} {t("pricing.credits")}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col pt-6">
                  <ul className="space-y-3 flex-1" role="list">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="mt-8 w-full rounded-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <Link to="/signup">{t("pricing.getCta", { plan: t(plan.nameKey) })}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
