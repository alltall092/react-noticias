import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import Login from './Login';
//import './App.css';
import Dashboard from './Dashboard';
import Admin from './Admin';
import PrivateRoute from "./PrivateRoute";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import Home from './Home';
import Noticias from './Noticias';
import Contacto from './Contacto';
import About from './About';
import Register from './Register';
import NoticiasRecientes from './NoticiasRecientes';
import DetalleNoticias from './DetalleNoticias';
import Form from './Form';
import Roles from './Roles';
function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <>
    <Router>
  
  
       <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/noticias" element={ <Noticias /> } />
        <Route path="/contacto" element={ <Contacto /> } />
        <Route path="/acerca" element={ <About /> } />
        
        <Route path="/registrarse" element={ <Register /> } />
      
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/noticiasrecientes" element={<NoticiasRecientes/>}/>
        <Route path="/detalles/:id" element={<DetalleNoticias/>}/>
        <Route path="/form" element={<Form/>}/>
        <Route path="/roles" element={<Roles/>}/>
        <Route  path="/login" element={ <Login  loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
        
        <Route element={<PrivateRoute loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}>
        <Route
  path="/dashboard" 
  element={
    <Dashboard setLoggedIn={setLoggedIn}/>
  }
/>
</Route>    
        

      </Routes>
     
     </Router>
    </>
  )
}

export default App
