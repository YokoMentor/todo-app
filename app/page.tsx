'use client'
import React, { useState } from 'react';
import styles from './page.module.css';

export default function Home() {

    const [darkBg, setDarkBg] = useState(true);
    const [lightBg, setLightBg] = useState(false); 
    const [themeSwitch, setThemeSwitch] = useState(true);
    
    function handleThemeSwitcher() {
    if (themeSwitch) {
      setDarkBg(true);
      setLightBg(false);
    } else {
      setDarkBg(false);
      setLightBg(true);
    }
    setThemeSwitch(!themeSwitch);
  }

  return (
    <div className={`${darkBg ? styles.bg_dark : styles.bg_light} flex flex-col min-h-screen justify-center items-center bg-bg-dark bg-no-repeat bg-contain`}>
      <div className='flex flex-col justify-center items-center w-[328px]'>
        <div className='flex justify-between items-baseline w-full'>
          <h1 className='font-bold text-[28px] text-white tracking-[.32em]'>TODO</h1>
          {darkBg && (<button className={`${styles.icon_moon} w-[20px] h-[20px] bg-no-repeat bg-center bg-contain`} onClick={handleThemeSwitcher}></button>)}
          {lightBg && (<button className={`${styles.icon_sun} w-[20px] h-[20px] bg-no-repeat bg-center bg-contain`} onClick={handleThemeSwitcher}></button>)}  
        </div>
      </div>
    </div>
  );
}
