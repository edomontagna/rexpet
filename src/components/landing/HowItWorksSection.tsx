import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Upload, Palette, Download } from "lucide-react";

const steps = [
  { icon: Upload, titleKey: "howItWorks.step1Title", descKey: "howItWorks.step1Desc", step: "01" },
  { icon: Palette, titleKey: "howItWorks.step2Title", descKey: "howItWorks.step2Desc", step: "02" },
  { icon: Download, titleKey: "howItWorks.step3Title", descKey: "howItWorks.step3Desc", step: "03" },
];

const HowItWorksSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 lg:py-32 bg-muted/30" aria-labelledby="how-it-works-heading">
      <div className="container px-4 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            id="how-it-works-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            {t("howItWorks.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-xl mx-auto text-lg"
          >
            {t("howItWorks.subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              <div className="text-6xl font-serif font-bold text-primary/10 mb-2">{step.step}</div>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{t(step.titleKey)}</h3>
              <p className="text-sm text-muted-foreground">{t(step.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
