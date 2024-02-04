const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;  
const {NoticiasServices }=require("../services");
const { Noticias,News} = require('../models');



    const getnoticias= async(req,res)=>{
        try {
            const [noticias,filesFromDB] = await NoticiasServices.getNoticias();
          
            const filesFromFS = await fs.readdir('uploads');
            console.log('Archivos en uploads:', filesFromFS);
 
            const imageUrls = filesFromDB
              .filter((fileFromDB) => filesFromFS.includes(fileFromDB.imagenes))
              .map((file) =>{
            return  noticias.map(x=>({
                id:x.id,
                titulo:x.titulo,
                contenido:x.contenido,
                categoryId:x.categoryId,
                fechaPublicacion:x.fechaPublicacion,
                ImageId: file.id,
                url: `${req.protocol}://${req.get('host')}/api/v1/noticias/${file.imagenes}`,
                video:file.video,
                noticiasId:file.noticiasId
            
            }))});
       
           // res.json({imageUrls});
                
            
              
         
           res.json({imageUrls}).status(200);
        } catch (error) {
      //   console.log('error al cargar los datos'); 
      console.error('Error al obtener las URLs de las imágenes:', error);
      res.status(500).send('Error al obtener las URLs de las imágenes');
        }
      
        
        } 



const postNoticias=async(req,res)=>{
    
  

try {
 
   
    
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No files were uploaded.' });
      }
    
      // Access the uploaded file using the name attribute (in this case, "file")
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({ message: 'No files were uploaded.' });
      }
    
      const EDFile = req.files.imagen;
      const uploadPath = `./uploads/${EDFile.name}`;
      
      if (!fs.existsSync('./uploads')) {
        fs.mkdirSync('./uploads');
      }
      
      EDFile.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).send({ message: err });
        }
    
        return res.status(200).send({ message: 'File uploaded successfully.' });
    });
   
    const imagenes = req.files.imagen.name;
   const video = req.body.video;
    const titulo = req.body.titulo;
    const seleccion = req.body.seleccion;
    const contenido = req.body.contenido;
    const datos=[{ titulo:titulo,
        contenido:contenido,
        seleccion:seleccion,
        imagenes:imagenes,
        video:video,
        }];

    const nuevaNoticia= await NoticiasServices.postNoticias(datos);
    const { rows: noticias, count: totalNoticias } = await Noticias.findAndCountAll();

    // Hacer algo con las noticias obtenidas, como imprimir sus títulos
    noticias.forEach(noticia => {
      console.log(noticia.titulo);
    });

    const newNews = await News.create({
        // Otros atributos de tu nueva noticia
        newsCount: totalNoticias // Establece newsCount en 10 (o cualquier otro valor que desees)
      });
    
  
    
  
     res.json({nuevaNoticia,newNews}).status(201);

} catch (err) {
    console.log('error al insertar los datos',err);
}


}
const putNoticias=async(req,res)=>{
try {
    const datos=req.body;
    const id=req.body.params;
    const n=await NoticiasServices.putNoticias(datos,id);
    res.json(n).status(201)
} catch (error) {
    
}


}
const deleteNoticias=async(req,res)=>{
try {
    const id=req.body.params;
    const n=await NoticiasServices.deleteNoticias(id);
    res.json(n).status(200);
} catch (err) {
    
}


}
const noticiasPrincipales= async (req,res)=>{
try {
    
    const filesFromDB= await NoticiasServices.getPrincipalNoticias();
    const filesFromFS = await fs.readdir('uploads');
    
    //filesFromDB.map((x)=>console.log('Archivos en uploads:',x.imagenVideo[index]));
    const imageUrls = filesFromDB.map((x,index)=>{
     return x.imagenVideo.filter((fileFromDB) => filesFromFS.includes(fileFromDB.imagenes))
      .map((file,index) =>{
       return filesFromDB.map(p=>({
        ImageId: file.id,
        url: `${req.protocol}://${req.get('host')}/api/v1/noticias/${file.imagenes}`,
        video:file.video,
        noticiasId:file.noticiasId,
        id:p.id,
        titulo:p.titulo,
        contenido:p.contenido,
        categoryId:p.categoryId,
        fechaPublicacion:p.fechaPublicacion,
        }))
    
    })})
   
    res.json(imageUrls).status(200);
} catch (error) {
    console.log('no puede cargar los datos');
}



}
const getNoticiasRecientes=async(req,res)=>{
try {
    const filesFromDB=await NoticiasServices.getNoticiasRecientes();
    const filesFromFS = await fs.readdir('uploads');
    
    //filesFromDB.map((x)=>console.log('Archivos en uploads:',x.imagenVideo[index]));
    const imageUrls = filesFromDB.map((x,index)=>{
     return x.imagenVideo.filter((fileFromDB) => filesFromFS.includes(fileFromDB.imagenes))
      .map((file,index) =>{
       return filesFromDB.map(p=>({
        ImageId: file.id,
        url: `${req.protocol}://${req.get('host')}/api/v1/noticias/${file.imagenes}`,
        video:file.video,
        noticiasId:file.noticiasId,
        id:p.id,
        titulo:p.titulo,
        contenido:p.contenido,
        categoryId:p.categoryId,
        fechaPublicacion:p.fechaPublicacion,
        }))
    
    })})

    
    res.json(imageUrls).status(200);
} catch (error) {
    console.log('error al cargar los datos');
}



}

    const  getByCat= async(req,res)=>{
try {
    const filesFromDB=await NoticiasServices.getByCategories();



const filesFromFS = await fs.readdir('uploads');
filesFromDB.map((x,index)=>x.noticias.map(p=>p.imagenVideo.map(z=>console.log(z.imagenes))));

const imageUrls = filesFromDB.map((x)=>{
   return x.noticias.map(p=>p.imagenVideo.filter((fileFromDB) => filesFromFS.includes(fileFromDB.imagenes))
        .map((file) =>({
            catId:x.id,
            name:x.name,
            id:p.id,
            titulo:p.titulo,
            contenido:p.contenido,
            categoryId:p.categoryId,
            fechaPublicacion:p.fechaPublicacion,
           
            ImageId: file.id,
            url: `${req.protocol}://${req.get('host')}/api/v1/noticias/${file.imagenes}`,
            video:file.video,
            noticiasId:file.noticiasId


        
        
    
    })




    ))});



res.json(imageUrls);
} catch (error) {
    console.error('Error al obtener noticias por categoría:', error);
}

}

