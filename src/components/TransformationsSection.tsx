import { motion } from "framer-motion";

const transformations = [
  {
    name: "Alexandru M.",
    description: "Pregătire concurs – 16 săptămâni. Prima competiție, locul 2.",
    category: "Men's Physique",
  },
  {
    name: "Cristina D.",
    description: "Recompoziție corporală avansată – 20 săptămâni de coaching.",
    category: "Bikini Fitness",
  },
  {
    name: "Andrei P.",
    description: "De la off-season la scenă în 24 săptămâni. Overall winner.",
    category: "Classic Physique",
  },
  {
    name: "Maria R.",
    description: "Tranziție de la fitness recreațional la prima competiție.",
    category: "Wellness Fitness",
  },
];

const TransformationsSection = () => {
  return (
    <section id="transformari" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display uppercase tracking-[0.2em] text-sm mb-3">
            Rezultate Dovedite
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">
            Transformări <span className="text-primary">Reale</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {transformations.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card border border-border rounded-sm overflow-hidden hover:border-primary/50 transition-colors duration-300"
            >
              <div className="flex">
                {/* Before placeholder */}
                <div className="w-1/2 aspect-[3/4] bg-secondary flex items-center justify-center relative">
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm">Înainte</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Placeholder</p>
                  </div>
                  <span className="absolute top-3 left-3 bg-background/80 text-xs px-2 py-1 uppercase tracking-wider text-muted-foreground">
                    Before
                  </span>
                </div>
                {/* After placeholder */}
                <div className="w-1/2 aspect-[3/4] bg-secondary/60 flex items-center justify-center relative">
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm">După</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Placeholder</p>
                  </div>
                  <span className="absolute top-3 right-3 bg-primary/90 text-primary-foreground text-xs px-2 py-1 uppercase tracking-wider">
                    After
                  </span>
                </div>
              </div>
              {/* Info bar */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-lg font-semibold uppercase">
                    {item.name}
                  </h3>
                  <span className="text-primary text-xs font-display uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransformationsSection;
