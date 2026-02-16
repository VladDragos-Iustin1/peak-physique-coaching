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

    const form = e.currentTarget;
    const formData = new FormData(form);
    const clientEmail = String(formData.get("email") ?? "");
    const clientName = String(formData.get("name") ?? "");
    const params = {
      to_email: "razvangalata02@gmail.com",
      from_name: clientName,
      reply_to: clientEmail,
      name: clientName,
      email: clientEmail,
      phone: String(formData.get("phone") ?? ""),
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
      form.reset();
      setSelectedGoal("");
      setSelectedDuration("");
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error !== null && "text" in error
          ? String((error as { text?: string }).text)
          : typeof error === "object" && error !== null && "message" in error
            ? String((error as { message?: string }).message)
            : "Nu am putut trimite mesajul. Te rog încearcă din nou.";
      console.error("EmailJS send failed", error);
      toast({
        title: "Eroare la trimitere",
        description: errorMessage,
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
            <div className="overflow-hidden rounded-xl">
              <img
                src="/photo/1.jpeg"
                alt="Transformare client "
                className="w-full h-auto"
              />
            </div>
            <div className="overflow-hidden rounded-xl">
              <img
                src="/photo/2.jpeg"
                alt="Transformare client2"
                className="w-full h-auto"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Rezultatele clienților mei — poze reale, muncă reală.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 rounded-2xl border border-white/10 bg-card/80 p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.4)] backdrop-blur"
        >
          <h3 className="font-display text-xl md:text-2xl font-bold uppercase text-primary mb-6 flex items-center gap-2">
            🔥 Ce primești în cadrul coachingului
          </h3>
          <ul className="space-y-3 text-foreground/90">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>
                Program de antrenament complet, personalizat 100% în funcție de
                obiectivele tale
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>
                Plan nutrițional adaptat fazei în care te afli (masă / definire
                / menținere) – include plan alimentar complet, calcul de
                macronutrienți & calorii, monitorizare lichide & sare
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Protocol de suplimentare personalizat</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Analiză video a execuției exercițiilor</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Monitorizarea recuperării</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Monitorizarea digestiei</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Monitorizarea somnului</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Suport 24/7 pe WhatsApp</span>
            </li>
          </ul>

          <div className="mt-8 pt-6 border-t border-white/10">
            <h3 className="font-display text-xl md:text-2xl font-bold uppercase text-primary mb-6 flex items-center gap-2">
              📅 Sistem de check-in
            </h3>
            <ul className="space-y-3 text-foreground/90">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong className="text-foreground">Off-season:</strong> 1
                  check-in oficial pe săptămână
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong className="text-foreground">
                    Prep (pregătire competițională):
                  </strong>{" "}
                  check-in zilnic
                </span>
              </li>
            </ul>
          </div>
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

          {/* Phone & Instagram */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block">
                Telefon
              </label>
              <Input
                required
                name="phone"
                type="tel"
                placeholder="07xx xxx xxx"
                className="bg-card border-border rounded-sm h-12 focus:border-primary"
              />
            </div>
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
          </div>

          {/* Age, Height & Weight */}
          <div className="grid md:grid-cols-3 gap-5">
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
