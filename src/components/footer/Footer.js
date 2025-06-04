import { useTheme } from '@mui/material/styles';
import { Mail, Linkedin, FileText } from "lucide-react";
import { info } from "../../info/Info";
import "./Footer.scss";

export default function Footer() {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <footer className="footer" id="contacto">
      <h2 className="footer-title">Contactémonos</h2>

      <p className="footer-subtitle">
       Desarrollador con orientacion en <span style={{ color: info.baseColor }}>Desarrollo frontend</span>
      </p>
      <p className="footer-description">Disponible para nuevas oportunidades.</p>

      <div className="footer-buttons">
<a
  href="mailto:al.marquezmiranda@gmail.com"
  className={`footer-button footer-button--${mode}`}
>
  <Mail className="footer-icon" />
  <span>Email</span>
</a>

        <a
          href="https://www.linkedin.com/in/amarquezmiranda/"
          target="_blank"
          rel="noopener noreferrer"
          className={`footer-button footer-button--${mode}`}
        >
          <Linkedin className="footer-icon" />
          <span>LinkedIn</span>
        </a>

        <a
          href="/AlejandroMarquez.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`footer-button footer-button--${mode}`}
        >
          <FileText className="footer-icon" />
          <span>Resume</span>
        </a>
      </div>

      <p className="footer-credit">
        Diseñado y desarrollado por <span style={{ color: info.baseColor }}>{info.fullname}</span>
      </p>
    </footer>
  );
}
