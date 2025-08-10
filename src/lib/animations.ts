import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useHeroIntro(options?: { selector?: string }){
  useEffect(()=>{
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const title = document.querySelector(options?.selector ?? '.heroTitle')
    if (!title) return

    const chars = splitText(title)
    const tl = gsap.timeline({ delay: .15 })
    tl.fromTo('.photoRing', { scale: .8 }, { scale: 1, duration:.8, ease:'expo.out' }, 0)
      .to('.photoRing', { rotateY: 360, duration: 3, ease: 'none' }, 0)
      .to(chars, { y:0, opacity:1, duration:.7, ease:'power3.out', stagger: .02 }, 0.1)
      .from('.heroSub, .heroCtas, .socials', { y: 14, opacity:0, duration:.6, ease:'power2.out', stagger:.06 }, 0.35)

    gsap.to('.heroBg', {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start:'top top', end: 'bottom top', scrub: true }
    })

    return () => { tl.kill() }
  }, [])
}

export function useRevealOnScroll(selector: string){
  useEffect(()=>{
    const els = Array.from(document.querySelectorAll(selector))
    els.forEach(el => {
      gsap.set(el, { opacity: 0, y: 16 })
      ScrollTrigger.create({
        trigger: el as Element,
        start: 'top 80%',
        onEnter: () => gsap.to(el, { opacity:1, y:0, duration:.6, ease:'power2.out' })
      })
    })
    return () => { ScrollTrigger.getAll().forEach(t=>t.kill()) }
  }, [selector])
}

export function splitText(el: Element){
  const text = el.textContent ?? ''
  el.textContent = ''
  const frag = document.createDocumentFragment()
  const spans: HTMLSpanElement[] = []
  for (const ch of text){
    const span = document.createElement('span')
    span.textContent = ch === ' ' ? '\u00A0' : ch // Use non-breaking space for spaces
    span.style.display = 'inline-block'
    span.style.opacity = '0'
    span.style.transform = 'translateY(20px)'
    spans.push(span)
    frag.appendChild(span)
  }
  el.appendChild(frag)
  return spans
}

export function useTilt(selector: string, max = 10){
  useEffect(()=>{
    const el = document.querySelector(selector) as HTMLElement | null
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left)/r.width - .5
      const py = (e.clientY - r.top)/r.height - .5
      el.style.transform = `rotateY(${px*max}deg) rotateX(${ -py*max}deg)`
    }
    const onLeave = () => {
      el.style.transition = 'transform .3s ease'
      el.style.transform = 'rotateY(0) rotateX(0)'
      window.setTimeout(()=> el.style.transition='', 300)
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [selector, max])
}
