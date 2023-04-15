import styles from './NewItem.module.css'
import { PlusCircle } from '@phosphor-icons/react'

export function NewItem() {
  return (
    <div className={styles.containerForm}>
      <form className={styles.itemForm}>
        <textarea 
          className={styles.boxText}
          placeholder='Nova tarefa'
          name='newItem'
          />
        <button>
          Criar
          <PlusCircle size={18} />
        </button>
      </form>
    </div>
    )
}