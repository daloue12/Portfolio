import styles from './Hero.module.css'
import { useHeroIntro } from '@lib/animations'
import me from '../../assets/me.jpg'

export default function Hero(){
  useHeroIntro({ selector: '.heroTitle' })
  return (
    <section id="home" className={styles.home}>
      <div className={`${styles.hero} hero`}>
        <div className={`${styles.heroBg} heroBg`} aria-hidden="true"></div>
        <div className={styles.media}>
          <div className={styles.photoWrap}>
            <div className={`${styles.photoRing} photoRing`}>
              <img src={me} alt="Photo of Louis Park" className={styles.photo} />
            </div>
            <div className={styles.mediaSocials}>
              <a aria-label="LinkedIn" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className={styles.iconLink} title="LinkedIn">
                <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.82-2.2 3.75-2.2 4.01 0 4.75 2.64 4.75 6.07V24h-4v-6.67c0-1.59-.03-3.63-2.21-3.63-2.21 0-2.55 1.73-2.55 3.52V24h-4V8z"/></svg>
              </a>
              <a aria-label="GitHub" href="https://github.com/" target="_blank" rel="noreferrer" className={styles.iconLink} title="GitHub">
                <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true"><path d="M12 .5C5.73.5.9 5.33.9 11.6c0 4.88 3.16 9.02 7.55 10.48.55.1.75-.24.75-.53 0-.26-.01-1.12-.02-2.03-3.07.67-3.72-1.31-3.72-1.31-.5-1.26-1.22-1.6-1.22-1.6-.99-.67.08-.66.08-.66 1.1.08 1.68 1.13 1.68 1.13.98 1.67 2.57 1.19 3.2.9.1-.71.38-1.19.69-1.46-2.45-.28-5.02-1.22-5.02-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.41.11-2.95 0 0 .93-.3 3.05 1.13.89-.25 1.84-.38 2.79-.39.95.01 1.9.14 2.79.39 2.12-1.43 3.05-1.13 3.05-1.13.6 1.54.22 2.67.11 2.95.7.77 1.13 1.75 1.13 2.95 0 4.22-2.58 5.15-5.04 5.42.39.34.74 1.01.74 2.05 0 1.48-.01 2.67-.01 3.03 0 .29.2.64.76.53 4.38-1.47 7.54-5.6 7.54-10.48C23.1 5.33 18.27.5 12 .5z"/></svg>
              </a>
              <a aria-label="Medium" href="https://medium.com/" target="_blank" rel="noreferrer" className={styles.iconLink} title="Medium">
                <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true"><path d="M2 7.2c.02-.32-.09-.64-.3-.88L.36 4.4V4h5.7l4.4 9.6L14.3 4H20v.4l-1.06 1.02c-.09.07-.14.19-.12.3v12.56c-.02.11.03.23.12.3L20 19.6V20h-7.2v-.4l1.16-1.14c.11-.11.11-.14.11-.3V7.4l-4.4 12.2h-.6L4 7.4v8.78c-.03.17.03.35.16.48L6 19.6V20H0v-.4l1.84-1.94c.13-.13.19-.31.16-.48V7.2z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.copy}>
          <h1 className={`heroTitle`}>Full Stack Software Engineer</h1>
          <p className={`heroSub`}>I design, build, and deliver robust full stack web apps with seamless user experiences.</p>
          <div className={`heroCtas ${styles.ctas}`}>
            <a href="#projects" className="btn btnPrimary">View Projects</a>
            <a href="#contact" className="btn btnGhost">Contact</a>
          </div>
        </div>
      </div>
    </section>
  )
}
