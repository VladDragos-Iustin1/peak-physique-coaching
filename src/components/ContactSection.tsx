import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mesaj trimis cu succes!",
        description: "Te voi contacta în maximum 24 de ore.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display uppercase tracking-[0.2em] text-sm mb-3">
            Hai Să Vorbim
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">
            Contactează-mă
          </h2>
          <p className="text-muted-foreground mt-4">
            Completează formularul și te contactez în 24 de ore.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block">
                Nume
              </label>
              <Input
                required
                name="name"
                placeholder="Numele tău"
                className="bg-card border-border rounded-sm h-12 focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block">
                Email
              </label>
              <Input
                required
                name="email"
                type="email"
                placeholder="email@exemplu.ro"
                className="bg-card border-border rounded-sm h-12 focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block">
              Mesaj
            </label>
            <Textarea
              required
              name="message"
              placeholder="Spune-mi despre obiectivele tale, experiența ta și cum te pot ajuta..."
              rows={6}
              className="bg-card border-border rounded-sm focus:border-primary resize-none"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="w-full bg-primary text-primary-foreground hover:bg-gold-light font-display uppercase tracking-wider text-base py-6 rounded-sm"
          >
            {isSubmitting ? (
              "Se trimite..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Trimite Mesajul
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
