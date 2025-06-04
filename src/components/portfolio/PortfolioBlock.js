import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Chip, Stack, Collapse } from '@mui/material';
import { FaGithub, FaLink } from 'react-icons/fa';

export default function PortfolioBlock({ image, live, source, title, description, technologies }) {
   const [expanded, setExpanded] = useState(false);
   const theme = useTheme();
   const isDarkMode = theme.palette.mode === 'dark';

   const handleToggle = () => setExpanded(!expanded);

   return (
      <Box
         onClick={handleToggle}
         sx={{
            maxWidth: 320,
            mx: 'auto',
            borderRadius: 2,
            boxShadow: 4,
            overflow: 'hidden',
            bgcolor: 'background.paper',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            '&:hover': {
               transform: 'translateY(-4px)',
            },
         }}
      >
         <Box
            component="img"
            src={image}
            alt={title}
            sx={{
               width: '100%',
               height: '180px',
               objectFit: 'cover',
            }}
         />

         <Box px={3} py={2}>
            <Typography
               variant="h6"
               fontWeight="bold"
               textAlign="left"
               color="text.primary"
            >
               {title}
            </Typography>
         </Box>

         <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box px={3} pb={3}>
               <Typography
                  variant="body2"
                  mb={2}
                  textAlign="left"
                  color="text.secondary"
               >
                  {description}
               </Typography>

               <Typography variant="subtitle2" fontWeight="bold" mb={1} textAlign="left">
                  Tecnologías:
               </Typography>
               <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                  {technologies.map((tech, index) => (
                     <Chip key={index} label={tech} size="small" variant="outlined" />
                  ))}
               </Stack>

               <Stack direction="row" spacing={2} mt={4}>
                  <Box
                     component="a"
                     href={live}
                     target="_blank"
                     rel="noopener noreferrer"
                     display="flex"
                     alignItems="center"
                     gap={1}
                     sx={{
                        color: isDarkMode ? 'primary.light' : 'primary.main',
                        textDecoration: 'none',
                        fontWeight: 500,
                        fontSize: '.75rem',
                        '& svg': { fontSize: '1rem' },
                     }}
                  >
                     <FaLink /> Live Preview
                  </Box>
                  <Box
                     component="a"
                     href={source}
                     target="_blank"
                     rel="noopener noreferrer"
                     display="flex"
                     alignItems="center"
                     gap={1}
                     sx={{
                        color: isDarkMode ? 'grey.300' : 'text.secondary',
                        textDecoration: 'none',
                        fontWeight: 500,
                        fontSize: '.75rem',
                        '& svg': { fontSize: '1rem' },
                     }}
                  >
                     <FaGithub /> Ver código
                  </Box>
               </Stack>
            </Box>
         </Collapse>
      </Box>
   );
}
