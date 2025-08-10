import styles from './Footer.module.css'

export default function Footer(){
  return (
    <footer className={styles.footer}>
      <p>© <span>{new Date().getFullYear()}</span> Louis Park. Built with ❤️ & GSAP. Template inspired by vCard (MIT).</p>
    </footer>
  )
}
