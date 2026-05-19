'use client'
import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
    const darkBgStyle = `${styles.bg_dark} flex flex-col min-h-screen justify-center items-center bg-bg-dark bg-no-repeat bg-contain`;
    const lightBgStyle = `${styles.bg_light} flex flex-col min-h-screen justify-center items-center bg-bg-light bg-no-repeat bg-contain`;

    const [darkBg, setDarkBg] = useState(true);
    const [themeSwitch, setThemeSwitch] = useState(true);
    
    function handleThemeSwitcher() {
    if (themeSwitch) {
      setDarkBg(true);
    } else {
      setDarkBg(false);
    }
    setThemeSwitch(!themeSwitch);
  }

  return (
    <div className={`${darkBg ? darkBgStyle : lightBgStyle}`}>
      <div className='flex flex-col justify-center items-center w-[328px]'>
        <div className='flex justify-between items-baseline w-full'>
          <h1 className='font-bold text-[28px] text-white tracking-[.32em]'>TODO</h1>
          <button className={`${darkBg ? styles.icon_moon : styles.icon_sun} w-[20px] h-[20px] bg-no-repeat bg-center bg-contain`} onClick={handleThemeSwitcher}></button>
        </div>
      </div>
    </div>
  );
}
