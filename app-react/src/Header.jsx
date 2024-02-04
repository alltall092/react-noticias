import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './header.css';
import { useState } from 'react';
const Header=()=>{
  const [searchTerm, setSearchTerm] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const user = JSON.parse(localStorage.getItem('user'));
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    //onSearch(searchTerm);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
  
  const handleLogin = () => {
    // Lógica para el inicio de sesión exitoso
    localStorage.setItem('user', 'username'); // Guardar el usuario en localStorage
    setIsLoggedIn(true); // Actualizar el estado de inicio de sesión
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Eliminar el usuario de localStorage
    setIsLoggedIn(false); // Actualizar el estado de inicio de sesión
  };

return(<>
   <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home" style={{color:"orange"}}><img src="../logo4.jpg" height="50" width="75"/>BocaDeNigua y Mas</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/"><i className="fa fa-home"></i>Inicio</Nav.Link>
            <Nav.Link href="/noticias"><i className="fa-solid fa-newspaper"></i>Noticias</Nav.Link>
            <Nav.Link href="/contacto"><i className="fa-solid fa-address-book"></i>Contacto</Nav.Link>
            <Nav.Link href="/acerca"><i className="fa-solid fa-circle-info"></i>Acerca</Nav.Link>
           
            
          </Nav>
          <Nav>
      {isLoggedIn ? (
        <>
          <Nav.Link href="/dashboard"><i className="fa-solid fa-user"></i>{user}</Nav.Link>
          <Nav.Link onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i>Cerrar Sesión</Nav.Link>
        </>
      ) : (
        <>
          <Nav.Link href="/login"><i className="fa-solid fa-right-to-bracket"></i>Iniciar Sesión</Nav.Link>
          <Nav.Link href="/registrarse"><i className="fa-solid fa-registered"></i>Registrarse</Nav.Link>
        </>
      )}
    </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 
</>)

}
export default Header;