import Header from '@components/Header/Header'
import BackgroundBrain from '@components/BackgroundBrain/BackgroundBrain'
import Hero from '@components/Hero/Hero'
import About from '@components/About/About'
import Experience from '@components/Experience/Experience'
import Skills from '@components/Skills/Skills'
import Projects from '@components/Projects/Projects'
import Contact from '@components/Contact/Contact'
import Footer from '@components/Footer/Footer'

export default function App(){
  return (
    <>
      <BackgroundBrain />
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
