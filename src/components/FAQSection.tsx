import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Pentru cine este coaching-ul?",
    answer:
      "Coaching-ul meu este destinat atleților avansați sau intermediari care vor să concureze în culturism, men's physique, classic physique, bikini sau wellness. Dacă ești la început de drum, te pot ghida, dar trebuie să ai deja o bază solidă de antrenament.",
  },
  {
    question: "Cum funcționează colaborarea?",
    answer:
      "După o evaluare inițială detaliată, vei primi un plan complet de antrenament și nutriție. Comunicăm săptămânal pentru ajustări, iar tu îmi trimiți check-in-uri cu poze de progres, greutate și feedback. Totul este online.",
  },
  {
    question: "Cât durează o pregătire de concurs?",
    answer:
      "Depinde de punctul de plecare, dar în general recomand minim 16-24 de săptămâni de prep. Dacă ai nevoie de mai mult timp, vom planifica împreună un off-season strategic înainte de prep.",
  },
  {
    question: "Ce include planul de nutriție?",
    answer:
      "Planul include macronutrienți personalizați, structura meselor, timing-ul în jurul antrenamentului, suplimente recomandate și ajustări periodice bazate pe progres și feedback-ul tău.",
  },
  {
    question: "Pot lucra cu tine dacă nu vreau să concurez?",
    answer:
      "Da, ofer și coaching avansat pentru cei care vor să-și ducă fizicul la un nivel superior fără a concura. Condiția este să fii dedicat și consistent.",
  },
  {
    question: "Cum pot începe?",
    answer:
      "Completează formularul de contact de mai jos cu câteva detalii despre tine și obiectivele tale. Te voi contacta în maximum 24 de ore pentru o discuție inițială gratuită.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display uppercase tracking-[0.2em] text-sm mb-3">
            Întrebări Frecvente
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">
            FAQ
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border bg-card rounded-sm px-6"
              >
                <AccordionTrigger className="font-display text-base uppercase tracking-wide hover:no-underline hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
