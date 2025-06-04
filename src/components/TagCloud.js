import React from 'react';
import { Cloud, renderSimpleIcon } from 'react-icon-cloud';
import {
  siReact,
  siHtml5,
  siCss3,
  siWordpress,
  siMysql,
  siJavascript,
  siFigma,
  siGithub,
  siBootstrap,
  siTypescript,
  siPhp,
} from 'simple-icons/icons';

const icons = [
  siReact,
  siHtml5,
  siCss3,
  siWordpress,
  siMysql,
  siJavascript,
  siFigma,
  siGithub,
  siBootstrap,
  siTypescript,
  siPhp,
].map((icon) =>
  renderSimpleIcon({
    icon,
    size: 110,
    title: icon.title,
    a11yTitleOnly: true,
    style: { cursor: 'default' }, 
  })
);

const IconCloud = () => {
  return (
    <Cloud
      containerProps={{
        style: { width: '100%', height: '400px' },
      }}
      options={{
        clickToFront: 500,
        initial: [0.05, -0.05], 
        reverse: true,
        depth: 1.0,
        wheelZoom: false,
        dragControl: false, 
        mouseControl: true, 
        tooltip: 'native', 
      }}
    >
      {icons}
    </Cloud>
  );
};

export default IconCloud;
