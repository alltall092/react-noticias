import Button from 'react-bootstrap/Button';
import Header from './Header';
import Footer from './Footer';
import './home.css';
import axios from 'axios';
import { useState,useEffect } from 'react';
import {useNavigate } from 'react-router-dom';

const Home=()=>{
const [datos,setDatos]=useState([]);
const [cat,setCat]=useState([]);
const [prueba,setPrueba]=useState([]);
const navigate=useNavigate();
useEffect(()=>{ 

axios.get('http://localhost:8000/api/v1/noticiasprincipales').then(res=>setDatos(res.data));

},[]);

useEffect(()=>{
axios.get('http://localhost:8000/api/v1/categories').then(res=>setCat(res.data));


  },[]);
  console.log(cat)

   
  // Set to keep track of unique names
  const navegar=()=>{
const n=navigate('/noticiasrecientes');

return n;

  }
const navegarDetalles=(id)=>{
const navega=navigate('/detalles/'+id);
return navega;

}

return(<>
<Header/>
<div className="container-fluid contenedor3">
<div className="row parrafo">
<div className="col-md-4 your-component">
<h3 style={{color:"blue"}}>Noticias de Alto Nivel y Mas</h3>
<p style={{color:"white"}}>"Sumérgete en el mundo de la información refinada y las narrativas cautivadoras.</p>
<p style={{color:"white"}}> Nuestra plataforma ofrece una selección cuidadosamente curada de noticias, donde la elegancia se encuentra con la profundidad de los acontecimientos actuales.
 </p>   
    
   
   <Button variant="warning" onClick={navegar} style={{color:"blue"}}>Ver Noticias Recientes</Button>

</div>
<div className="col-md-8 contenedor2">


    
</div>


</div>


</div>
<div className="container">


<div className="lookbook-gallery">
      <h2 className="look-hed">Noticias Pricipales</h2>
      <div className="lookbook-grid" role="region">
        {datos.map((image) => (image.map((p,index)=>(p.map(x=>(
          x.id===x.noticiasId &&(
          <figure className="model" key={index}>
            <a href="#" onClick={()=>navegarDetalles(x.id)}>
            <img src={x.url} alt="imagenes" />
            <figcaption className="model--caption">
              <h3 className="model-hed"><a href="#">{x.titulo}</a></h3>
              
            </figcaption>
            </a>
          </figure>
          )
        ))))
        ))}
      </div>

    </div>
    <div className="row">
<div className="col-md-12 grid-container">
{cat.map(x=>x.map(z=>(z.map(j=>(
j.id===j.noticiasId && (
<div className="home-item">

<p style={{textAlign:"center"}}>{j.name}</p>
<a href="#" onClick={()=>navegarDetalles(j.id)}>
<img src={j.url} height="400" width="400" alt="imagenes"/>
<h6>{j.titulo}</h6>
</a>
</div>
)
)))))}

</div>


    </div>
</div>
<br/>
<br/>
<Footer/></>)


}
export default Home;