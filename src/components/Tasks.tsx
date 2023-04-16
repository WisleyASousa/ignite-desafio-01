import styles from './Tasks.module.css';
import clipboard from '../assets/clipboard.svg'
import { TasksList } from './TasksList';
import { v4 as uuidv4 } from 'uuid';
import { ChangeEvent, FormEvent, useState } from 'react';
// import { NewItem } from './NewItem';
import { PlusCircle } from '@phosphor-icons/react'


const tasksList = [
  {
    id: uuidv4(),
    content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus, tempora.',
    status: false
  },
  {
    id: uuidv4(),
    content: 'Lorem ipsum tetur adipisicing elit. Possimus, tempora.',
    status: false
  },
  {
    id: uuidv4(),
    content: 'Lorem icing elit. Possimus, tempora.',
    status: true
  },
  {
    id: uuidv4(),
    content: ' consectetur adipisicing elit. Possimus, tempora.',
    status: false
  },
  {
    id: uuidv4(),
    content: 'Lorem ipsum dolor sit, amet ccing elit. Possimus, tempora.',
    status: false
  }
]



export function Tasks() {

  const [tasks, setTasks] = useState(tasksList);
  const [newTaskText, setNewTaskText] = useState('')


  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTasks([{id:uuidv4(), content:newTaskText, status: false}, ...tasks]);
    setNewTaskText('');
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event?.target.setCustomValidity('');
    setNewTaskText(event?.target?.value);
  }

  function handleNewTaskInvalid(event: ChangeEvent<HTMLTextAreaElement>) {
    event?.target.setCustomValidity('Campo Obrigatório');
  }

  function deleteTasks(tasksToDelete: string) {
    const tasksWithoutDeleteOne = tasks.filter(tasks => {
      return tasks.id !== tasksToDelete
    })
    
    setTasks(tasksWithoutDeleteOne);
  }

  const isNewTaskEmpty = newTaskText.length == 0;
  
  return (
      <div className={styles.containerTasks}>
        <div className={styles.containerForm}>
          <form onSubmit={handleCreateNewTask} className={styles.itemForm}>
            <textarea
              className={styles.boxText}
              placeholder='Nova tarefa'
              name='contentText'
              value={newTaskText}
              onChange={handleNewTaskChange}
              onInvalid={handleNewTaskInvalid}
              required
            />
            <button 
              disabled={isNewTaskEmpty} 
              type='submit'>
              Criar
              <PlusCircle size={18} />
            </button>
          </form>
        </div>
        <div className={styles.containerTasksCreated}>

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

          {tasks.map(task => {
            return (
              <TasksList
                key={task.id}
                id={task.id}
                checked={task.status}
                content={task.content}
                onDeleteTasks={deleteTasks}
              />
            )
          })}
        </div>
      </div>
    )
}