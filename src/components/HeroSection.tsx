import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(43_74%_49%/0.08),transparent_60%)]" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-primary font-display uppercase tracking-[0.3em] text-sm md:text-base mb-6">
            Online Coaching · Culturism
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] mb-6">
            Pregătire de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-gold-light">
              Elită
            </span>
            <br />
            pentru Competitori
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            Coaching personalizat pentru atleți avansați care vor să domine scena competițională. 
            Strategie, disciplină, rezultate.
          </p>
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-gold-light font-display uppercase tracking-wider text-base px-10 py-6 rounded-none"
          >
            Începe Transformarea
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
