import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainPage from './pages/MainPage'
import UncontrolledForm from './pages/UncontrolledForm'
import ReactHookForm from './pages/ReactHookForm'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/uncontrolled' element={<UncontrolledForm />} />
          <Route path='/react-hook' element={<ReactHookForm/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
