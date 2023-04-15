import styles from './Tasks.module.css';

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

        </div>

      </div>
    )
}