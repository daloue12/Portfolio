import styles from './Experience.module.css'
import SectionTitle from '@components/SectionTitle/SectionTitle'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Item = {
  time: string
  title: string
  meta: string
  desc: string
}

const items: Item[] = [
  {
    time: '2025 — Present',
    title: 'Prudential Group Insurance — Senior Software Engineer',
    meta: 'Salesforce LWR/LWC · React · Mobile App Development',
    desc: 'Built custom LWR sites with Lightning Web Components and embedded React modules for enterprise Supplemental Health mobile application. Developed scalable solutions that increased digital claim submission adoption from 65% to 88% within 12 months. Contributed to modernization of legacy enterprise billing system and Supplemental Health digital intake experience.'
  },
  {
    time: '2024 — 2025',
    title: 'Prudential Group Insurance — Associate Engineer',
    meta: 'Salesforce LWR/LWC· Omnistudio · React',
    desc: 'Productionized several enhancements for enterprise Supplemental Health digital intake experience.'
  },
  {
    time: '2024— 2025',
    title: 'US Army Reserves - Company Commander HHD 390th MP BN',
    meta: 'Leadership · Operations · Training',
    desc: 'Charged with responsiblity for the health, welfare, training, and morale of 60+ soldiers. Responsible for MTOE property valued at over $12 million.'
  },
  {
    time: '2023 — 2024',
    title: 'Prudential Group Insurance — Software Developer Consultant',
    meta: 'Salesforce · Java · Selenium',
    desc: 'Contributed to design and development of new automated regression testing protocal. Productionized several enhancements to overhaul legacy billing system.'
  },
  {
    time: '2022 — 2023',
    title: 'PGIM Fixed Income — Salesforce Developer Consultant',
    meta: 'Salesforce Marketing Cloud/Sales Cloud · Apex · Tableau · Visualforce',
    desc: 'Executed all administrative tasks for Salesforce Marketing Cloud and Sales Cloud. Implemented automated solutions for various Salesforce workflows with special focus on EMEA clientel.'
  },
  {
    time: '2021 — 2022',
    title: 'Genesis 10 - Software Developer Associate',
    meta: 'Java · Cloud · Spring Boot · MySQL',
    desc: 'Chosen for highly selective, paid Dev10 training program - less than 5% of applicants accepted.'
  },
  {
    time: '2018 — 2022',
    title: 'US Army Reserves - Executive Officer 396th MP DET',
    meta: 'Leadership · Operations · Training',
    desc: 'Planned, supervised, and coordinated all operations/mission critical training functions for a unit of 50+ soldiers.'
  }
]

export default function Experience(){
  const lineRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(0)

  useEffect(()=>{
    const line = lineRef.current
    if (!line) return
    gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, transformOrigin: 'top', ease:'power2.out',
      scrollTrigger: { trigger: line, start: 'top 85%', end: 'bottom 20%', scrub: true }
    })

    gsap.utils.toArray(`.${styles.entry}`).forEach((el: any, i) => {
      gsap.fromTo(el, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: .6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 80%' }
      })
    })
  }, [])

  return (
    <section id="experience" className={`section sectionAlt`}>
      <div className="container">
        <SectionTitle>Experience</SectionTitle>
        <div className={styles.timeline}>
          <div className={styles.line} ref={lineRef} aria-hidden="true"></div>
          {items.map((it, idx) => (
            <article key={idx} className={`${styles.entry} ${active === idx ? styles.active : ''}`}>
              <button className={styles.dot} onClick={()=> setActive(idx)} aria-label={`Expand ${it.title}`}></button>
              <div className={styles.card} onClick={()=> setActive(idx)} role="button" tabIndex={0} onKeyDown={(e)=> e.key==='Enter' && setActive(idx)}>
                <div className={styles.header}>
                  <span className={styles.time}>{it.time}</span>
                  <h3 className={styles.title}>{it.title}</h3>
                  <p className={styles.meta}>{it.meta}</p>
                </div>
                <div className={styles.body} hidden={active !== idx}>
                  <p>{it.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
