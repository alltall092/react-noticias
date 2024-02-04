import Header from "./Header";
import Footer from "./Footer";
import { ListGroup } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import './noticias.css';
import { useNavigate } from "react-router-dom";
const Noticias=()=>{
  const [datos,setDatos]=useState([]);
  const [filtered,setFiltered]=useState([]);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(null);
 const navigate=useNavigate();
const [filter,setFilter]=useState([]);
const [imageUrl,setImageUrl]=useState([]);
const [image,setImage]=useState([]);
const [recientes,setRecientes]=useState([]);
const itemsPerPage = 6; // Number of items per page
const [currentPage, setCurrentPage] = useState(1);

const totalItems = filter.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);
const handleSelect = (selectedIndex) => {
  setIndex(selectedIndex);
};
useEffect(()=>{
  axios.get('http://localhost:8000/api/v1/noticiasrecientes').then(res=>setRecientes(res.data))


},[]);

useEffect(()=>{
axios.get('http://localhost:8000/api/v1/noticias/').then(res=>setFiltered(res.data.imageUrls))


},[]);
useEffect(()=>{
setFilter(filtered);



},[filtered]);

  useEffect(()=>{

axios.get('http://localhost:8000/api/v1/category').then(res=>setDatos(res.data));


  },[datos]);

const getByCategories=(id)=>{

const cat=filtered.filter((p,index)=>p[index]?.categoryId===id);
setFilter(cat);
//setImageUrl(r);

setActive(id);


}

const navegar=(id)=>{
const n=navigate("/detalles/"+id);
return n;


}

//filtered.filter((x,i)=>console.log(x[i]?.categoryId));
const handlePageChange = (page) => {
  setCurrentPage(page);
  onPageChange(page);
}
//recientes.map((x)=>x.map((p,index)=>console.log(p[index].url)))
    return(<>
    <Header/>
    <Carousel data-bs-theme="dark">
    {recientes.map(h=>(
      h.map((x)=>(
     x.map(img=>(
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img.url}
          alt="First slide"
          height="450"

        />
        <Carousel.Caption>
          <h5 style={{color:"white"}}>{img.titulo}</h5>
          <p style={{color:"white"}}>Noticias Recientes y mas </p>
        </Carousel.Caption>
      </Carousel.Item>
   
     ))))))}
        </Carousel>
   
    <div className="container-fluid item">
      <div className="row">
       
        <div className="col-md-3 menu-categories ">
    <ListGroup as="ul" className="categories">
      <ListGroup.Item as="li" style={{backgroundColor:'orange',color:'white'}}>
        <h3>Menu de Categorias</h3>
      </ListGroup.Item>
      {datos.map((category) => (
            <ListGroup.Item as="li"
            className={active === category.id ? 'active' : ''}
              onClick={() => getByCategories(category.id)}
              style={{ cursor: "pointer" }}
            
            key={category.id}>
              <i className="fa-solid fa-angles-left"></i>
              {category.name}
              </ListGroup.Item>))}
    </ListGroup>
    </div>
    <div className="col-md-9 noti" style={{ maxHeight: '575px', overflowY: 'auto' }}>{filter.map((p)=>(p.map(f=>(
     f.id===f.noticiasId &&(
    <div className="noti-item">

      <div className="gallery" >
  <a target="_blank"  onClick={()=>navegar(f.id)}>
    <img src={f.url} alt="Cinque Terre" width="600" height="400"/>
  </a>
  <div className="desc"><h6>{f.titulo}</h6></div>
</div>
      
      
      </div>)))))}</div>
    </div>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <Footer className="footer"/>
    </>)
}
export default Noticias;