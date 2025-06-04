import React, { useEffect, useState } from 'react';
import Style from './BaseLayout.module.scss';
import Navbar from './Navbar';
import DotNav from './dotnav/DotNav';
import { Box, Grid, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import About from './about/About';
import Home from './home/Home';
import Portfolio from './portfolio/Portfolio';
import TagCloud from './TagCloud';
import Footer from './footer/Footer';
import useScrollObserver from '../hooks/useScrollObserver';
import Toggler from './home/Toggler';

export default function BaseLayout() {
   const [active, setActive] = useState('home');
   const refHome = useScrollObserver(setActive);
   const refAbout = useScrollObserver(setActive);
   const refTagCloud = useScrollObserver(setActive);
   const refPortfolio = useScrollObserver(setActive);
   const refFooter = useScrollObserver(setActive);
   const [darkMode, setDarkMode] = useState(false);

   function handleToggleDarkMode() {
      const opposite = !darkMode;
      localStorage.setItem('darkMode', JSON.stringify(opposite));
      setDarkMode(opposite);
   }

   useEffect(() => {
     const stored = JSON.parse(localStorage.getItem('darkMode'));
     setDarkMode(stored || false);
   }, []);

   useEffect(() => {
     if (darkMode) {
       document.body.classList.add('dark');
     } else {
       document.body.classList.remove('dark');
     }
   }, [darkMode]);

   // THEME CONFIG
   const lightTheme = createTheme({
      palette: {
         mode: 'light',
         primary: {
            main: '#1976d2',
         },
         background: {
            default: '#f5f5f5',
            paper: '#ffffff',
         },
      },
   });

   const darkTheme = createTheme({
      palette: {
         mode: 'dark',
         primary: {
            main: '#90caf9',
         },
         background: {
            default: '#121212',
            paper: '#1e1e1e',
         },
      },
   });

   return (
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
         <CssBaseline />
         <Box
            className={darkMode ? Style.dark : Style.light}
            sx={{
              overflowX: 'hidden',  // evita scroll horizontal
              // padding horizontal removido para evitar que todo se corra
            }}
         >
            <Toggler darkMode={darkMode} handleClick={handleToggleDarkMode} />
            <DotNav darkMode={darkMode} />
            <Grid container direction="column" minHeight="100vh" justifyContent="space-between">
               <Grid item>
                  <Navbar
                     darkMode={darkMode}
                     handleClick={handleToggleDarkMode}
                     active={active}
                     setActive={setActive}
                  />
               </Grid>
               <Grid item flexGrow={1}>
                  <main>
                     <section id="home" ref={refHome}>
                        <Home />
                     </section>
                     <section id="about" ref={refAbout} className={Style.aboutSection}>
                        <div className={Style.aboutText}>
                           <About />
                        </div>
                        <div className={Style.tagCloud}>
                           <TagCloud />
                        </div>
                     </section>
                     <section id="portfolio" ref={refPortfolio}>
                        <Portfolio />
                     </section>
                  </main>
               </Grid>
               <Grid item>
                  <Box component="footer">
                     <section id="footer"  ref={refFooter}>
                        <Footer />
                     </section>
                  </Box>
               </Grid>
            </Grid>
         </Box>
      </ThemeProvider>
   );
}
