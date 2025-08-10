
import styles from './Projects.module.css'
import SectionTitle from '@components/SectionTitle/SectionTitle'
import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'

type Item = { title:string, desc:string, live?:string, code?:string }
const ITEMS: Item[] = [
  { title: 'Prudential My Benefits Mobile App (IOS/Android)', desc: 'Supplemental Health mobile application. Salesforce LWR + React front‑end.', live: '#', code: '#' },
  { title: 'Salesforce LWR + React Embed', desc: 'Embedded React widget inside LWR site with optimized loading and cross‑framework events.', live: '#', code: '#' },
  { title: 'Mobile Claims UI', desc: 'React Native flows with offline caching and motion-first interactions.', live: '#', code: '#' },
  { title: 'DX Tooling Scripts', desc: 'Developer experience scripts for CI and automated codegen.', live: '#', code: '#' },
  { title: 'Motion Components', desc: 'Reusable animation primitives for enterprise apps.', live: '#', code: '#' },
]

export default function Projects(){
  const [index, setIndex] = useState(0)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const step = 360 / ITEMS.length

  const rotateTo = (i:number) => {
    const angle = -i * step
    setIndex((i % ITEMS.length + ITEMS.length) % ITEMS.length)
    if (ringRef.current){
      gsap.to(ringRef.current, { rotateY: angle, duration:.75, ease:'expo.out' })
    }
  }

  const next = () => rotateTo(index + 1)
  const prev = () => rotateTo(index - 1)

  useEffect(()=>{
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index])

  return (
    <section id="projects" className={`section sectionAlt`}>
      <div className="container">
        <SectionTitle>Projects</SectionTitle>

        <div className={styles.controls}>
          <button className="btn btnGhost" onClick={prev} aria-label="Previous project">‹</button>
          <button className="btn btnGhost" onClick={next} aria-label="Next project">›</button>
        </div>

        <div className={styles.stage}>
          <div className={styles.ring} ref={ringRef} style={{ transform: `translateZ(-380px)` }}>
            {ITEMS.map((p, i) => {
              const angle = i * step
              return (
                <article
                  key={p.title}
                  className={`${styles.card} ${i === index ? styles.active : ''}`}
                  style={{ transform: `rotateY(${angle}deg) translateZ(380px)` }}
                  onClick={()=> rotateTo(i)}
                  tabIndex={0}
                  onKeyDown={(e)=> e.key === 'Enter' && rotateTo(i)}
                  aria-label={`Show project: ${p.title}`}
                >
                  <div className={styles.media} aria-hidden="true">
                    <div className={styles.mediaInner}></div>
                  </div>
                  <div className={styles.body}>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className={styles.actions}>
                      {p.live && <a className="btn btnGhost" href={p.live} target="_blank" rel="noreferrer">Live</a>}
                      {p.code && <a className="btn btnGhost" href={p.code} target="_blank" rel="noreferrer">Code</a>}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
