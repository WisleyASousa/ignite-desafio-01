import styles from './Header.module.css';
import icon from '../assets/rocket.svg'


export function Header() {
  return (
      <header className={styles.headerContainer}>
        <img src={icon} alt='icone de Fogete' />
        <h1>Li<span>Wis</span> to<span>do</span></h1>
      </header>
    )
}