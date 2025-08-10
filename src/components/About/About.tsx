import styles from './About.module.css'
import SectionTitle from '@components/SectionTitle/SectionTitle'
import { useRevealOnScroll } from '@lib/animations'

export default function About(){
  useRevealOnScroll(`.${styles.lead}, .${styles.item}`)
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionTitle>About</SectionTitle>
        <p className={styles.lead}>I’m a full-stack web developer originally from Aurora, Colorado who turns complex requirements into simple, performant experiences.
          As a U.S. Army officer, I’ve led and mentored high impact teams for strategic advancement.
          Based in the Greater NYC area, I thrive in bridging the gaps between product, design, engineering, and leadership development to ship scalable systems.
        </p>
        <ul className={styles.list}>
          <li className={styles.item}><strong>Current role:</strong> Full‑Stack Software Engineer @ Prudential</li>
          <li className={styles.item}><strong>Stack:</strong> Salesforce Development, HTML/CSS/Javascript, React, Angular, Java, Node.js, AWS, MySQL, MongoDB</li>
          <li className={styles.item}><strong>Interests:</strong> AI/ML, DX tooling, 3D UX</li>
        </ul>
      </div>
    </section>
  )
}
