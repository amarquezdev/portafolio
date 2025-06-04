import React, { useState } from 'react';
import Style from './Navbar.module.scss';
import Toggler from "./home/Toggler";

const links = [
  { name: 'Home', to: 'home', active: 'home' },
  { name: 'Sobre mi', to: 'about', active: 'about' },
  { name: 'Portafolio', to: 'portfolio', active: 'portfolio' },
  { name: 'Contacto', to: 'contacto', active: 'contacto' }
];

const scrollWidthOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -80;
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
};

export default function Navbar({ darkMode, handleClick, active, setActive }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={Style.navWrapper}>
      <div className={Style.topBar}>
        <button
          className={`${Style.burger} ${menuOpen ? Style.open : ''}`}
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </button>
        <Toggler darkMode={darkMode} handleClick={handleClick} />
      </div>

      {/* Menú desplegable */}
      <nav
        className={`${Style.mobileMenu} ${menuOpen ? Style.show : ''} ${
          darkMode ? Style.dark : Style.light
        }`}
      >
        <ul className={Style.navList}>
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={`#${link.to}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(link.to);
                  if (target) {
                    scrollWidthOffset(target);
                    setActive(link.active);
                    closeMenu();
                  }
                }}
                className={`${Style.link} ${link.active === active ? Style.linkActive : ''}`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
