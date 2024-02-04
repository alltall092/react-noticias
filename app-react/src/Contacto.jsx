import Footer from "./Footer";
import Header from "./Header";
import './contacto.css';
import axios from 'axios';
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Esti

const Contacto=()=>{
   
      const [nombre,setNombre]=useState("");
      const [email,setEmail]=useState("");
      const [comentario,setComentario]=useState("");
      const [notification, setNotification] = useState({ type: '', text: '' });

      const [errores, setErrores] = useState({
        nombre: '',
        correo: '',
        comentario: ''
      })
     
      const handleChange = (content, delta, source, editor) => {
        // content contiene el HTML actual del editor
        setComentario(content);
      };
      const Submit =(e)=>{

        e.preventDefault();
    
        // Validar los campos antes de enviar el formulario
        let erroresActuales = {};
        if (!nombre.trim()) {
          erroresActuales.nombre = 'El nombre es requerido';
        }
        if (!email.trim()) {
          erroresActuales.email = 'El correo es requerido';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          erroresActuales.email = 'El correo no es válido';
        }
        if (!comentario.trim()) {
          erroresActuales.comentario = 'El comentario es requerido';
        }
    
        if (Object.keys(erroresActuales).length === 0) {
          axios.post('http://localhost:8000/api/v1/contactos',{nombre,email,comentario}).then((res)=>{

          setNotification({ type: 'success', text: 'Guardado con éxito' });
          setTimeout(() => {
            setNotification({ type: '', text: '' });
          }, 2000);
}
).catch(err=>{
  setNotification({ type: 'error', text: 'Error al guardar' });
  setTimeout(() => {
    setNotification({ type: '', text: '' });
  }, 2000);
});
          console.log('Datos enviados:', { nombre, email, comentario });
        } else {
          setErrores(erroresActuales);
        }
      }
      
return(<>
<Header/>
<div className="container-fluid fondo">
{notification.text && (
  
  <div className={`alert ${notification.type}`}>
    <span>{notification.text}</span>
  </div>
  
)}
  <div className="container ct">
  <div className="row">
<div className="col-md-6 contact">
<h2>Formulario de Contacto</h2>
<form  onSubmit={Submit}>
<div className="form-group">
<label>Nombre</label>
<input type="text" onChange={(e)=>setNombre(e.target.value) }  value={nombre} className="form-control"/>
{errores.nombre && <span style={{color:"red"}}>{errores.nombre}</span>}
</div>
<div className="form-group">
<label>Correo</label>
<input type="text"  onChange={(e)=>setEmail(e.target.value)} className="form-control" value={email}/>
{errores.email && <span style={{color:"red"}}>{errores.email }</span>}
</div>
<div className="form-group">
<label>Comentario</label>
<ReactQuill
      style={{ width: '100%', height: '200px', border: "2px solid blue" }}
      theme="snow"
      value={comentario}
      onChange={handleChange}
      className="form-control"
    />
  {errores.comentario && <span style={{color:"red"}}>{errores.comentario}</span>}
  
</div>
<div className="form-group">
<button type="submit" className="btn btn-primary botones">enviar</button>
</div>
</form>
</div>
</div>
</div>
</div>


<Footer/>
</>)

}
export default Contacto;