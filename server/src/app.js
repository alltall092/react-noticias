const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require('path');
const fs = require('fs');
const db = require("./utils/db");
const handleError = require("./middlewares/errorMiddlewares");
const initModels = require("./models/initModels");
const fileUpload=require('express-fileupload');
const { NoticiasRoutes,userRoutes,authRoutes} = require("./routes");
require("dotenv").config();
////const transporter = require("./utils/mailer");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
initModels();
app.use(fileUpload());




db.authenticate()
  .then(() => console.log("Autenticac..ión exitosa"))
  .catch((error) => console.log(error));

db.sync({ force: false })
  .then(() => console.log("Base de datos sincronizada"))
  .catch((error) => console.log(error));
//transporter.verify().then(()=>console.log("estamos listo para enviar correos"));
app.get("/", (req, res) => {
  console.log("Bienvenido al server  ");
  
  res.end();
});
app.use((err, req, res, next) => {
  // Manejo de errores aquí
  res.status(500).send('Something broke!');
});
app.use('/api/v1/noticias', (req, res, next) => {
  console.log('Solicitud recibida para:', req.url);
  next();
  req.url = decodeURIComponent(req.url);
  console.log(decodeURIComponent(req.url));
}, 
express.static(path.join(__dirname, 'uploads')));


app.use('/api/v1/noticias', express.static('uploads'));

app.use("/api/v1", userRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", NoticiasRoutes);
app.use(handleError);


module.exports = app;
