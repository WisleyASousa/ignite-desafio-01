import styles from './Tasks.module.css';
import clipboard from '../assets/clipboard.svg'
import { TasksList } from './TasksList';
import { v4 as uuidv4 } from 'uuid';
import { ChangeEvent, FormEvent, useState } from 'react';
import { AlignLeft, Exclude, PlusCircle } from '@phosphor-icons/react'


interface TasksType {
  id: string,
  content: string,
  status: boolean,
  dateCreated: string
}

export function Tasks({ id, content, status }:TasksType) {

  const [tasks, setTasks] = useState<TasksType[]>([]);
  const [trashTasks, setTrashTasks] = useState<TasksType[]>([]);
  const [sortedListTasks, setSortedListTasks] = useState<TasksType[]>([]);

  const [tasksCreated, setTasksCreated] = useState(0);

  const [tasksCompleted, setTasksCompleted] = useState(0);

  const [tasksDeleted, setTasksDeleted] = useState(0);

  const [newTaskText, setNewTaskText] = useState('');

  const date = new Date();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const dateCreated = `criada em ${day}/${month}/${year} - ${hour}:${minutes}`;


  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: uuidv4(),
      content: newTaskText,
      status: false,
      dateCreated: dateCreated
    }

    setTasks((status) => [newTask, ...status]);
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

  function handleOrganizeTasks() {
    const sortedList = tasks.sort((a, b) => {
      if (a.status === b.status) {
        return 0;
      }
      if (a.status && !b.status) {
        return 1;
      }
      return -1;
    });
    setSortedListTasks(sortedList);
  }

  const isNewTaskEmpty = newTaskText.length == 0;
  
  return (
      <div className={styles.containerTasks}>
        <div className={styles.containerForm}>
          <form onSubmit={handleCreateNewTask} className={styles.itemForm}>
            <textarea
              maxLength={60}
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

          <button 
            title='Organizar' 
            className={styles.btnOrganize}
            onClick={handleOrganizeTasks}
          >
            <AlignLeft size={28} />
          </button>

          
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
                taskCreatedDate={task.dateCreated}
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
                taskCreatedDate={task.dateCreated}
              />
            )
          })}
          {trashTasks.length === 0 && (
            <div className={styles.boxTasks}>
              <Exclude size={60} />
              <strong>Você não deletou nem uma tarefa</strong>
              <p>Tarefas deletadas serão mostradas aqui</p>
            </div>
          )}
        </div>
      </div>
    )
}