const postContactos=async(req,res)=>{
try {
   const datos=req.body;
   const contacto=await NoticiasServices.PostContactos(datos);
   res.json(contacto).status(201);
} catch (error) {
    console.log('error al insertar los datos');
}

}
const getContactos=async(req,res)=>{
try{
const contacto=await  NoticiasServices.GetContactos();
res.json(contacto).status(200);
}catch(err){
console.log('error al cargar los datos');

}

}
const deleteContactos= async(req,res,next)=>{

try {
    const contactosId=req.params.id;
const eliminar= await NoticiasServices.deleteContactos(contactosId);
res.json(eliminar).status(201);
} catch (error) {
    next({
        status: 400,
        errorContent: error,
        message: "Algo salio mal",
      })
}


}

const getNoticiasId=async(req,res)=>{
try {
    const categoryId = req.params.id;
const filesFromDB=await NoticiasServices.getNoticiasId(categoryId);
const filesFromFS = await fs.readdir('uploads');
const imageUrls = filesFromDB.map(x=>{
return x.imagenVideo.filter((fileFromDB) => filesFromFS.includes(fileFromDB.imagenes))
.map((file) =>({
  id:x.id,
  titulo:x.titulo,
  contenido:x.contenido,
  categoryId:x.categoryId,
 fechaPublicacion:x.fechaPublicacion,
  ImageId: file.id,
  url: `${req.protocol}://${req.get('host')}/api/v1/noticias/${file.imagenes}`,
  video:file.video,
 noticiasId:file.noticiasId
}))});

res.json(imageUrls).status(200);
} catch (error) {
   console.log('error al cargar los datos o no encuentra el id') 
}


}
const getNews= async(req,res)=>{
try {
    const news=await NoticiasServices.getNews();
    res.json(news).status(200);
} catch (error) {
 console.error('Error al obtener datos de noticias:', error);
   res.status(500).json({ error: 'Error al obtener datos de noticias' });
}


}
const noticiasByCategories= async (req,res)=>{
try {
    const category=await NoticiasServices.getNoticasByCategory();
 res.json(category).status(200);
} catch (error) {
    console.log('no se cargan los datos');
}


}



module.exports={noticiasByCategories, deleteContactos, getNews,getnoticias,postNoticias,putNoticias,deleteNoticias,getByCat,postContactos,getContactos,noticiasPrincipales,getNoticiasRecientes,getNoticiasId}