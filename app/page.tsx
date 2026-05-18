'use client'
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={`${styles.bg_dark} flex flex-col min-h-screen justify-center items-center bg-bg-dark bg-no-repeat bg-contain`}>
      <div>Hello</div>
    </div>
  );
}
