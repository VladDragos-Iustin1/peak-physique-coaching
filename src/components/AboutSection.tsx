import { motion } from "framer-motion";
import { Award, Target, Users } from "lucide-react";

const stats = [
  { icon: Users, value: "150+", label: "Clienți Antrenați" },
  { icon: Award, value: "10+", label: "Ani Experiență" },
  { icon: Target, value: "50+", label: "Atleți pe Scenă" },
];

const AboutSection = () => {
  return (
    <section id="despre" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[3/4] bg-secondary rounded-sm overflow-hidden border border-border">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-border mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <p className="text-sm">Fotografie de profil</p>
                  <p className="text-xs text-muted-foreground mt-1">Înlocuiește cu poza ta</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-primary/30 rounded-sm -z-10" />
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-primary font-display uppercase tracking-[0.2em] text-sm mb-3">
              Despre Mine
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-6">
              Pasiune, Știință,{" "}
              <span className="text-primary">Rezultate</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Cu peste 10 ani de experiență în culturism competițional și coaching, 
                am ajutat zeci de atleți să-și atingă potențialul maxim pe scenă.
              </p>
              <p>
                Abordarea mea combină știința nutriției sportive cu periodizarea 
                antrenamentului și managementul peak week-ului pentru rezultate 
                de top la fiecare competiție.
              </p>
              <p>
                Fiecare plan este 100% personalizat — nu există template-uri. 
                Lucrăm împreună, pas cu pas, până la forma ta de scenă.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
