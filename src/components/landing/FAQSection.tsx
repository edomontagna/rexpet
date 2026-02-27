import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"];

const FAQSection = () => {
  const { t } = useTranslation();

  return (
    <section id="faq" className="py-28 lg:py-36 bg-background relative" aria-labelledby="faq-heading">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-gold mb-4"
          >
            Support
          </motion.p>
          <motion.h2
            id="faq-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-display-sm font-light text-foreground"
          >
            {t("faq.title")}
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqKeys.map((key, i) => (
              <AccordionItem
                key={key}
                value={`faq-${i}`}
                className="border border-border/80 rounded-2xl px-6 bg-card hover:border-gold/15 transition-colors duration-300 data-[state=open]:border-gold/20 data-[state=open]:shadow-luxury"
              >
                <AccordionTrigger className="text-left font-serif text-base font-normal hover:no-underline py-5 text-foreground/90 hover:text-foreground">
                  {t(`faq.${key}`)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5 font-light">
                  {t(`faq.a${key.slice(1)}`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
