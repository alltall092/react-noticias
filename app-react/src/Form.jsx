import './form.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';
const Form=()=>{
const [datos,setDatos]=useState([]);
const [titulo,setTitulo]=useState("");
const [contenido,setContenido]=useState("");
const [seleccion, setSeleccion] = useState(""); 
const [imagen, setImagen] = useState(null);
 const [file, setFile] = useState(null);
 const [progress, setProgress] = useState(0);
 const handleFileChanges = (e) => {
    setFile(e.target.value);
  };

  
  const handleFileChange = async  (e) => {

    setImagen(e.target.files[0]);
    const formData = new FormData();
    formData.append('imagen', imagen);

    try {
      // Simulated upload delay for demonstration purposes
      const simulateUploadDelay = () => {
        return new Promise(resolve => {
          setTimeout(resolve, 1000);
        });
      };

      await simulateUploadDelay(); // Simulate upload delay

      // Update progress bar
      setProgress(100);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const regresar=()=>{
window.location.href="/dashboard";

  }
/*
  const [imagen, setImagen] = useState({ imagenes: null, video: null });

  const handleFileChange = (e) => {
    const selectedImages = e.target.files;
    setImagen({ ...imagen, imagenes: selectedImages });
  };

  const handleFileChanges = (e) => {
    const selectedVideo = e.target.files[0]; // Assuming you only want to upload one video
    setImagen({ ...imagen, video: selectedVideo });
  };*/

useEffect(()=>{
axios.get('http://localhost:8000/api/v1/categories').then(res=>setDatos(res.data));

},[]);


  

const handleUpload = async () => {
  try {
    if (!im) {
      console.error('No file selected');
      return;
    }
    const formData = new FormData();
   
   
    // Append images to FormData
   /* if (imagen.imagenes) {
      Array.from(imagen.imagenes).forEach((image) => {
        formData.append('file', image.imagenes);
      });
    }

    // Append video to FormData
    if (imagen.video) {
      formData.append('video', imagen.video);
    }*/
    formData.append('titulo', titulo);
    formData.append('seleccion', seleccion);
    formData.append('contenido', contenido);
    formData.append('imagen',imagen);
    formData.append('video',file);
    const response=await axios.post('http://localhost:8000/api/v1/noticias', formData);
    console.log(response.data);
    console.log('File uploaded successfully:', response.data.message);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
 
};

return(<div className="container-fluid cx">


<button className="btn btn-light" style={{width:"100px",margin:"5px"}} onClick={regresar}><i className="fa-solid fa-arrow-left"></i></button>
<div className="row content">
<div className="col-md-6 col-sm-6 rows">
<h2>Formulario de Agregar Noticias</h2>
<form onSubmit={handleUpload} encType="multipart/form-data">
<div className="form-group">
<label>Titulo</label>
<input type="text" onChange={(e)=>setTitulo(e.target.value)} className="form-control" value={titulo}/>
</div>
<div className="form-group">
<label>Categorias</label>

<select className="form-select"  style={{ border: "2px solid blue" }} onChange={(e)=>setSeleccion(e.target.value)} value={seleccion}>
    <option>--------</option>
{datos.map(x=>(
    <option value={x.id}>{x.name}</option>
))}
    </select>
</div>
<div className="form-group">
  <label>Subir imagenes</label>
  <input type="file" className="form-control" 
        onChange={handleFileChange}
        accept="image/*" id="inputGroupFile01"/>
         {progress > 0 && (
        <div style={{ marginTop: '20px' }}>
          <ProgressBar now={progress} label={`${progress}%`} />
        </div>
      )}
    
        </div>
        <div class="form-group">
         <label>Video URL</label>
        
      <input
        type="text"
        className="form-control"
        onChange={handleFileChanges}
        placeholder='url del video'
         // Puedes ajustar los tipos de archivos permitidos
      />
       
</div>
<div className="form-group">

  <label for="exampleFormControlTextarea1" className="form-label">Contenido</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e)=>setContenido(e.target.value)} value={contenido}></textarea>
</div>
<button type="submit" className="btn btn-primary" style={{width:"100%"}}>Agregar</button>
</form>
</div>


</div>
</div>)

}
export default Form;