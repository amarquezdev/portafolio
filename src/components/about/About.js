import React from 'react';
import Style from './About.module.scss';
import Terminal from "./Terminal";
import {Box} from "@mui/material";
import {info} from "../../info/Info";


export default function About({innerRef}) {
    const firstName = info.firstName.toLowerCase()

   function aboutMeText() {
    return (
        <>
            <p>
                <span style={{ color: info.baseColor }}>
                    ~/portafolio
                </span>
                &nbsp;❯ cd alejandro-marquez-bio
            </p>

            <p>
                <span style={{ color: info.baseColor }}>
                    alejandro-marquez
                </span>
                &nbsp;❯ npm start
            </p>

            <p>🚀<span style={{ color: info.baseColor }}>
                    Compiled successfully!
                </span></p>
            <p>🧑‍💻 {info.bio}</p>
        </>
    );
}

    return (
        <Box ref={innerRef} display={'flex'} flexDirection={'column'} alignItems={'center'} mt={'3rem'} id={'about'}   >
            <Terminal text={aboutMeText()}/>
        </Box>
    )
}