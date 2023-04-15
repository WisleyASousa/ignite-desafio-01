import { Header } from './components/Header'
import { NewItem } from './components/NewItem'
import { Tasks } from './components/Tasks'
import styles from './App.module.css'
import './global.css'

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <NewItem />
        <Tasks />
      </div>
    </div>
  )
}
