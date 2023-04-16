import { Header } from './components/Header'
import { Tasks } from './components/Tasks'
import styles from './App.module.css'
import './global.css'


export function App() {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Tasks id={''} content={''} status={false} />
      </div>
    </div>
  )
}
