import { motion } from "framer-motion";
import { Trophy, Dumbbell, Apple } from "lucide-react";

const services = [
  {
    icon: Trophy,
    title: "Pregătire Concurs",
    description:
      "Program complet de pregătire competițională: periodizare antrenament, nutriție, posing, peak week și water/carb manipulation. Totul adaptat categoriei tale.",
  },
  {
    icon: Dumbbell,
    title: "Coaching Avansat",
    description:
      "Pentru atleți experimentați care vor să ducă fizicul la următorul nivel. Planuri de antrenament și nutriție avansate cu monitorizare săptămânală.",
  },
  {
    icon: Apple,
    title: "Consultanță Nutriție",
    description:
      "Strategii nutriționale bazate pe știință pentru recompoziție corporală, creștere musculară sau definire. Adaptat stilului tău de viață.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicii" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display uppercase tracking-[0.2em] text-sm mb-3">
            Ce Ofer
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">
            Servicii <span className="text-primary">Premium</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group bg-card border border-border rounded-sm p-8 hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <service.icon className="w-10 h-10 text-primary mb-6" />
              <h3 className="font-display text-xl font-bold uppercase mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
