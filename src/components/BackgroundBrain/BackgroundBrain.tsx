
import { useEffect, useRef } from 'react'
import styles from './BackgroundBrain.module.css'

export default function BackgroundBrain(){
  const ref = useRef<HTMLCanvasElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(()=>{
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!

    // Clamp DPR to reduce overdraw on HiDPI displays
    const DPR = Math.min(window.devicePixelRatio || 1, 1.25)

    function resize(){
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = Math.floor(w * DPR)
      canvas.height = Math.floor(h * DPR)
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    const ro = new ResizeObserver(resize); ro.observe(canvas)
    resize()

    type Node = { x:number, y:number, vx:number, vy:number }
    let nodes: Node[] = []
    let linkDist = 90
    let speed = 0.12

    function inBrain(x:number, y:number, w:number, h:number){
      const cx = w/2, cy = h*0.42
      const r = Math.min(w, h)*0.22
      const left = { x: cx - r*0.9, y: cy }
      const right = { x: cx + r*0.9, y: cy }
      const dl = Math.hypot(x-left.x, y-left.y)
      const dr = Math.hypot(x-right.x, y-right.y)
      const hemis = (dl < r) || (dr < r)
      const stem = (x > cx - r*0.3 && x < cx + r*0.3 && y > cy + r*0.9 && y < cy + r*1.5)
      return hemis || stem
    }

    function seed(maxNodes:number){
      nodes = []
      const { width:w, height:h } = canvas
      for (let i=0;i<maxNodes;i++){
        let x=0, y=0, tries=0
        do{ x = Math.random()*w; y = Math.random()*h; tries++ } while(!inBrain(x, y, w, h) && tries < 500)
        const a = Math.random()*Math.PI*2
        nodes.push({ x, y, vx: Math.cos(a)*speed, vy: Math.sin(a)*speed })
      }
    }

    // Adaptive node count based on screen area
    const area = canvas.clientWidth * canvas.clientHeight
    const base = area > 1_000_000 ? 90 : area > 500_000 ? 70 : 55
    seed(base)

    let raf = 0
    let last = performance.now()
    const frameInterval = 1000/45 // ~45fps cap

    // Spatial hashing to avoid O(n^2) links
    const neighborsLimit = 4
    function tick(now:number){
      raf = requestAnimationFrame(tick)
      if (now - last < frameInterval) return
      last = now

      const { width:w, height:h } = canvas
      ctx.clearRect(0,0,w,h)

      // Update nodes
      for (let i=0;i<nodes.length;i++){
        const n = nodes[i]
        n.x += n.vx; n.y += n.vy
        if (!inBrain(n.x, n.y, w, h)){
          n.vx *= -1; n.vy *= -1
          n.x += n.vx*2; n.y += n.vy*2
        }
      }

      // Build grid
      const cell = linkDist
      const cols = Math.ceil(w / cell)
      const rows = Math.ceil(h / cell)
      const grid: number[][] = Array(cols*rows).fill(0).map(()=>[])
      const idx = (x:number,y:number)=> x + y*cols

      for (let i=0;i<nodes.length;i++){
        const c = Math.max(0, Math.min(cols-1, Math.floor(nodes[i].x / cell)))
        const r = Math.max(0, Math.min(rows-1, Math.floor(nodes[i].y / cell)))
        grid[idx(c,r)].push(i)
      }

      // Draw links using local neighborhood only
      ctx.lineWidth = 1
      for (let r=0;r<rows;r++){
        for (let c=0;c<cols;c++){
          const bucket = [
            ...grid[idx(c,r)],
            ...(c>0 ? grid[idx(c-1,r)] : []),
            ...(r>0 ? grid[idx(c,r-1)] : []),
            ...(c<cols-1 ? grid[idx(c+1,r)] : []),
            ...(r<rows-1 ? grid[idx(c,r+1)] : []),
            ...(c>0 && r>0 ? grid[idx(c-1,r-1)] : []),
            ...(c<cols-1 && r>0 ? grid[idx(c+1,r-1)] : []),
            ...(c>0 && r<rows-1 ? grid[idx(c-1,r+1)] : []),
            ...(c<cols-1 && r<rows-1 ? grid[idx(c+1,r+1)] : []),
          ]
          for (let bi=0;bi<bucket.length;bi++){
            const i = bucket[bi]
            const a = nodes[i]
            // find up to k nearest in bucket
            let near: {j:number, d:number}[] = []
            for (let bj=bi+1; bj<bucket.length; bj++){
              const j = bucket[bj]
              const b = nodes[j]
              const dx = a.x - b.x, dy = a.y - b.y
              const d = Math.hypot(dx, dy)
              if (d < linkDist){
                near.push({ j, d })
              }
            }
            near.sort((A,B)=>A.d-B.d)
            near = near.slice(0, neighborsLimit)
            for (const nbh of near){
              const alpha = 1 - (nbh.d / linkDist)
              ctx.strokeStyle = `rgba(110,231,255,${alpha*0.22})`
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(nodes[nbh.j].x, nodes[nbh.j].y)
              ctx.stroke()
            }
          }
        }
      }

      // Draw nodes (no blur filter for perf)
      ctx.fillStyle = 'rgba(139,92,246,.8)'
      for (const n of nodes){
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.1, 0, Math.PI*2)
        ctx.fill()
      }
    }
    raf = requestAnimationFrame(tick)

    // Pause when tab is hidden
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else { last = performance.now(); raf = requestAnimationFrame(tick) }
    }
    document.addEventListener('visibilitychange', onVis)

    return () => { cancelAnimationFrame(raf); ro.disconnect(); document.removeEventListener('visibilitychange', onVis) }
  }, [])
    // Fade out on scroll (over first ~120vh)
    useEffect(()=>{
      const el = wrapperRef.current
      if (!el) return
      let ticking = false
      const onScroll = () => {
        if (ticking) return
        ticking = true
        requestAnimationFrame(()=>{
          const y = window.scrollY
          const h = window.innerHeight
          const p = Math.max(0, 1 - y / (h * 1.2)) // 0..1
          el.style.opacity = String(p)
          ticking = false
        })
      }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }, [])
    

  return (
    <div className={styles.wrap} ref={wrapperRef} aria-hidden="true">
      <canvas ref={ref} className={styles.canvas} />
    </div>
  )
}
