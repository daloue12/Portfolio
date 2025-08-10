import styles from './SectionTitle.module.css'

type Props = { children: React.ReactNode, id?: string, alt?: boolean }
export default function SectionTitle({ children, id, alt }: Props){
  return (
    <h2 id={id} className={`${styles.title} sectionTitle ${alt ? styles.alt : ''}`}>{children}</h2>
  )
}
