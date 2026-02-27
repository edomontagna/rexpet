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
    <section id="gallery" className="py-28 lg:py-36 bg-gradient-hero noise-overlay relative" aria-labelledby="gallery-heading">
      <div className="container px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.3em] uppercase text-gold mb-4"
          >
            The Collection
          </motion.p>
          <motion.h2
            id="gallery-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-display-sm font-light text-white mb-5"
          >
            {t("gallery.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-xl mx-auto text-lg font-light"
          >
            {t("gallery.subtitle")}
          </motion.p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded-2xl bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
            {styles.slice(0, 6).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                className={i === 0 || i === 5 ? "lg:mt-8" : i === 2 || i === 3 ? "lg:-mt-8" : ""}
              >
                <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer">
                  {/* Image */}
                  {item.preview_url ? (
                    <img
                      src={item.preview_url}
                      alt={`${item.name} pet portrait`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-navy" />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl border border-gold/0 group-hover:border-gold/30 transition-all duration-500" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-serif text-xl lg:text-2xl font-normal text-white mb-1">{item.name}</h3>
                    {item.description && (
                      <p className="text-sm text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.description}</p>
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
