import { useState,useEffect } from "react";
import axios from 'axios';
import Header from "./Header";
import Footer from './Footer';
import './noticiasrecientes.css';
const NoticiasRecientes=()=>{
const [datos,setDatos]=useState([]);
useEffect(()=>{

axios.get('http://localhost:8000/api/v1/noticiasrecientes').then(res=>setDatos(res.data));



},[])
console.log(datos);
return(<>
<Header/>
<div className="container recientes">
<h2>Noticias Recientes</h2>
<hr/>

{datos.map(x=>(x.imagenVideo.map(t=>(
<div className="row">
<div className="col-md-6 col-ms-6">

<img src={"../imagenes/"+t.imagenes} height="300" width="400" className="news-image"
            alt="News Image"/>

</div>
<div className="col-md-6 col-ms-6">
<h4 className="news-title">{x.titulo}</h4>
<p  className="news-content">{x.contenido}</p>
</div>



</div>))))}

</div>
<Footer/>
</>)

}
export default NoticiasRecientes;