import React from "react";
import { Link as ScrollLink } from "react-scroll";
import classNames from "classnames";
import "./DotNav.scss";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "Sobre Mi" },
  { id: "portfolio", label: "Portafolio" },
  { id: "contacto", label: "Contacto" },
];

function DotNav({ darkMode }){
  return (
    <nav className={classNames("dot-nav", { dark: darkMode })}> 
      <ul className="nav-menu">
        {sections.map((section) => (
          <li key={section.id}>
            <ScrollLink
              activeClass="active"
              to={section.id}
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
              className="dot"
            >
              <span>{section.label}</span>
            </ScrollLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default DotNav;
