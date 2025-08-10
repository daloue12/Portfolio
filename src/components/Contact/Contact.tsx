import styles from './Contact.module.css'
import SectionTitle from '@components/SectionTitle/SectionTitle'
import { useRevealOnScroll } from '@lib/animations'

const MAP_SRC = 'https://www.google.com/maps?q=Aurora,+Colorado&output=embed'

export default function Contact(){
  useRevealOnScroll(`.${styles.form}`)
  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionTitle>Contact</SectionTitle>
        <div className={styles.grid}>
          <form className={styles.form} action="https://formspree.io/f/xayz" method="POST">
            <div className={styles.row}>
              <label> Name
                <input type="text" name="name" placeholder="Your name" required />
              </label>
              <label> Email
                <input type="email" name="email" placeholder="you@example.com" required />
              </label>
            </div>
            <label> Message
              <textarea name="message" rows={5} placeholder="Tell me about your project…"></textarea>
            </label>
            <button className="btn btnPrimary" type="submit">Send</button>
          </form>

          <div className={styles.mapWrap}>
            <iframe
              className={styles.map}
              title="Map to 22181 E Jamison Pl Aurora, CO 80016"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
