import { useState } from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  label: string;
  checked?: boolean;
}

export function Checkbox({ label, checked, ...props }:CheckboxProps) {
  const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  function handleCheckboxClick() {
    setIsChecked(!isChecked);
  }

  return (
    <div className={styles.checkboxWrapper}>
      <label>
        <input 
          onChange={handleCheckboxClick}
          type='checkbox' 
          checked={isChecked} 
          {...props}
        />
        <span>{label}</span>
      </label>
      <p>{isChecked ? "Selected" : "Unchecked"}</p>
    </div>
  );
}
