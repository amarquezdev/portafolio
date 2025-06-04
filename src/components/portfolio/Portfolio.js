import React from 'react';
import PortfolioBlock from "./PortfolioBlock";
import { Box, Grid, Container } from "@mui/material";
import { info } from "../../info/Info";

export default function Portfolio({ innerRef }) {
   return (
      <Box id="portfolio" ref={innerRef} py={8}>
         <Container maxWidth="lg">
            <Grid container spacing={6} justifyContent="center">
               {info.portfolio.map((project, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                     <PortfolioBlock
                        image={project.image}
                        live={project.live}
                        source={project.source}
                        title={project.title}
                        description={project.description}
                        technologies={project.techstack}
                     />
                  </Grid>
               ))}
            </Grid>
         </Container>
      </Box>
   );
}
