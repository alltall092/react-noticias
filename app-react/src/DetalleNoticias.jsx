import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from './Header';
import { useNavigate } from "react-router-dom";
import Footer from './Footer';
import ReactPlayer from 'react-player';
const DetalleNoticias=()=>{
const [datos,setDatos]=useState([]);
const { id } =useParams();
const [findFilter,setFindFilter]=useState([]);
const navigate=useNavigate();

useEffect(()=>{

axios.get(`http://localhost:8000/api/v1/noticias/${id}`).then(res=>setDatos(res.data));

},[]);
useEffect(()=>{

axios.get('http://localhost:8000/api/v1/noticiasrecientes').then(res=>setFindFilter(res.data));

},[]);
const navegar=(id)=>{
const n=   window.location.href = '/detalles/'+id;
return n;

}

return(
<div className="container-fluid">
<Header/>
<div className="container">

    
    {datos.map(x=>(x.map(t=>(
<div className="row">
<div className="detalle-item col-md-8">

<h4>{t.titulo}</h4>
<hr/>
<img src={t.url} height="400" width="850"/>
<p>{t.contenido}</p>
<ReactPlayer url={t.video}/>
</div>
<div className="col-md-4">
<h5 style={{textAlign:"center"}}>Noticias Recientes</h5>
<hr/>
{findFilter.map(p=>(p.map((z,index)=>(
<div className="row">
<div className="col-md-5">
 <hr/>
 <a href="#" onClick={()=>navegar(z[index].id)}>
<h6>{z[index].titulo}</h6>
</a>
</div>
<div className="col-md-7">
<hr/>
<a href="#" onClick={()=>navegar(z[index].id)}>
    <img src={z[index].url} height="100" width="100"/>
    </a>
    
    </div>
</div>

    
    
    ))))}


    </div>
</div>))))}
</div>
<br/>
<Footer/>

</div>)


}
export default DetalleNoticias;