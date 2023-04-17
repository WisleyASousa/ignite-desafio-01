import styles from './TasksList.module.css'
import { Trash } from '@phosphor-icons/react';
import { useState } from 'react';


interface TasksListProps {
  id: string; 
  content: string;
  checked: boolean;
  onDeleteTasks: (tasks: string) => void;
  onTaskStatusChange: (id: string, checked: boolean) => void
  onDisable: boolean;
  taskCreatedDate: Date | string;
}

export function TasksList({ id, content, checked, onDeleteTasks,  onTaskStatusChange, onDisable, taskCreatedDate }: TasksListProps) {

  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  function handleCheckTask() {
    onTaskStatusChange(id, !checked);
  }

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
            disabled={onDisable}
            onChange={handleCheckboxClick}
            type='checkbox'
            checked={isChecked}
            onClick={handleCheckTask}
          />
        </label>
      </div>
      <p className={isChecked ? styles.textTasksSucess : styles.textTasks} >
        {content}
      </p>
      <div className={styles.boxOptionTask}>
        {onDisable ? null : <button 
          title='Deletar Tarefa' 
          className={styles.trashSvg} 
          onClick={handleDeleteTasks}
          disabled={!isChecked}
          >
          <Trash size={24} />
        </button>}
        <p>{taskCreatedDate}</p>
      </div>
    </div>
  )
}

