import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Instagram } from "lucide-react";
import emailjs from "@emailjs/browser";

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedDuration || !selectedGoal) {
      toast({
        title: "Selectează durata și scopul",
        description: "Te rog alege o durată și un scop înainte să trimiți.",
      });
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as
      | string
      | undefined;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as
      | string
      | undefined;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as
      | string
      | undefined;

    if (!serviceId || !templateId || !publicKey) {
      toast({
        title: "Configurare lipsă",
        description:
          "EmailJS nu este configurat. Verifică variabilele de mediu.",
      });
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const params = {
      to_email: "razvangalata02@gmail.com",
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      instagram: String(formData.get("instagram") ?? ""),
      age: String(formData.get("age") ?? ""),
      height: String(formData.get("height") ?? ""),
      weight: String(formData.get("weight") ?? ""),
      duration: selectedDuration,
      goal: selectedGoal,
      message: String(formData.get("message") ?? ""),
    };

    try {
      await emailjs.send(serviceId, templateId, params, publicKey);
      toast({
        title: "Mesaj trimis cu succes!",
        description: "Te voi contacta în maximum 24 de ore.",
      });
      e.currentTarget.reset();
      setSelectedGoal("");
      setSelectedDuration("");
    } catch (error) {
      toast({
        title: "Eroare la trimitere",
        description: "Nu am putut trimite mesajul. Te rog încearcă din nou.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,205,110,0.12),_transparent_45%)]" />
      <div className="container mx-auto px-6 max-w-5xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight">
            Transformă-ți <span className="text-primary">corpul</span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Coaching personalizat. Rezultate reale. Completează formularul de
            mai jos și hai să începem.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12"
        >
          <div className="grid md:grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-black/30 p-3 shadow-[0_0_40px_rgba(255,205,110,0.08)]">
            <div className="aspect-[4/3] overflow-hidden rounded-xl">
              <img
                src="/placeholder-1.jpg"
                alt="Transformare client 1"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-xl">
              <img
                src="/placeholder-2.jpg"
                alt="Transformare client 2"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Rezultatele clienților mei — poze reale, muncă reală.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 space-y-6 rounded-2xl border border-white/10 bg-card/80 p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.4)] backdrop-blur"
        >
          <div>
            <p className="text-primary font-display uppercase tracking-[0.2em] text-sm mb-2">
              Contactează-mă
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold uppercase">
              Completează formularul
            </h2>
            <p className="text-muted-foreground mt-3">
              Completează datele de mai jos și te contactez pe Instagram.
            </p>
          </div>
          {/* Name & Email */}
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

          {/* Instagram & Age */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block">
                <Instagram className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                Instagram
              </label>
              <Input
                required
                name="instagram"
                placeholder="@username"
                className="bg-card border-border rounded-sm h-12 focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block">
                Vârstă
              </label>
              <Input
                required
                name="age"
                type="number"
                min={14}
                max={99}
                placeholder="Ex: 28"
                className="bg-card border-border rounded-sm h-12 focus:border-primary"
              />
            </div>
          </div>

          {/* Height & Weight */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block">
                Înălțime (cm)
              </label>
              <Input
                required
                name="height"
                type="number"
                min={100}
                max={250}
                placeholder="Ex: 180"
                className="bg-card border-border rounded-sm h-12 focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block">
                Greutate (kg)
              </label>
              <Input
                required
                name="weight"
                type="number"
                min={30}
                max={200}
                placeholder="Ex: 85"
                className="bg-card border-border rounded-sm h-12 focus:border-primary"
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-3 block">
              Pe câte luni vrei să lucrăm?
            </label>
            <input type="hidden" name="duration" value={selectedDuration} />
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
            <input type="hidden" name="goal" value={selectedGoal} />
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
