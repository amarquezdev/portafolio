import { useTheme } from '@mui/material/styles';
import { info } from '../../info/Info';
import './Footer.scss';

export default function Footer() {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const footerSocials = [
    {
      link: 'mailto:al.marquezmiranda@gmail.com',
      icon: 'fa fa-envelope',
      label: 'Email',
    },
    {
      link: 'https://www.linkedin.com/in/amarquezmiranda/',
      icon: 'fa fa-linkedin',
      label: 'LinkedIn',
    },
    {
      link: '/AlejandroMarquez.pdf',
      icon: 'fa fa-file-text',
      label: 'Resume',
    },
  ];

  return (
    <footer className={`footer footer--${mode}`} id="contacto">
      <h2 className="footer-title">Contactémonos</h2>
      <p className="footer-subtitle">
        Desarrollador con orientación en <span style={{ color: info.baseColor }}>Desarrollo frontend</span>
      </p>
      <p className="footer-description">Disponible para nuevas oportunidades.</p>

      <div className="footer-socials">
        {footerSocials.map(({ link, icon, label }, index) => (
          <a
            key={index}
            href={link}
            target={link.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="footer-social-link"
          >
            <i className={icon}></i>
            <span>{label}</span>
          </a>
        ))}
      </div>

      <p className="footer-credit">
        Diseñado y desarrollado por <span style={{ color: info.baseColor }}>{info.fullname}</span>
      </p>
    </footer>
  );
}
