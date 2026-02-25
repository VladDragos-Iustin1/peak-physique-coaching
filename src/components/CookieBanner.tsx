import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const COOKIE_KEY = "gdpr_consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      // Mic delay ca să nu apară imediat la load
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          role="dialog"
          aria-live="polite"
          aria-label="Banner consimțământ cookie-uri"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 rounded-2xl border border-white/10 bg-card/95 p-5 shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur"
        >
          <button
            onClick={handleDecline}
            aria-label="Închide"
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <p className="text-xs text-primary font-display uppercase tracking-widest mb-2">
            🍪 Confidențialitate
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed mb-1">
            Acest site folosește date introduse în formular (nume, email,
            telefon, date fizice) exclusiv pentru a te putea contacta în
            legătură cu serviciile de coaching.
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Nu stocăm date pe servere proprii. Datele sunt transmise direct
            prin EmailJS și nu sunt partajate cu terți.{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              Politica de Confidențialitate
            </a>
            .
          </p>

          <div className="flex gap-3">
            <Button
              onClick={handleAccept}
              size="sm"
              className="flex-1 bg-primary text-primary-foreground hover:bg-gold-light font-display uppercase tracking-wider text-xs rounded-sm"
            >
              Accept
            </Button>
            <Button
              onClick={handleDecline}
              size="sm"
              variant="outline"
              className="flex-1 border-white/20 text-muted-foreground hover:text-foreground font-display uppercase tracking-wider text-xs rounded-sm"
            >
              Refuz
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
