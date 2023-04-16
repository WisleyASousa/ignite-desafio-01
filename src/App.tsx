import { Header } from './components/Header'
import { Tasks } from './components/Tasks'
import styles from './App.module.css'
import './global.css'
import { Footer } from './components/Footer'


export function App() {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Tasks id={''} content={''} status={false} />
      </div>
      <Footer />
    </div>
  )
}
