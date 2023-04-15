import { Header } from './components/Header'
import { NewItem } from './components/NewItem'
import { Tasks } from './components/Tasks'
import './global.css'

export function App() {
  return (
    <div>
      <Header />
      <NewItem />
      <Tasks />
    </div>
  )
}
