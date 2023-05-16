import './App.css';
import { Navigate, Route, Routes } from 'react-router';

import { Users } from './pages/Users';
import {Main} from './pages/Main'
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ResetPasword } from './pages/ResetPasword';
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import { Search } from './components/Search';
import {Library} from './components/Library'
import  {useAuthContext} from './hooks/useAuthContext'
import { Home } from './components/Home';
function App() {

  const {user} = useAuthContext()

  return (    
    <div className="App" >      
      <Routes>
        <Route path='/users' element={ (user)? <Navigate to='/' /> : <Users />} >
          <Route index element = {<Login/>} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='reset' element={<ResetPasword/>}/>
        </Route>        
        <Route path='/' element={<Main/>} >
          <Route index element={<Home/>} />
          <Route path='/search' element = {<Search/>} />          
          <Route path='/library' element={ (!user)? <Navigate to='/users' /> : <Library/>} />
        </Route>
      </Routes>      
      <ToastContainer />
    </div>    
  );
}

export default App;
