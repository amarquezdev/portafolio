import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import classNames from "classnames";
import Style from "./Home.module.scss";
import { info } from "../../info/Info";
import me from "../../img/self.png";

export default function Home({ innerRef }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ["Alejandro", "Desarrollador", "Diseñador"];

  useEffect(() => {
    const currentWord = words[index];

    const timer = setTimeout(() => {
      const updatedText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, index]);

  return (
    <Box
      ref={innerRef}
      component="main"
      className={Style.homeContainer}
      id="home"
    >
      <Box className={Style.cardContainer}>
        {/* Imagen de perfil */}
        <Box
          className={classNames(Style.avatar, Style.shadowed)}
          component="img"
          src={me}
          alt="Foto de perfil"
        />

        {/* Texto y contenido */}
        <Box className={Style.textContent}>
          <h1 className={Style.title}>
            Hola, soy{" "}
            <span className={Style.typewriterContainer}>
              <span className={Style.typewriterText}>{text}</span>
            </span>
          </h1>

          {/* Mini Bio */}
          <Box className={Style.miniBio}>
            {info.miniBio.map((bio, i) => (
              <Box key={i} className={Style.bioItem}>
                <span className={Style.bioEmoji}>{bio.emoji}</span>
                <span>{bio.text}</span>
              </Box>
            ))}
          </Box>

          {/* Redes sociales */}
          <Box className={Style.socials}>
            {info.socials.map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={Style.socialIcon}
              >
                <i className={social.icon} aria-hidden="true" />
              </a>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
