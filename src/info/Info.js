import self from "../img/self.png";
import mock1 from "../img/pic1.png";
import mock2 from "../img/pic2.png";
import mock3 from "../img/pic3.png";
import mock4 from "../img/pic4.png";
import mock5 from "../img/pic5.png";

export let colors = ["rgb(255, 0, 234)", "rgb(255, 94, 0)"];

export let singlePage = false;

export const info = {
  firstName: "Alejandro",
  lastName: "Marquez",
  fullname: "Alejandro Marquez",
  initials: "am",
  selfPortrait: self,
  gradient: `-webkit-linear-gradient(135deg, ${colors})`,
  baseColor: colors[0],
  miniBio: [
    {
      emoji: "🌎",
      text: "Chile",
    },
    {
      emoji: "💻 ",
      text: "Técnico en Desarrollo web",
    },
    {
      emoji: "💼",
      text: "Diseño y maquetación de sitios web",
    },
  ],
  socials: [
  
    {
      link: "https://www.linkedin.com/in/amarquezmiranda/",
      icon: "fa fa-linkedin",
      label: "Linkedin",
    },
    {
      link: "https://github.com/amarquezdev",
      icon: "fa fa-github",
      label: "Github",
    },
    {
      link: "https://www.behance.net/amarquezdev",
      icon: "fa fa-behance",
      label: "Behance",
    },
  ],
  bio: "Hola! Soy Alejandro, desarrollador curioso que disfruta crear soluciones con código y siempre en busca de aprender algo nuevo.",

  portfolio: [
    {
      title: "Studio CM",
      live: "#",
      source: "#",
      image: mock1,
      description:
        "Sitio de salón creado con React, GSAP, Figma, HTML, CSS y Grid.",
      techstack: ["React", "Figma", "Grid"],
    },
    {
      title: "GlobalMarket",
      live: "#",
      source: "#",
      image: mock2,
      description:
        "Sitio web en PHP con API y globo 3D para explorar y comprar por país.",
      techstack: ["Jquery", "Mysql", "Php"],
    },
    {
      title: "SpotifyVR",
      live: "#",
      source: "#",
      image: mock3,
      description:
        "Sitio tipo Spotify con VR e IA, desarrollado con React, API y Figma.",
      techstack: ["API", "React", "Figma"],
    },
    
    /* {
      title: "Project 4",
      live: "https://paytonpierce.dev",
      source: "https://github.com/paytonjewell",
      image: pic4,
      description: "Portfolio website with animations and dark mode support.",
      techstack: ["React", "Framer Motion", "TailwindCSS"],
    },
    {
      title: "Project 5",
      live: "https://paytonpierce.dev",
      source: "https://github.com/paytonjewell",
      image: pic5,
      description: "Blog platform with markdown support and user authentication.",
      techstack: ["Next.js", "Markdown", "Firebase Auth"],
    },*/
  ],

  footerLinks: [
    {
      link: "mailto:al.marquezmiranda@gmail.com",
      icon: "fa fa-envelope",
      label: "Email",
    },
    {
      link: "https://www.linkedin.com/in/amarquezmiranda/",
      icon: "fa fa-linkedin",
      label: "LinkedIn",
    },
    {
      link: "/AlejandroMarquez.pdf",
      icon: "fa fa-file",
      label: "Resume",
    },
  ],
};
