import styles from './Tasks.module.css';
import clipboard from '../assets/clipboard.svg'

export function Tasks() {
  return (
      <div className={styles.containerTasks}>
        <div className={styles.infoContainer}>
          <div className={styles.infoTasks}>
            <p>Tarefas criadas</p><span>0</span>
          </div>
          <div className={styles.infoTasks}>
            <p className={styles.tasksCompleted}>Concluídas</p><span>0</span>
          </div>
        </div>
        <div className={styles.boxTasks}>
          <img src={clipboard} alt='Icone de uma caderneta' />
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>

      </div>
    )
}