import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Upload, Palette, Download } from "lucide-react";

const steps = [
  { icon: Upload, titleKey: "howItWorks.step1Title", descKey: "howItWorks.step1Desc", num: "01" },
  { icon: Palette, titleKey: "howItWorks.step2Title", descKey: "howItWorks.step2Desc", num: "02" },
  { icon: Download, titleKey: "howItWorks.step3Title", descKey: "howItWorks.step3Desc", num: "03" },
];

const HowItWorksSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-28 lg:py-36 bg-background relative overflow-hidden">
      {/* Subtle top separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-gold mb-4"
          >
            The Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-display-sm font-light text-foreground"
          >
            {t("howItWorks.title")}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 max-w-5xl mx-auto relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-border via-gold/20 to-border" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="text-center relative"
            >
              <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/15 flex items-center justify-center mx-auto mb-8 shadow-glow-gold">
                <step.icon className="h-8 w-8 text-gold" strokeWidth={1.5} />
              </div>
              <span className="font-serif text-5xl font-light text-gold/10 absolute -top-2 left-1/2 -translate-x-1/2">{step.num}</span>
              <h3 className="font-serif text-2xl font-normal text-foreground mb-3">{t(step.titleKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{t(step.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
