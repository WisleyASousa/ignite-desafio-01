import styles from './TasksList.module.css'
import { Trash } from '@phosphor-icons/react';
import { useState } from 'react';

interface TasksListProps {
  id: string; 
  content: string;
  checked: boolean;
  onDeleteTasks: (tasks: string) => void;
}

export function TasksList({ id, content, checked, onDeleteTasks }: TasksListProps) {

  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  function handleCheckboxClick() {
    setIsChecked(!isChecked);
  }
  function handleDeleteTasks() {
    onDeleteTasks(id);
  }

  return (
    <div className={styles.containerList}>
      <div className={styles.checkboxWrapper}>
        <label>
          <input
            onChange={handleCheckboxClick}
            type='checkbox'
            checked={isChecked}
          />
        </label>
      </div>
      <p className={isChecked ? styles.textTasksSucess : styles.textTasks} >{content}</p>
      <button 
        title='Deletar Tarefa' 
        className={styles.trashSvg} 
        onClick={handleDeleteTasks}
      >
        <Trash size={24} />
      </button>
    </div>
  )
}

