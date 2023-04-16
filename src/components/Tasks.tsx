import styles from './Tasks.module.css';
import clipboard from '../assets/clipboard.svg'
import { TasksList } from './TasksList';
import { v4 as uuidv4 } from 'uuid';
import { ChangeEvent, FormEvent, useState } from 'react';
import { PlusCircle } from '@phosphor-icons/react'

interface TasksType {
  id: string,
  content: string,
  status: boolean
}

export function Tasks({ id, content, status }:TasksType) {

  const [tasks, setTasks] = useState<TasksType[]>([]);

  const [tasksCreated, setTasksCreated] = useState(0);

  const [tasksCompleted, setTasksCompleted] = useState(0);

  const [tasksDeleted, setTasksDeleted] = useState(0);

  const [newTaskText, setNewTaskText] = useState('');

  const [trashTasks, setTrashTasks] = useState<TasksType[]>([]);


  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTasks([{id:uuidv4(), content:newTaskText, status: false}, ...tasks]);
    setNewTaskText('');
    setTasksCreated(tasksCreated + 1);
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

    setTrashTasks([...trashTasks, tasks.find(task => task.id === tasksToDelete)!]);
    
    setTasks(tasksWithoutDeleteOne);
    setTasksDeleted(tasksDeleted + 1);

    if (tasksCompleted > 0 ) {
      setTasksCompleted(tasksCompleted - 1);
    }
  }

  function handleTaskStatusChange(id: string, checked: boolean) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.status = checked;
      }
      return task;
    });
    const completedTasks = updatedTasks.filter(task => task.status).length;
    setTasks(updatedTasks);
    setTasksCompleted(completedTasks);
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
              <p>Tarefas criadas</p>
              <span>{tasksCreated}</span>
            </div>

            <div className={styles.infoTasks}>
              <p className={styles.tasksCompleted}>Concluídas</p>
              <span className={styles.spanCompleted}>{`${tasksCompleted} de ${tasks.length}`}</span>
            </div>
            
          </div>
          {tasks.length === 0 && (
            <div className={styles.boxTasks}>
              <img src={clipboard} alt='Icone de uma caderneta' />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}

          {tasks.map(task => {
            return (
              <TasksList
                onDisable={false}
                key={task.id}
                id={task.id}
                checked={task.status}
                content={task.content}
                onDeleteTasks={deleteTasks}
                onTaskStatusChange={handleTaskStatusChange}
              />
            )
          })}
          <div className={styles.infoTasksDeleted}>
              <p className={styles.tasksDeleted}>Deletadas</p>
              <span>{tasksDeleted}</span>
          </div>
          {trashTasks.map(task => {
              return (
                <TasksList
                  onDisable={true}
                  key={task.id}
                  id={task.id}
                  checked={task.status}
                  content={task.content}
                  onDeleteTasks={deleteTasks}
                  onTaskStatusChange={handleTaskStatusChange}
                />
              )
            })}
        </div>
      </div>
    )
}