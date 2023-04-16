import { Copyright } from "@phosphor-icons/react";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>2023<Copyright size={18} />
        Desenvolvido por Wisley A. Sousa <br /> Projeto Desafio 1 do Ignite Rocketseat.</p>
    </footer>
  )
}