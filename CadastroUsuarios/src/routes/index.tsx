import { Route, Routes } from 'react-router-dom'
import UseForm from '../components/userForm'
import ListUsersCard from '../components/ListUsersCard'

export const Router = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<ListUsersCard/>}></Route>
        <Route path='/usuarios' element={<ListUsersCard/>}></Route>
        <Route path='/usuario/criar' element={<UseForm/>}></Route>
        <Route path='/usuario/:id' element={<UseForm/>}></Route>
    </Routes>
    </>
    
  )
}