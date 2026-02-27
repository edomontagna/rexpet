import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sophie M.",
    location: "Berlin, DE",
    text: "I couldn't believe how realistic the oil painting style looked. My golden retriever looks like a true aristocrat!",
    rating: 5,
    initials: "SM",
  },
  {
    name: "Marco R.",
    location: "Milano, IT",
    text: "Ho regalato un ritratto pop art del mio gatto alla mia ragazza. Era entusiasta! Qualita' incredibile.",
    rating: 5,
    initials: "MR",
  },
  {
    name: "Claire D.",
    location: "Paris, FR",
    text: "The watercolor style is absolutely gorgeous. I ordered a canvas print and it looks museum-worthy on my wall.",
    rating: 5,
    initials: "CD",
  },
];

const TestimonialsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-28 lg:py-36 bg-background relative" aria-labelledby="testimonials-heading">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-gold mb-4"
          >
            Testimonials
          </motion.p>
          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-display-sm font-light text-foreground"
          >
            {t("testimonials.title")}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-gold/20 shadow-luxury hover:shadow-luxury-lg transition-all duration-500"
            >
              <Quote className="h-8 w-8 text-gold/15 mb-6" strokeWidth={1} />

              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>

              <p className="text-sm text-foreground/70 leading-relaxed mb-8 font-light italic">
                "{item.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/15 flex items-center justify-center">
                  <span className="text-xs font-semibold text-gold">{item.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
