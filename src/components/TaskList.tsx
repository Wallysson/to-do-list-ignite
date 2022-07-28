import styles from './TaskList.module.css'
import { Circle, Trash, ClipboardText } from "phosphor-react";
import { useEffect, useState } from 'react';


interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [countTaskCreate, setNewTaskCreate] = useState(0)
  const [countTaskComplete, setCountTaskComplete] = useState(0)

  function handleNewTask() {
    if(!newTask) return alert("Favor preencher uma nova tarefa")

    setTasks([...tasks, {
      id: tasks.length + 1,
      title: newTask,
      isCompleted: false
    }])
    setNewTaskCreate(tasks.length + 1)
    setNewTask('')
  }

  function handleDeleteTask(id: number) {
    const removeTask = tasks.filter((eraserTasks) => {
      return eraserTasks.id !== id
    })
    setNewTaskCreate(tasks.length - 1)
    setTasks(removeTask)

  }

  function handleToggleTaskComplete(id: number) {
    const taskIndex = tasks.findIndex((task) => {
      return task.id == id
    })

    const tempTasks = [...tasks]
    tempTasks[taskIndex].isCompleted = !tempTasks[taskIndex].isCompleted

    setTasks(tempTasks)
  } 

  function countTasksCompleted() {
    tasks.filter((task) => {
      return task.isCompleted === false
    }).length 
  }

  return (
    <section className={styles.taskSection}>
      <header>
        <input 
          type="text" 
          placeholder="Adicione uma nova tarefa"
          onChange={(event) => {setNewTask(event.target.value)}}
          value={newTask}
        />
        <button onClick={handleNewTask}>
          Criar
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_902_3)">
            <path d="M7.98373 1.45158C9.27565 1.45158 10.5386 1.83468 11.6128 2.55244C12.687 3.27019 13.5242 4.29037 14.0186 5.48395C14.513 6.67754 14.6424 7.99092 14.3903 9.25802C14.1383 10.5251 13.5161 11.689 12.6026 12.6026C11.6891 13.5161 10.5252 14.1382 9.25807 14.3903C7.99097 14.6423 6.67759 14.5129 5.484 14.0185C4.29042 13.5241 3.27025 12.6869 2.55249 11.6127C1.83473 10.5385 1.45163 9.2756 1.45163 7.98368C1.45832 6.25332 2.14867 4.59574 3.37223 3.37218C4.59579 2.14862 6.25337 1.45827 7.98373 1.45158ZM7.98373 5.77648e-06C6.40611 0.00645971 4.86578 0.480174 3.55717 1.36134C2.24857 2.24252 1.23037 3.49164 0.631106 4.95102C0.031846 6.4104 -0.121605 8.01461 0.190125 9.56114C0.501855 11.1077 1.26479 12.5272 2.38262 13.6404C3.50044 14.7537 4.92304 15.5108 6.47082 15.8162C8.01861 16.1217 9.62218 15.9617 11.0791 15.3564C12.536 14.7512 13.781 13.7279 14.6568 12.4158C15.5326 11.1036 16 9.5613 16.0001 7.98368C16.0001 6.93249 15.7925 5.89165 15.3892 4.92089C14.986 3.95014 14.395 3.06857 13.6502 2.32679C12.9053 1.58501 12.0214 0.997618 11.049 0.598327C10.0766 0.199035 9.0349 -0.00429452 7.98373 5.77648e-06Z" fill="#F2F2F2"/>
            <path d="M11.707 7.38127H8.4954V4.16966H7.41397V7.38127H4.19873V8.4627H7.41397V11.6743H8.4954V8.4627H11.707V7.38127Z" fill="#F2F2F2"/>
            </g>
            <defs>
            <clipPath id="clip0_902_3">
            <rect width="16" height="16" fill="white"/>
            </clipPath>
            </defs>
        </svg>
        </button>
      </header>
      <div className={styles.taskSectionCount}>
        <div className={styles.taskCreate}>
          <strong>Tarefas criadas</strong>
          <div className={styles.taskCounterBox}><span>{countTaskCreate}</span></div>
        </div>

        <div className={styles.taskComplete}>
          <strong>Concluídas</strong>
          <div className={styles.taskCounterBox}><span>{countTaskComplete} de {countTaskCreate}</span></div>
        </div>
      </div>
      {tasks.length == 0 ? (
        <div className={styles.taskSectionWithoutList}>
          <div>
            <ClipboardText size={56} color="#808080" />
            <p>Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        </div> 
        ) : (
        <main className={styles.taskList}>
          <ul>
            {tasks.map((task) => (
              <div className={task.isCompleted ? styles.completed : ''}>
                <li key={task.id}>
                  <Circle 
                    size={24}
                    color="#4EA8DE"
                    onClick={() => handleToggleTaskComplete(task.id)}
                    cursor={"pointer"}
                  />
                  <p>
                    {task.title}
                  </p>
                  <button 
                    className={styles.taskDelete}
                    onClick={() => handleDeleteTask(task.id)}
                  >
                  <Trash 
                    size={24} 
                  />
                  </button>
                </li>
              </div>
            ))}
          </ul>
        </main>
      )}
    </section>
  )
}
