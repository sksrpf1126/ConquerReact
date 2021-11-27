import { Routes, Route } from 'react-router-dom'
import BasicReact from './page/BasicReact'
import Immutability from './page/Immutability'
import LifeCycle from './page/LifeCycle'

function App(props) {
  return (
    <div>
      <Routes>
        <Route path='/' element={<BasicReact />} exact></Route>
        <Route path='/Immutability' element={<Immutability />} exact></Route>
        <Route path='/LifeCycle' element={<LifeCycle />} exact></Route>
      </Routes>
    </div>
  )
}

export default App
