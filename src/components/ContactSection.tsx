import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Send,
  Instagram,
  Dumbbell,
  Utensils,
  FlaskConical,
  Video,
  HeartPulse,
  Beef,
  Moon,
  MessageCircle,
  CalendarDays,
  CalendarCheck2,
} from "lucide-react";
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
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [messageLength, setMessageLength] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot anti-bot: dacă câmpul ascuns este completat, ignorăm silențios
    const honeypot = (
      e.currentTarget.elements.namedItem("website") as HTMLInputElement
    )?.value;
    if (honeypot) return;

    // Rate limiting — cooldown 5 minute
    const RATE_LIMIT_MS = 5 * 60 * 1000;
    const lastSubmission = localStorage.getItem("form_last_submission");
    if (lastSubmission && Date.now() - Number(lastSubmission) < RATE_LIMIT_MS) {
      const remaining = Math.ceil(
        (RATE_LIMIT_MS - (Date.now() - Number(lastSubmission))) / 60000,
      );
      toast({
        title: "Prea multe încercări",
        description: `Poți trimite din nou în ${remaining} minut${
          remaining === 1 ? "" : "e"
        }.`,
      });
      return;
    }

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

    const form = e.currentTarget;
    const formData = new FormData(form);
    const clientEmail = String(formData.get("email") ?? "");
    const clientName = String(formData.get("name") ?? "");
    const phoneValue = String(formData.get("phone") ?? "");
    const instagramValue = String(formData.get("instagram") ?? "");
    const messageValue = String(formData.get("message") ?? "");

    // Validare telefon românesc
    const phoneClean = phoneValue.replace(/[\s-]/g, "");
    if (!/^(\+40|0)[0-9]{9}$/.test(phoneClean)) {
      toast({
        title: "Telefon invalid",
        description:
          "Introdu un număr valid (ex: 0712 345 678 sau +40712345678).",
      });
      return;
    }

    // Validare Instagram username
    const instagramClean = instagramValue.startsWith("@")
      ? instagramValue.slice(1)
      : instagramValue;
    if (!/^[a-zA-Z0-9_.]{1,30}$/.test(instagramClean)) {
      toast({
        title: "Username Instagram invalid",
        description:
          "Introdu un username valid (litere, cifre, puncte, underscore, max 30 caractere).",
      });
      return;
    }

    // Validare GDPR
    if (!gdprAccepted) {
      toast({
        title: "Consimțământ necesar",
        description:
          "Te rog să accepți prelucrarea datelor înainte să trimiți.",
      });
      return;
    }

    // Lungime maximă mesaj
    if (messageValue.length > 1000) {
      toast({
        title: "Mesaj prea lung",
        description: `Mesajul nu poate depăși 1000 de caractere (ai ${messageValue.length}).`,
      });
      return;
    }

    setIsSubmitting(true);

    const params = {
      to_email: "razvangalata02@gmail.com",
      from_name: clientName,
      reply_to: clientEmail,
      name: clientName,
      email: clientEmail,
      phone: phoneValue,
      instagram: instagramValue,
      age: String(formData.get("age") ?? ""),
      height: String(formData.get("height") ?? ""),
      weight: String(formData.get("weight") ?? ""),
      duration: selectedDuration,
      goal: selectedGoal,
      message: messageValue,
    };

    try {
      await emailjs.send(serviceId, templateId, params, publicKey);
      localStorage.setItem("form_last_submission", String(Date.now()));
      form.reset();
      setSelectedGoal("");
      setSelectedDuration("");
      setGdprAccepted(false);
      setMessageLength(0);
      setSubmitted(true);
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
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-4 left-6 md:left-6 lg:left-8 z-50 hidden md:block"
      >
        <img
          src="/logo1.png"
          alt="Logo"
          className="h-28 lg:h-32 w-auto opacity-90"
        />
      </motion.div>

      <section
        id="contact"
        className="relative overflow-hidden pt-8 pb-24 md:py-32"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,205,110,0.12),_transparent_45%)]" />
        <div className="container mx-auto px-6 max-w-5xl relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4 md:hidden"
          >
            <img
              src="/logo1.png"
              alt="Logo"
              className="h-20 w-auto opacity-90"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Build Muscle Train Smart
              <br />
              <span className="text-primary">Stay Natural</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-foreground/90">
              {[
                {
                  icon: Dumbbell,
                  text: "Program de antrenament complet, personalizat 100% în funcție de obiectivele tale",
                },
                {
                  icon: Utensils,
                  text: "Plan nutrițional adaptat fazei în care te afli (masă / definire / menținere) – include plan alimentar complet, calcul de macronutrienți & calorii, monitorizare lichide & sare",
                },
                {
                  icon: FlaskConical,
                  text: "Protocol de suplimentare personalizat",
                },
                {
                  icon: Video,
                  text: "Analiză video a execuției exercițiilor",
                },
                {
                  icon: HeartPulse,
                  text: "Monitorizarea recuperării",
                },
                {
                  icon: Beef,
                  text: "Monitorizarea digestiei",
                },
                {
                  icon: Moon,
                  text: "Monitorizarea somnului",
                },
                {
                  icon: MessageCircle,
                  text: "Suport 24/7 pe WhatsApp",
                },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="group flex items-start gap-3 rounded-xl border border-white/10 bg-card/40 p-4 transition-all duration-300 hover:border-primary/40 hover:bg-card/70 hover:shadow-[0_0_24px_rgba(255,205,110,0.12)] cursor-default"
                >
                  <span className="mt-0.5 shrink-0 text-primary/70 group-hover:text-primary transition-colors duration-300">
                    <Icon size={18} />
                  </span>
                  <span className="text-sm leading-relaxed">{text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="font-display text-xl md:text-2xl font-bold uppercase text-primary mb-6 flex items-center gap-2">
                📅 Sistem de check-in
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-foreground/90">
                {[
                  {
                    icon: CalendarDays,
                    label: "Standard",
                    text: "check-in o dată pe săptămână",
                  },
                  {
                    icon: CalendarCheck2,
                    label: "Prep (pregătire competițională)",
                    text: "check-in zilnic",
                  },
                ].map(({ icon: Icon, label, text }) => (
                  <div
                    key={label}
                    className="group flex items-start gap-3 rounded-xl border border-white/10 bg-card/40 p-4 transition-all duration-300 hover:border-primary/40 hover:bg-card/70 hover:shadow-[0_0_24px_rgba(255,205,110,0.12)] cursor-default"
                  >
                    <span className="mt-0.5 shrink-0 text-primary/70 group-hover:text-primary transition-colors duration-300">
                      <Icon size={18} />
                    </span>
                    <span className="text-sm leading-relaxed">
                      <strong className="text-foreground block mb-0.5">
                        {label}:
                      </strong>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="font-display text-xl md:text-2xl font-bold uppercase text-primary mb-6 flex items-center gap-2">
                📋 Cum funcționează
              </h3>
              <div className="rounded-xl border border-primary/20 bg-card/30 p-6 text-foreground/90">
                <p className="text-sm leading-relaxed mb-4">
                  <strong className="text-primary">
                    După trimiterea formularului
                  </strong>
                  , vei primi acces la un video explicativ în care îți prezint
                  metodologia mea de lucru, structura programului și așteptările
                  colaborării.
                </p>
                <p className="text-sm leading-relaxed">
                  Dacă dorești, poți programa ulterior un apel de consultare
                  pentru a discuta obiectivele tale și pentru a vedea dacă
                  suntem potriviți să lucrăm împreună.
                </p>
              </div>
            </div>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-12 rounded-2xl border border-primary/30 bg-card/80 p-10 md:p-16 shadow-[0_0_50px_rgba(255,205,110,0.12)] backdrop-blur text-center"
            >
              <div className="text-5xl mb-6">🏆</div>
              <h2 className="font-display text-2xl md:text-3xl font-bold uppercase mb-3">
                Mesaj trimis cu succes!
              </h2>
              <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                Te voi contacta în maximum{" "}
                <span className="text-primary font-semibold">24 de ore</span>.
                Pregătește-te să începi transformarea.
              </p>
              <div className="max-w-lg mx-auto mb-8 p-6 rounded-xl border border-primary/20 bg-card/30 text-left">
                <h3 className="font-display text-sm uppercase tracking-wider text-primary mb-3 font-semibold">
                  📋 Pașii următori:
                </h3>
                <p className="text-sm text-foreground/90 leading-relaxed mb-3">
                  Primești acces la un{" "}
                  <strong className="text-primary">video explicativ</strong> cu
                  metodologia mea de lucru și structura programului.
                </p>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  Opțional, poți programa un{" "}
                  <strong className="text-primary">apel de consultare</strong>{" "}
                  pentru a discuta obiectivele tale.
                </p>
              </div>
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="border-white/20 text-muted-foreground hover:text-foreground font-display uppercase tracking-wider text-xs rounded-sm"
              >
                Trimite alt mesaj
              </Button>
            </motion.div>
          ) : (
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
                  Completează datele de mai jos și te contactez eu.
                </p>
              </div>
              {/* Honeypot anti-bot — invizibil pentru utilizatori, vizibil pentru boți */}
              <div
                style={{
                  position: "absolute",
                  left: "-9999px",
                  top: "-9999px",
                  opacity: 0,
                  pointerEvents: "none",
                }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>

              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="field-name"
                    className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block"
                  >
                    Nume
                  </label>
                  <Input
                    id="field-name"
                    required
                    name="name"
                    placeholder="Numele tău"
                    maxLength={100}
                    autoComplete="name"
                    className="bg-card border-border rounded-sm h-12 focus:border-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="field-email"
                    className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block"
                  >
                    Email
                  </label>
                  <Input
                    id="field-email"
                    required
                    name="email"
                    type="email"
                    placeholder="email@exemplu.ro"
                    maxLength={254}
                    autoComplete="email"
                    className="bg-card border-border rounded-sm h-12 focus:border-primary"
                  />
                </div>
              </div>

              {/* Phone & Instagram */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="field-phone"
                    className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block"
                  >
                    Telefon
                  </label>
                  <Input
                    id="field-phone"
                    required
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="07xx xxx xxx"
                    maxLength={20}
                    autoComplete="tel"
                    className="bg-card border-border rounded-sm h-12 focus:border-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="field-instagram"
                    className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block"
                  >
                    <Instagram className="w-4 h-4 inline mr-1.5 -mt-0.5" />
                    Instagram
                  </label>
                  <Input
                    id="field-instagram"
                    required
                    name="instagram"
                    placeholder="@username"
                    maxLength={31}
                    autoComplete="off"
                    className="bg-card border-border rounded-sm h-12 focus:border-primary"
                  />
                </div>
              </div>

              {/* Age, Height & Weight */}
              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label
                    htmlFor="field-age"
                    className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block"
                  >
                    Vârstă
                  </label>
                  <Input
                    id="field-age"
                    required
                    name="age"
                    type="number"
                    inputMode="numeric"
                    min={14}
                    max={99}
                    placeholder="Ex: 28"
                    className="bg-card border-border rounded-sm h-12 focus:border-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="field-height"
                    className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block"
                  >
                    Înălțime (cm)
                  </label>
                  <Input
                    id="field-height"
                    required
                    name="height"
                    type="number"
                    inputMode="numeric"
                    min={100}
                    max={250}
                    placeholder="Ex: 180"
                    className="bg-card border-border rounded-sm h-12 focus:border-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="field-weight"
                    className="text-sm font-display uppercase tracking-wider text-muted-foreground mb-2 block"
                  >
                    Greutate (kg)
                  </label>
                  <Input
                    id="field-weight"
                    required
                    name="weight"
                    type="number"
                    inputMode="numeric"
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
                <div className="flex justify-between items-baseline mb-2">
                  <label
                    htmlFor="field-message"
                    className="text-sm font-display uppercase tracking-wider text-muted-foreground"
                  >
                    Mesaj (opțional)
                  </label>
                  <span
                    className={`text-xs tabular-nums transition-colors ${
                      messageLength > 900
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {messageLength}/1000
                  </span>
                </div>
                <Textarea
                  id="field-message"
                  name="message"
                  placeholder="Spune-mi mai multe despre experiența ta, obiective, etc..."
                  rows={4}
                  maxLength={1000}
                  onChange={(e) => setMessageLength(e.target.value.length)}
                  className="bg-card border-border rounded-sm focus:border-primary resize-none"
                />
              </div>

              {/* GDPR Checkbox */}
              <div className="flex items-start gap-3 rounded-sm border border-white/10 bg-black/20 p-4">
                <input
                  id="field-gdpr"
                  type="checkbox"
                  checked={gdprAccepted}
                  onChange={(e) => setGdprAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--primary))] cursor-pointer"
                />
                <label
                  htmlFor="field-gdpr"
                  className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
                >
                  Sunt de acord cu prelucrarea datelor personale (nume, email,
                  telefon, date fizice) în scopul contactării pentru servicii de
                  coaching online. Datele nu vor fi stocate pe servere proprii
                  și nu vor fi transmise unor terți.{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Citește Politica de Confidențialitate
                  </a>
                  . Înțeleg că pot retrage consimțământul oricând.
                </label>
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
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-10 shadow-[0_0_50px_rgba(255,205,110,0.15)] backdrop-blur"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-display text-2xl md:text-3xl font-bold uppercase mb-3 flex items-center justify-center md:justify-start gap-3">
                  <Instagram className="w-8 h-8 text-primary" />
                  Follow me pe Instagram
                </h3>
                <p className="text-muted-foreground text-base mb-4">
                  Urmărește-mă pentru sfaturi zilnice, transformări reale și
                  motivație everyday! 💪
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <a
                    href="https://www.instagram.com/galatarazvan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display uppercase tracking-wider text-sm rounded-sm hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(255,205,110,0.3)]"
                  >
                    <Instagram className="w-5 h-5" />
                    @galatarazvan
                  </a>
                </div>
              </div>
              <div className="shrink-0">
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
                  <Instagram className="relative w-full h-full text-primary/30" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 rounded-2xl border border-[#25D366]/30 bg-gradient-to-br from-[#25D366]/10 via-[#25D366]/5 to-transparent p-8 md:p-10 shadow-[0_0_50px_rgba(37,211,102,0.10)] backdrop-blur"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-display text-2xl md:text-3xl font-bold uppercase mb-3 flex items-center justify-center md:justify-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-[#25D366]"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Ai întrebări? Scrie-mi acum
                </h3>
                <p className="text-muted-foreground text-base mb-4">
                  N-ai timp de așteptat? Contactează-mă direct pe WhatsApp — îți
                  răspund rapid! 🚀
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <a
                    href="https://wa.me/40758889175?text=Bun%C4%83!%20Sunt%20interesat%20de%20programul%20t%C4%83u%20de%20coaching.%20%C3%8Emi%20po%C8%9Bi%20spune%20mai%20multe%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-display uppercase tracking-wider text-sm rounded-sm hover:bg-[#1ebe5d] transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Contactează-mă
                  </a>
                </div>
              </div>
              <div className="shrink-0">
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <div className="absolute inset-0 bg-[#25D366]/20 rounded-full blur-2xl" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="relative w-full h-full text-[#25D366]/30"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 py-8 relative"
          >
            <div className="text-center">
              <blockquote className="font-display text-2xl md:text-4xl font-bold uppercase tracking-tight text-primary mb-2">
                Răbdare și muncă
              </blockquote>
              <p className="text-muted-foreground text-xs md:text-sm uppercase tracking-[0.15em] font-display">
                Cheia transformării
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
