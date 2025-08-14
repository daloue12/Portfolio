import styles from './Skills.module.css'
import SectionTitle from '@components/SectionTitle/SectionTitle'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DATA = [
  ['Salesforce Development', 95],
  ['HTML / CSS / Javascript', 95],
  ['Cloud', 75],
  ['Java', 75],
  ['API Development', 80],
  ['Database Management', 80],
  ['DevOps', 68],
  ['Leadership Development', 96]
] as const

export default function Skills(){
  useEffect(()=>{
    gsap.utils.toArray(`.${styles.fill}`).forEach((el:any) => {
      const pct = Number(el.getAttribute('data-pct')) || 0
      gsap.fromTo(el, { width: '0%' }, {
        width: `${pct}%`,
        duration: .9, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%' }
      })
    })
  }, [])

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionTitle>Skills</SectionTitle>
        <div className={styles.table} role="table" aria-label="Skills proficiency">
          <div className={`${styles.row} ${styles.head}`} role="row">
            <div className={`${styles.cell} ${styles.skill}`} role="columnheader">Skill</div>
            <div className={`${styles.cell} ${styles.scale}`} role="columnheader">Proficiency</div>
          </div>
          {DATA.map(([name, pct]) => (
            <div className={styles.row} role="row" key={name}>
              <div className={`${styles.cell} ${styles.skill}`} role="cell">{name}</div>
              <div className={`${styles.cell} ${styles.scale}`} role="cell">
                <div className={styles.track} aria-hidden="true">
                  <div className={styles.fill} style={{width:`${pct}%`}} data-pct={pct}></div>
                </div>
                <span className={styles.percent} aria-label={`${pct} percent`}>{pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
