import React from 'react';
import { Sun, Moon } from 'lucide-react';
import './Toggler.css';

export default function Toggler({ darkMode, handleClick }) {
   return (
      <button className="toggler" onClick={handleClick} aria-label="Toggle Dark Mode">
         {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
   );
}