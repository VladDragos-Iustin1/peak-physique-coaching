import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Instagram } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const goals = [
  "Pregătire de concurs",
  "Recompoziție corporală",
  "Creștere masă musculară",
  "Slăbire / Definire",
  "Menținere & Optimizare",
];

const durations = ["1 lună", "3 luni", "6 luni", "12 luni"];

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mesaj trimis cu succes!",
        description: "Te voi contacta în maximum 24 de ore.",
      });
      (e.target as HTMLFormElement).reset();
      setSelectedGoal("");
      setSelectedDuration("");
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
          className="space-y-6"
        >
          {/* Name & Email */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block">
                Nume
              </label>
              <Input required name="name" placeholder="Numele tău" className="bg-card border-border rounded-sm h-12 focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block">
                Email
              </label>
              <Input required name="email" type="email" placeholder="email@exemplu.ro" className="bg-card border-border rounded-sm h-12 focus:border-primary" />
            </div>
          </div>

          {/* Instagram & Age */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block">
                <Instagram className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                Instagram
              </label>
              <Input required name="instagram" placeholder="@username" className="bg-card border-border rounded-sm h-12 focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block">
                Vârstă
              </label>
              <Input required name="age" type="number" min={14} max={99} placeholder="Ex: 28" className="bg-card border-border rounded-sm h-12 focus:border-primary" />
            </div>
          </div>

          {/* Height & Weight */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block">
                Înălțime (cm)
              </label>
              <Input required name="height" type="number" min={100} max={250} placeholder="Ex: 180" className="bg-card border-border rounded-sm h-12 focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block">
                Greutate (kg)
              </label>
              <Input required name="weight" type="number" min={30} max={200} placeholder="Ex: 85" className="bg-card border-border rounded-sm h-12 focus:border-primary" />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-3 block">
              Pe câte luni vrei să lucrăm?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {durations.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDuration(d)}
                  className={`py-3 px-4 rounded-sm border font-display uppercase tracking-wider text-sm transition-all ${
                    selectedDuration === d
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div>
            <label className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-3 block">
              Care este scopul tău?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goals.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => setSelectedGoal(goal)}
                  className={`py-3 px-4 rounded-sm border text-left font-display uppercase tracking-wider text-sm transition-all ${
                    selectedGoal === goal
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block">
              Mesaj (opțional)
            </label>
            <Textarea
              name="message"
              placeholder="Spune-mi mai multe despre experiența ta, obiective, etc..."
              rows={4}
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
