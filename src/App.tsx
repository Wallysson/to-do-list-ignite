import { Header } from "./components/Header";
import { TaskList } from "./components/TaskList";
import styles from './App.module.css'


export function App() {

  return (
    <>
      <Header />

      <main className={styles.wrapper}>
        <TaskList />
        
      </main>
    </>
  )
}
