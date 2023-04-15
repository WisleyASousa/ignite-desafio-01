import styles from './TasksList.module.css'
import { Trash } from '@phosphor-icons/react';
import { useState } from 'react';

interface TasksListProps {
  content: string;
  checked?: boolean;

}

export function TasksList({ content, checked, ...props }: TasksListProps) {

  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  function handleCheckboxClick() {
    setIsChecked(!isChecked);
  }

  return (
    <div className={styles.containerList}>
      <div className={styles.checkboxWrapper}>
        <label>
          <input
            onChange={handleCheckboxClick}
            type='checkbox'
            checked={isChecked}
            {...props}
          />
        </label>
      </div>
      <p className={isChecked ? styles.textTasksSucess : styles.textTasks} >{content}</p>
      <Trash className={styles.trashSvg} size={24} />
    </div>
  )
}

