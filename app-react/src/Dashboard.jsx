import './dashboard.scss';
import React, { useState,useEffect, useId } from 'react';
import { Chart } from "react-google-charts";
import YouTube from 'react-youtube';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { set, useForm } from "react-hook-form";
import ReactPlayer from 'react-player/youtube'
import Dropdown from 'react-bootstrap/Dropdown';  
const Dashboard=({setLoggedIn})=>{
  const [filterMenuActive, setFilterMenuActive] = useState(false);
  const [isGridView, setIsGridView] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
const [datos,setDatos]=useState([]);
const [contactos,setContactos]=useState([]);
const [user,setUser]=useState([]);
const [chartData, setChartData] = useState([]);
const [noticias,setNoticias]=useState([]);
const [userId,setUserId]=useState("");
const [active,setActive]=useState(0);
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const [searchTerm, setSearchTerm] = useState('');
const [searchResults, setSearchResults] = useState([]);

const handleChange = event => {
  setSearchTerm(event.target.value);
}

const email = localStorage.getItem("user");
const userObject = JSON.parse(email);

const navigate=useNavigate();



  const chartEvents = [
    {
      eventName: "select",
      callback({ chartWrapper }) {
        console.log("Selected ", chartWrapper.getChart().getSelection());
      }
    }
  ];
useEffect(()=>{

axios.get('http://localhost:8000/api/v1/noticias/').then(res=>setNoticias(res.data.imageUrls));

},[]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/news');
        const dataFromServer = response.data;
        setChartData([['Mes', 'Número de Noticias'], ...dataFromServer]);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);
  const options = {
    title: 'Número de Noticias por Mes',
    hAxis: {
      title: 'Meses',
    },
    vAxis: {
      title: 'Número de Noticias',
    },
    chartArea: {
      width: '70%',
    },
    series: {
      0: { color: '#4285F4' }, // Personaliza el color de la serie A
      1: { color: '#34A853' }, // Personaliza el color de la serie B
      // Agrega más configuraciones de series según sea necesario
    },
  };
  const chartStyle = {
    // Estilos CSS para el contenedor del gráfico
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    height:'500px',
    width:'100%'
  };

    const handleFilterClick = () => {
      setFilterMenuActive(!filterMenuActive);
    };
  
    const handleGridClick = () => {
      document.querySelector(".list").classList.remove("active");
      document.querySelector(".grid").classList.add("active");
      document.querySelector(".products-area-wrapper").classList.add("gridView");
      document
        .querySelector(".products-area-wrapper")
        .classList.remove("tableView");
      setIsGridView(true);
    };
  
    const handleListClick = () => {
      document.querySelector(".list").classList.add("active");
      document.querySelector(".grid").classList.remove("active");
      document.querySelector(".products-area-wrapper").classList.remove("gridView");
      document.querySelector(".products-area-wrapper").classList.add("tableView");
      setIsGridView(false);
    };
    useEffect(()=>{
axios.get('http://localhost:8000/api/v1/categories').then(res=>setDatos(res.data));


    },[]);

    useEffect(()=>{
getContactos();


    },[]);

const getContactos=()=>{

  axios.get('http://localhost:8000/api/v1/contactos').then(res=>setContactos(res.data));


}


useEffect(()=>{
getUser();


},[]);
const getUser=()=>{

  axios.get('http://localhost:8000/api/v1/users').then(res=>setUser(res.data));
}


    const handleModeSwitch = () => {
      document.documentElement.classList.toggle('light');
      setIsLightMode(!isLightMode);
    };

    const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = (id) => {
    setActive(id);
    setShowFullContent(!showFullContent);
  };

  const navegar=()=>{
const n=navigate("/form");
return n;

  }
const PostRoles=()=>{

const navegacion=navigate("/roles");
return navegacion;


}

const obtenerFecha=(fechaPublicacion)=>{
  const date = new Date(fechaPublicacion);

  // Array containing the names of the months
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Get the day, month, and year from the date object
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const monthName = monthNames[monthIndex];
  const year = date.getFullYear();
return(<><span>{day+" "+monthName+","+year}</span></>)

}

const foundUser = user.find(x => x.email===userObject && x.roles === "administrador");
const updateId=(id)=>{
setUserId(id);

}
const deleteUser=(id)=>{
axios.delete(`http://localhost:8000/api/v1/users/${id}`).then(()=>getUser()).catch(err=>console.log("algo salio mal",err))



}
const deleteContactos=(id)=>{

  axios.delete(`http://localhost:8000/api/v1/contactos/${id}`).then(()=>getContactos()).catch(err=>console.log('algo salio mal'));


}

const {
  register,
  watch,
  formState: { errors },
  handleSubmit,
} = useForm();
const password = React.useRef({});
password.current = watch("password", "");
const enviar=(datos)=>{
axios.put(`http://localhost:8000/api/v1/users/${userId}`,{
password:datos.password}).then(res=>console.log('enviado con existo')).catch(err=>console.log('error no se enviar los datoas',err));


}

const onSubmit = (data) =>enviar(data);
const handleLogout = () => {
  // Lógica para cerrar sesión
  localStorage.removeItem('token');
  localStorage.removeItem('user'); // Eliminar el usuario de localStorage
  setLoggedIn(false); // Actualizar el estado de inicio de sesión
  navigate('/login');
};

React.useEffect(() => {
  const results = noticias.filter((item,index) =>
    item.filter(x=>x.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  setSearchResults(results);
}, [searchTerm, noticias]);

console.log(searchResults)

return(<>

  
<div class="app-container">
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  

<div class="sidebar">
  <div class="sidebar-header">
    <div class="app-icon">
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M507.606 371.054a187.217 187.217 0 00-23.051-19.606c-17.316 19.999-37.648 36.808-60.572 50.041-35.508 20.505-75.893 31.452-116.875 31.711 21.762 8.776 45.224 13.38 69.396 13.38 49.524 0 96.084-19.286 131.103-54.305a15 15 0 004.394-10.606 15.028 15.028 0 00-4.395-10.615zM27.445 351.448a187.392 187.392 0 00-23.051 19.606C1.581 373.868 0 377.691 0 381.669s1.581 7.793 4.394 10.606c35.019 35.019 81.579 54.305 131.103 54.305 24.172 0 47.634-4.604 69.396-13.38-40.985-.259-81.367-11.206-116.879-31.713-22.922-13.231-43.254-30.04-60.569-50.039zM103.015 375.508c24.937 14.4 53.928 24.056 84.837 26.854-53.409-29.561-82.274-70.602-95.861-94.135-14.942-25.878-25.041-53.917-30.063-83.421-14.921.64-29.775 2.868-44.227 6.709-6.6 1.576-11.507 7.517-11.507 14.599 0 1.312.172 2.618.512 3.885 15.32 57.142 52.726 100.35 96.309 125.509zM324.148 402.362c30.908-2.799 59.9-12.454 84.837-26.854 43.583-25.159 80.989-68.367 96.31-125.508.34-1.267.512-2.573.512-3.885 0-7.082-4.907-13.023-11.507-14.599-14.452-3.841-29.306-6.07-44.227-6.709-5.022 29.504-15.121 57.543-30.063 83.421-13.588 23.533-42.419 64.554-95.862 94.134zM187.301 366.948c-15.157-24.483-38.696-71.48-38.696-135.903 0-32.646 6.043-64.401 17.945-94.529-16.394-9.351-33.972-16.623-52.273-21.525-8.004-2.142-16.225 2.604-18.37 10.605-16.372 61.078-4.825 121.063 22.064 167.631 16.325 28.275 39.769 54.111 69.33 73.721zM324.684 366.957c29.568-19.611 53.017-45.451 69.344-73.73 26.889-46.569 38.436-106.553 22.064-167.631-2.145-8.001-10.366-12.748-18.37-10.605-18.304 4.902-35.883 12.176-52.279 21.529 11.9 30.126 17.943 61.88 17.943 94.525.001 64.478-23.58 111.488-38.702 135.912zM266.606 69.813c-2.813-2.813-6.637-4.394-10.615-4.394a15 15 0 00-10.606 4.394c-39.289 39.289-66.78 96.005-66.78 161.231 0 65.256 27.522 121.974 66.78 161.231 2.813 2.813 6.637 4.394 10.615 4.394s7.793-1.581 10.606-4.394c39.248-39.247 66.78-95.96 66.78-161.231.001-65.256-27.511-121.964-66.78-161.231z"/></svg>
    </div>
  </div>
  {foundUser ?(<>
          <Nav variant="pills" className="flex-column sidebar-list" as="ul">
            <Nav.Item as="li"  className="sidebar-list-item">
              <Nav.Link eventKey="first"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>Inicio</span></Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="sidebar-list-item">
              <Nav.Link eventKey="second"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <span>Noticias</span></Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="sidebar-list-item">
              <Nav.Link eventKey="three">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
        <span>Estatidisticas</span>
                
                
                 </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="sidebar-list-item">
              <Nav.Link eventKey="four"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
        <span>Usuarios</span>
        </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="sidebar-list-item">
              <Nav.Link eventKey="five"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <span>Notifications</span>
        </Nav.Link>
            </Nav.Item>

          </Nav></>):(<>
            <Nav variant="pills" className="flex-column sidebar-list" as="ul">
            <Nav.Item as="li"  className="sidebar-list-item">
              <Nav.Link eventKey="first"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span>Inicio</span></Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="sidebar-list-item">
              <Nav.Link eventKey="second"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <span>Noticias</span></Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="sidebar-list-item">
              <Nav.Link eventKey="three">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
        <span>Estatidisticas</span>
                
                
                 </Nav.Link>
            </Nav.Item>
           
            <Nav.Item as="li" className="sidebar-list-item">
              <Nav.Link eventKey="five"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <span>Notifications</span>
        </Nav.Link>
            </Nav.Item>

          </Nav>
          
          
          </>)}
        
  
  <div class="account-info">
    <div className="account-info-picture">
    <i className="fa-solid fa-circle-user" style={{fontSize:"30px"}}></i>
    </div>
    <div className="account-info-name">{userObject}</div>
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        ...
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onClick={handleLogout}>Cerrer Session</Dropdown.Item>
       
      </Dropdown.Menu>
    </Dropdown>

  </div>
</div>
<div class="app-content">
  <div class="app-content-header">
    <h1 class="app-content-headerText">Noticias</h1>
    <button class="mode-switch" title="Switch Theme">
      <svg class="moon mode-switch" fill="none" stroke="currentColor"  onClick={handleModeSwitch} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="24" height="24" viewBox="0 0 24 24">
        <defs></defs>
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
      </svg>
    </button>
    <button class="app-content-headerButton" onClick={navegar}>Agregar Noticias</button>
  </div>
  <div class="app-content-actions">
    <input class="search-bar" placeholder="Search..." type="text" onChange={handleChange} value={searchTerm}/>
    <div class="app-content-actions-wrapper">
      <div class="filter-button-wrapper">
        <button class="action-button filter jsFilter" onClick={handleFilterClick}><span>Filter</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></button>
        <div class="filter-menu">
          <label>Category</label>
          <select>
            <option>All Categories</option>
            <option>Furniture</option>                     <option>Decoration</option>
            <option>Kitchen</option>
            <option>Bathroom</option>
          </select>
          <label>Status</label>
          <select>
            <option>All Status</option>
            <option>Active</option>
            <option>Disabled</option>
          </select>
          <div class="filter-menu-buttons">
            <button class="filter-button reset">
              Reset
            </button>
            <button class="filter-button apply">
              Apply
            </button>
          </div>
        </div>
      </div>
      <button className={!isGridView ? 'list active' : 'list'} onClick={handleListClick} title="List View">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
      </button>
      <button className={isGridView ? 'grid active' : 'grid'} onClick={handleGridClick} title="Grid View">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
      </button>
    </div>
  </div>
  
  <Tab.Content>
            <Tab.Pane eventKey="first">

            <div class="dashboard">
            <section class="news-section" style={{ maxHeight: '575px', overflowY: 'auto' }}>
          
            {searchResults.map(x=>(x.map(p=>(
  
     p.id===p.noticiasId &&(<>
     <article class="news-post" key={p.id} >
        <img src={p.url} alt="Imagen de la noticia"/>
        <h2 style={{color:"white !important"}}>{p.titulo}</h2>
        <p class="date">Fecha de Publicación: {p.fechaPublicacion}</p>
        {showFullContent && active===p.id ? (
        <p>{p.contenido}</p>
      ) : (
        <p>{p.contenido.substring(0, 100)}...</p>
      )}
      <a onClick={()=>toggleContent(p.id)} className="read-more">
        {showFullContent ? 'Leer menos' : 'Leer más'}
      </a>
      </article>

   </>)
))))}</section>
  </div>

              
            </Tab.Pane>
            <Tab.Pane eventKey="second">    
            <div class="products-area-wrapper tableView" style={{ maxHeight: '575px', overflowY: 'auto' }}>
            <div class="products-header">
      <div class="product-cell image">
        Items
        <button class="sort-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"/></svg>
        </button>
      </div>
      <div class="product-cell category">Categorias<button class="sort-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"/></svg>
        </button></div>
      <div class="product-cell status-cell">Status<button class="sort-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"/></svg>
        </button></div>
     
      <div class="product-cell price">Fecha de publicacion<button class="sort-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"/></svg>
        </button></div>
    </div>
    
    {datos.map(p=>(p.map(x=>(x.map((f,i)=>(
    <div class="products-row" >
    
      <button class="cell-more-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
      </button>
        <div className="product-cell image">
          <img src={f.url} alt="product"/>
          <span>{f.titulo}</span>
        </div>
      <div class="product-cell category"><span class="cell-label">Category:</span>{f.name}</div>
      <div class="product-cell status-cell">
        <span class="cell-label">Status:</span>
        <span class="status active">Active</span>
      </div>
   
      <div class="product-cell price"><span class="cell-label">Fecha de Publicacion:</span>{obtenerFecha(f.fechaPublicacion)}</div>
    </div>))))))}
    
  </div>
    
    </Tab.Pane>
            <Tab.Pane eventKey="three">
            <div style={chartStyle}>
            <Chart
  chartType="Bar"
  data={chartData}
  options={options}
  graphID="Bar"
  width="100%"
  height="400px"
  chartEvents={chartEvents}
/>
</div>



            </Tab.Pane>
            <Tab.Pane eventKey="four">
            <button className='app-content-headerButton'  onClick={PostRoles} style={{margin:"15px 15px 15px 4px",padding:"5px",width:"200px"}}>Agregar Roles</button>
            
            <br/>

            <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col"> # <button class="sort-button sort">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"/></svg>
        </button></th>
      <th scope="col">Usuario <button class="sort-button sort">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"/></svg>
        </button></th>
      <th scope="col">Correo <button class="sort-button sort">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"/></svg>
        </button></th>
      <th scope="col"> Cambiar Contraseña <button class="sort-button sort">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"/></svg>
        </button></th>
      <th scope="col">Action  <button class="sort-button sort">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z"/></svg>
        </button></th>
    </tr>
  </thead>
  <tbody>
  {user.map((x,index)=>( <tr>
    <td>{x.id}</td>
    <td>{x.username}</td>
      <td>{x.email}</td>
     
      <td><Button variant="light" onClick={handleShow}>
        <span onClick={()=>updateId(x.id)}>Cambiar Contraseña</span>
      </Button>
</td>
      <td><button className='btn btn-danger' onClick={()=>deleteUser(x.id)}>eliminar</button></td>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar Contraseña</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
<input type="hidden" onChange={(e)=>setUserId(e.target.value)} value={userId}/>
<div className="form-group">
<label>Contraseña</label>
<input type="password" {...register("password", { required: true })}
        aria-invalid={errors.password ? "true" : "false"} className={errors.password ? 'form-control input-error' : 'form-control'}/>
  {errors.password?.type === "required" && (
        <p role="alert" style={{color:"red"}}>El campo Password Esta Vacio</p>
      )}


</div>
<div className="form-group">
<label> Confimar Contraseña</label>
<input type="password"  className={errors.confirmPassword ? 'form-control input-error' : 'form-control'}
{...register("confirmPassword",{
  required: true,
  validate: (value) =>
    value === password.current || 'Las contraseñas no coinciden',
})}
aria-invalid={errors.confirmPassword ? "true" : "false"}/>

{errors.confirmPassword?.type === "required" && (
<p role="alert" style={{color:"red"}}>El Campo Confirm Password Esta Vacio</p>
)}
 {errors.confirmPassword && <p style={{color:"red"}}>{errors.confirmPassword.message}</p>}

</div>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" type="submit">
          Guardar Cambio
          </Button>
        </Modal.Footer>
        
</form>
      </Modal>      
              
    </tr>))}
   
  </tbody>
</table>

    
              
              </Tab.Pane>
            <Tab.Pane eventKey="five">

<div className="container" style={{ maxHeight: '575px', overflowY: 'auto' }}>     
<table className="table table-hover">
<thead>
<tr>
<th>#</th>
<th>Nombre</th>
<th>Correo</th>
<th>Fecha de Publicacion</th>
<th>Action</th>
</tr>
</thead>
<tbody>
{contactos.map(t=>(
<tr>
<td>{t.id}</td>
<td>{t.nombre}</td>
<td>{t.email}</td>

<td>{obtenerFecha(t.fechaPublicacion)}</td>
<td><button className=" btn btn-danger" onClick={()=>deleteContactos(t.id)}><i className="fa-solid fa-trash" style={{color:"white"}}></i></button></td>
</tr>


)


)}

</tbody>
</table>
<h2>Notificaciones</h2>
<br/>
<div className="comment-section">
{contactos.map(t=>(
<div className="comment">
    <div className="user-info">
    <i className="fa-solid fa-circle-user" style={{fontSize:"50px",margin:"5px",padding:"5px"}}></i>
      <div class="user-details">
        <h4>{t.nombre}</h4>
        <span>{obtenerFecha(t.fechaPublicacion)}</span>
      </div>
    </div>
    <div className="comment-text">
      <p>{t.comentario}</p>
    </div>
  </div>))}
</div>
</div>


            </Tab.Pane>
          </Tab.Content>


    
  
</div>

</Tab.Container>
</div>

</>)

}
export default Dashboard;