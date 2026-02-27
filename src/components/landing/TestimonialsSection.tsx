import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie M.",
    location: "Berlin, DE",
    text: "I couldn't believe how realistic the oil painting style looked. My golden retriever looks like a true aristocrat!",
    rating: 5,
  },
  {
    name: "Marco R.",
    location: "Milano, IT",
    text: "Ho regalato un ritratto pop art del mio gatto alla mia ragazza. Era entusiasta! Qualita' incredibile.",
    rating: 5,
  },
  {
    name: "Claire D.",
    location: "Paris, FR",
    text: "The watercolor style is absolutely gorgeous. I ordered a canvas print and it looks museum-worthy on my wall.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 lg:py-32 bg-muted/30" aria-labelledby="testimonials-heading">
      <div className="container px-4 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            {t("testimonials.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-xl mx-auto text-lg"
          >
            {t("testimonials.subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border shadow-luxury"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-4">"{item.text}"</p>
              <div>
                <p className="text-sm font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
