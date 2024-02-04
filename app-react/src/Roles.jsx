
import './register.css';
import { useForm } from "react-hook-form";
import axios from 'axios';
import React,{useState} from "react";
const Roles=()=>{
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
      } = useForm();
      const password = React.useRef({});
      password.current = watch("password", "");
      const enviar=(datos)=>{
axios.post('http://localhost:8000/api/v1/roles',{
username:datos.username,
email:datos.email,
password:datos.password,
roles:datos.roles}).then(res=>console.log('enviado con existo')).catch(err=>console.log('error no se enviar los datoas',err));


      }
      const onSubmit = (data) => enviar(data);
    

return(<>
<div className="container-fluid contener">
<div className="container">
        <div className="row res">

<div className="col-md-6 register">
    <h2 className="titulo">Formulario de Roles</h2>
<form onSubmit={handleSubmit(onSubmit)}>
<div className="form-group titulo">
    <label>Nombre Completo</label>
<input type="text"  {...register("username", { required: true })}
        aria-invalid={errors.username ? "true" : "false"} className={errors.username ? 'form-control input-error' : 'form-control'}
      />
      {errors.username?.type === "required" && (
        <p role="alert" style={{color:"red"}}>El Campo Nombre Esta Vacio</p>
      )} 
</div>
<div className="form-group titulo">
    <label>Email</label>
<input type="text" {...register("email", { required: true, pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'El correo electrónico no es válido',
          } })}
        aria-invalid={errors.email ? "true" : "false"} className={errors.email ? 'form-control input-error' : 'form-control'}
      />
      {errors.email?.type === "required" && (
        <p role="alert" style={{color:"red"}}>El Campo Email Esta Vacio</p>
      )} 
         {errors.email && <p style={{color:"red"}}>{errors.email.message}</p>}
</div>
<div className="form-group titulo">
<label>Roles</label>
<select className="form-select" aria-label="Default select example" style={{border:"2px solid blue"}} {...register("roles", { required: "Selecciona un rol" })}>
<option value="">--------</option>
<option value="administrador">Administrador</option>
<option value="clientes">Clientes</option>

</select>
{errors.roles && <p role="alert" style={{color:"red"}}>{errors.roles.message}</p>}

</div>
<div className="form-group titulo">
    <label>Password</label>
<input type="password" {...register("password", { required: true })}
        aria-invalid={errors.password ? "true" : "false"} className={errors.password ? 'form-control input-error' : 'form-control'}
      />
      {errors.password?.type === "required" && (
        <p role="alert" style={{color:"red"}}>El campo Password Esta Vacio</p>
      )}
</div>

<div className="form-group titulo">
    <label>Confirm Password</label>
<input type="password" className={errors.confirmPassword ? 'form-control input-error' : 'form-control'}
{...register("confirmPassword",{
  required: true,
  validate: (value) =>
    value === password.current || 'Las contraseñas no coinciden',
})}
aria-invalid={errors.confirmPassword ? "true" : "false"}
/>
{errors.confirmPassword?.type === "required" && (
<p role="alert" style={{color:"red"}}>El Campo Confirm Password Esta Vacio</p>
)}
 {errors.confirmPassword && <p style={{color:"red"}}>{errors.confirmPassword.message}</p>}
</div>
<div className="form-group titulo">
<button type="submit" className=" botton btn btn-primary">Registrarse</button>
</div>
</form>
</div>
</div>
 </div>
 </div>




</>)

}
export default Roles;