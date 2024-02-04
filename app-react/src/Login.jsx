import Header from "./Header";
import React,{useEffect,useState} from "react";
import './login.css';
import axios from 'axios';
import { useNavigate,Navigate,useLocation} from 'react-router-dom';
import { useForm } from "react-hook-form";
const Login=({loggedIn, setLoggedIn})=>{
//const [token,setToken]=useState("");
const [showAlert, setShowAlert] = useState(null);
const location = useLocation();
const navigate=useNavigate();
//const [ isAuthenticated,setIsAuthenticated]=useState(false);
const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

 
const enviar=(datos)=>{

axios.post('http://localhost:8000/api/v1/login',datos).then((res)=>{
const token=res.data.token;
const user=res.data.email;
console.log(res.data);
localStorage.setItem('token',JSON.stringify(token));
localStorage.setItem('user',JSON.stringify(user));

setLoggedIn(true);
setShowAlert(true);

setTimeout(() => {

  setShowAlert(false);
  
  return navigate("/dashboard");
}, 3000);
}).catch(err=>{
  setTimeout(() => {
    setShowAlert(false);
    return navigate("/login");
  }, 3000);
console.log('error de autenticacion',err);
});

}
  const onSubmit = (data) => enviar(data);
  
    return(<>
    <Header />
    <div className="container-fluid login">

    <div className="container contenedor">

  
        <div className="row ">
<div className="col-md-6 cont">
<h3  className="titulo2" style={{color:"blue"}}>Iniciar Session </h3>
<form onSubmit={handleSubmit(onSubmit)}>
<div className="form-group titulo2">
    <label className="control-label">Email</label>
<input type="text" className="form form-control" {...register("email", { required: true,  pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'El correo electrónico no es válido',
          } })}
        aria-invalid={errors.email ? "true" : "false"}
      />
      {errors.email?.type === "required" && (
        <p   className="center" style={{color:"red"}}>El  Campo Email Esta Vacio </p>
      )}
       {errors.email && <p style={{color:"red"}}>{errors.email.message}</p>}


</div>
<div className="form-group titulo2">
    <label className="control-label">Password</label>
  
      <div className="password-container">
      <input type={showPassword ? 'text' : 'password'}  className="form form-control"{...register("password", { required: "El Campo Password esta Vacio" })}
        aria-invalid={errors.password ? "true" : "false"}
      />
      
  <i   style={{ cursor: 'pointer' }}
              onClick={togglePasswordVisibility}
            className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
</div>
{errors.password && <p className="center" style={{color:"red"}}>{errors.password.message}</p>}
</div>
<div className="form-group titulo2">
<button type="submit" className=" boton btn btn-primary">Login</button>
</div>



</form>


</div>
</div>
<div className="col-md-6">
{showAlert==true?(<>
  <div className="alert show alert-success">
    <p style={{ color: "green" }}>¡Inicio de sesión exitoso!</p>
  </div></>
):showAlert==false?(<> <div className="alert show alert-danger">
<p style={{ color: "red" }}>¡Error de Authenticacion!</p>
</div></>):null}
      </div>

        </div>
     
        
        </div></>)
}
export default Login;