import styles from './Header.module.css'

export default function Header(){
  const toggle = () => {
    const nav = document.querySelector('nav')
    const open = nav?.getAttribute('data-open') === 'true'
    nav?.setAttribute('data-open', String(!open))
  }

  return (
    <header className={styles.header}>
      <a className={styles.brand} href="#home"><span>LP</span></a>
      <button className={styles.navToggle} aria-label="Toggle navigation" onClick={toggle}>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </button>
      <nav className={styles.nav} data-open="false">
        <a href="#home" className={styles.link}>Home</a>
        <a href="#about" className={styles.link}>About</a>
        <a href="#experience" className={styles.link}>Experience</a>
        <a href="#skills" className={styles.link}>Skills</a>
        <a href="#projects" className={styles.link}>Projects</a>
        <a href="#contact" className={styles.link}>Contact</a>
      </nav>
    </header>
  )
}
