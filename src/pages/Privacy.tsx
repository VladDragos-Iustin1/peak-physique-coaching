import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 max-w-3xl py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight mb-2">
            Politică de{" "}
            <span className="text-primary">Confidențialitate</span>
          </h1>
          <p className="text-muted-foreground text-sm mb-10">
            Ultima actualizare: februarie 2026
          </p>

          <div className="space-y-8 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="font-display text-lg font-bold uppercase text-primary mb-3">
                1. Cine suntem
              </h2>
              <p>
                Acest site aparține lui <strong>Răzvan Galață</strong>, coach
                individual de fitness și culturism online. Date contact:{" "}
                <a
                  href="mailto:razvangalata02@gmail.com"
                  className="text-primary underline hover:text-gold-light transition-colors"
                >
                  razvangalata02@gmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase text-primary mb-3">
                2. Ce date colectăm
              </h2>
              <p>Prin completarea formularului de contact colectăm:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-foreground/80">
                <li>Nume și prenume</li>
                <li>Adresă de email</li>
                <li>Număr de telefon</li>
                <li>Username Instagram</li>
                <li>Date fizice: vârstă, înălțime, greutate</li>
                <li>Scopul antrenamentului și durata dorită de colaborare</li>
                <li>Mesaj opțional</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase text-primary mb-3">
                3. Scopul prelucrării
              </h2>
              <p>
                Datele colectate sunt folosite exclusiv pentru a te contacta în
                vederea stabilirii unei colaborări de coaching online
                personalizat. Nu sunt folosite în scop publicitar sau comercial.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase text-primary mb-3">
                4. Cum sunt transmise datele
              </h2>
              <p>
                Datele introduse în formular sunt transmise prin serviciul{" "}
                <a
                  href="https://www.emailjs.com/legal/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-gold-light transition-colors"
                >
                  EmailJS
                </a>{" "}
                direct la adresa de email a coachului. Nu stocăm datele pe
                servere proprii. EmailJS procesează datele conform propriei
                politici de confidențialitate și este conform GDPR.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase text-primary mb-3">
                5. Baza legală
              </h2>
              <p>
                Prelucrarea datelor se bazează pe{" "}
                <strong>consimțământul explicit</strong> acordat prin bifarea
                checkbox-ului din formular, conform Art. 6(1)(a) din
                Regulamentul (UE) 2016/679 (GDPR).
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase text-primary mb-3">
                6. Drepturile tale
              </h2>
              <p>Conform GDPR, ai dreptul să:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-foreground/80">
                <li>Accesezi datele personale pe care le-ai furnizat</li>
                <li>Soliciți rectificarea datelor incorecte</li>
                <li>Soliciți ștergerea datelor („dreptul de a fi uitat")</li>
                <li>Retragi consimțământul în orice moment</li>
                <li>Depui o plângere la ANSPDCP</li>
              </ul>
              <p className="mt-3">
                Pentru orice solicitare, scrie la{" "}
                <a
                  href="mailto:razvangalata02@gmail.com"
                  className="text-primary underline hover:text-gold-light transition-colors"
                >
                  razvangalata02@gmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold uppercase text-primary mb-3">
                7. Cookie-uri
              </h2>
              <p>
                Acest site folosește exclusiv{" "}
                <strong>cookie-uri tehnice</strong> stocate în{" "}
                <code className="bg-white/5 px-1 rounded text-sm">
                  localStorage
                </code>{" "}
                pentru a reține preferința ta de consimțământ și pentru a
                preveni trimiterea multiplă a formularului. Nu folosim
                cookie-uri de tracking sau publicitate.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Privacy;
