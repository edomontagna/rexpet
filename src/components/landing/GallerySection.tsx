import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useStyles } from "@/hooks/useStyles";
import { Skeleton } from "@/components/ui/skeleton";

const fallbackStyles = [
  { id: "1", name: "Oil Painting", description: "Rich textures & golden tones", preview_url: "/images/oil-painting.jpg" },
  { id: "2", name: "Watercolor", description: "Soft washes & gentle blending", preview_url: "/images/watercolor.png" },
  { id: "3", name: "Pop Art", description: "Bold colors & graphic energy", preview_url: "/images/pop-art.png" },
  { id: "4", name: "Renaissance", description: "Noble bearing & dramatic light", preview_url: "/images/renaissance.png" },
  { id: "5", name: "Art Nouveau", description: "Flowing lines & organic forms", preview_url: "/images/art-nouveau.png" },
  { id: "6", name: "Impressionist", description: "Dappled light & visible strokes", preview_url: "/images/impressionist.png" },
];

const GallerySection = () => {
  const { t } = useTranslation();
  const { data: dbStyles, isLoading } = useStyles();
  const styles = dbStyles && dbStyles.length > 0 ? dbStyles : fallbackStyles;

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-background" aria-labelledby="gallery-heading">
      <div className="container px-4 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            id="gallery-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            {t("gallery.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-xl mx-auto text-lg"
          >
            {t("gallery.subtitle")}
          </motion.p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="aspect-[4/5] rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {styles.slice(0, 8).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-muted shadow-luxury hover:shadow-luxury-lg transition-shadow duration-500 cursor-pointer">
                  {item.preview_url ? (
                    <img
                      src={item.preview_url}
                      alt={`${item.name} pet portrait example`}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col items-center p-6 text-center">
                    <h3 className="font-serif text-xl font-semibold text-primary-foreground mb-1">{item.name}</h3>
                    {item.description && (
                      <p className="text-sm text-primary-foreground/70">{item.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
