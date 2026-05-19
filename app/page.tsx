'use client'
import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
    const darkBgStyle = `${styles.bg_dark} flex flex-col min-h-screen justify-center items-center bg-bg-dark bg-no-repeat bg-contain`;
    const lightBgStyle = `${styles.bg_light} flex flex-col min-h-screen justify-center items-center bg-bg-light bg-no-repeat bg-contain`;

    const [darkTheme, setDarkTheme] = useState(true);
    const [themeSwitch, setThemeSwitch] = useState(true);
    
    function handleThemeSwitcher() {
    if (themeSwitch) {
      setDarkTheme(true);
    } else {
      setDarkTheme(false);
    }
    setThemeSwitch(!themeSwitch);
  }

  return (
    <div className={`${darkTheme ? darkBgStyle : lightBgStyle}`}>
      <div className='flex flex-col justify-center items-center w-[328px]'>
        <div className='flex justify-between items-baseline w-full mb-6'>
          <h1 className='font-bold text-[28px] text-white tracking-[.32em]'>TODO</h1>
          <button className={`${darkTheme ? styles.icon_moon : styles.icon_sun} w-[20px] h-[20px] bg-no-repeat bg-center bg-contain`} onClick={handleThemeSwitcher}></button>
        </div>
        <div className='flex items-center w-full bg-bg-container rounded-md h-[48px] mb-4'>
          <div className='border border-disabled rounded-full w-[20px] h-[20px] ml-5 mr-3'></div>
          <input type='text' placeholder='Create a new todo...' className='text-text-dark text-xs focus:outline-none focus:text-hover'/>
        </div>
        <div className='divide-solid divide-disabled divide-y-1 w-full rounded-md overflow-hidden text-xs text-hover'>
          <label htmlFor="item1" className='flex items-center w-full bg-bg-container h-[48px] has-checked:line-through has-checked:text-disabled cursor-pointer'>
            <div className='relative flex items-center justify-center'>
              <input type="checkbox" name="action" id="item1" className="peer w-[20px] h-[20px] ml-5 mr-3 rounded-full appearance-none border border-disabled cursor-pointer" />
              <span className={`${styles.icon_check} bg-center absolute w-[20px] h-[20px] ml-5 mr-3 rounded-full opacity-0 peer-checked:opacity-100`}></span>
            </div>
            Jog around the block 3x
          </label>
          <label htmlFor="item2" className='flex items-center w-full bg-bg-container h-[48px] has-checked:line-through has-checked:text-disabled cursor-pointer'>
            <div className='relative flex items-center justify-center'>
              <input type="checkbox" name="action" id="item2" className="peer w-[20px] h-[20px] ml-5 mr-3 rounded-full appearance-none border border-disabled cursor-pointer" />
              <span className={`${styles.icon_check} bg-center absolute w-[20px] h-[20px] ml-5 mr-3 rounded-full opacity-0 peer-checked:opacity-100`}></span>
            </div>
            Jog around the block 3x
          </label>
          <label htmlFor="item3" className='flex items-center w-full bg-bg-container h-[48px] has-checked:line-through has-checked:text-disabled cursor-pointer'>
            <div className='relative flex items-center justify-center'>
              <input type="checkbox" name="action" id="item3" className="peer w-[20px] h-[20px] ml-5 mr-3 rounded-full appearance-none border border-disabled cursor-pointer" />
              <span className={`${styles.icon_check} bg-center absolute w-[20px] h-[20px] ml-5 mr-3 rounded-full opacity-0 peer-checked:opacity-100`}></span>
            </div>
            Jog around the block 3x
          </label>
        </div>
      </div>
    </div>
  );
}
