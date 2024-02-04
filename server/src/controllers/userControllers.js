const { UserServices } = require("../services");
//const transporter = require("../utils/mailer");
const { Users } = require("../models");
const userRegister = async (req, res, next) => {
  try {
    const newUser = req.body;
   

   const result = await UserServices.create(newUser);
    res.status(201).json(result);
    /*await transporter.sendMail({
      from: "alltall659@gmail.com",
      to: result.email,
      subject: "Welcome to the best chat app ever",
      text: `Hello ${result.username}`,
      html: `<h1>Hello ${result.username}</h1>`,
    });*/
  } catch (error) {
    console.log(error);
    next({
      status: 400,
      errorContent: error,
      message: "Faltan datos",
  });
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await UserServices.getAll();
    res.json(users);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "Algo salio mal",
    });
  }
};
const postUserRoles=(req,res,next)=>{
  try {
    const {username,email,password,roles} = req.body;
    const user= Users.create({
      username: username,
      email: email,
      password: password,
      roles: roles,// Valor por defecto para el campo roles
    }).then(newUser => {
      res.json(`Usuario creado: ${newUser}`).status(200);
    }).catch(err => {
      console.error('Error al crear usuario:', err);
    });
 const user2= Users.update(
  { roles: roles }, // Define los campos que deseas actualizar y sus nuevos valores
  { 
    where: { email: email } // Especifica la condición para encontrar el usuario que deseas actualizar
  }
  ).then(result => {
  res.json(`Usuario actualizado: ${result}`).status(200);
  }).catch(err => {
  console.error('Error al actualizar usuario:', err);
  });
  res.json({user,user2}).status(201);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "Algo salio mal",
    });
  }
 
}
const updatePassword= async(req,res,next)=>{
try {
const {password}=req.body;
const id=req.params.id;
  const cambiarPassword=await UserServices.updatePassword(id,password);
  res.json(cambiarPassword).status(200);
} catch (error) {
  next({
    status: 400,
    errorContent: error,
    message: "Algo salio mal",
  });
}

}
const deleteUser=async(req,res,next)=>{
try {
  const id=req.params.id;
  const borrarUser=await UserServices.deleteUser(id);
  res.json(borrarUser).status(200);
} catch (error) {
  next({
    status: 400,
    errorContent: error,
    message: "Algo salio mal",
  });
}




}



module.exports = {
  userRegister,
  getAllUser,
  postUserRoles,
  updatePassword,
  deleteUser,
};
