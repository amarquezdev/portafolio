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
      emoji: "💻 ",
      text: "Técnico en Desarrollo web",
    },
    {
      emoji: "🌎",
      text: "Chile, Santiago",
    },
    {
      emoji: "💼",
      text: "Systems Engineer at Google",
    },
  ],
  socials: [
    {
      link: "https://facebook.com",
      icon: "fa fa-facebook",
      label: "facebook",
    },
    {
      link: "https://instagram.com",
      icon: "fa fa-instagram",
      label: "instagram",
    },
    {
      link: "https://github.com",
      icon: "fa fa-github",
      label: "github",
    },
    {
      link: "https://linkedin.com",
      icon: "fa fa-linkedin",
      label: "linkedin",
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
        "A cool project demonstrating React, TailwindCSS and API integration.",
      techstack: ["React", "Figma", "API"],
    },
    {
      title: "GlobalMarket",
      live: "#",
      source: "#",
      image: mock2,
      description:
        "A responsive landing page built with modern CSS techniques.",
      techstack: ["Jquery", "Mysql", "Php"],
    },
    {
      title: "SpotifyVR",
      live: "#",
      source: "#",
      image: mock3,
      description:
        "E-commerce site prototype with shopping cart and payment integration.",
      techstack: ["Wordpress", "Bootstrap", "Stripe API"],
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
};
