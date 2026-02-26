import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo1.png"
            alt="Peak Physique"
            className="h-8 w-auto opacity-80"
          />
          <span className="text-xs text-muted-foreground font-display uppercase tracking-wider">
            © {new Date().getFullYear()} Razvan Galata Online Coaching
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
          >
            Politică de confidențialitate
          </Link>
          <a
            href="https://www.instagram.com/galatarazvan/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
