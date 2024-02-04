
const {News,Categories,Noticias,Contactos,ImagenVideo}=require('../models');
const fs = require('fs').promises; 
const guardar= async(noticiasId,datos)=>{

  const imagen=[{  imagenes:datos.imagenes,
    video:datos.video,
    // Otros campos de la imagen o video
    noticiasId:noticiasId.id}];
// Crear una nueva imagen o video asociada a la noticia
const nuevaImagenVideo = await ImagenVideo.bulkCreate(imagen);
return nuevaImagenVideo;


}


class NoticiasServices{
 
static  async getNoticias(){
// Supongamos que tienes el ID de la categoría de la que quieres obtener las noticias
 // ID de la categoría de ejemplo

try {
  // Busca todas las noticias que pertenecen a la categoría con el ID especificado
  const noticiasDeCategoria = await Noticias.findAll();
  const imagen=await ImagenVideo.findAll();



  
  return[ noticiasDeCategoria,imagen];
} catch (error) {
  console.error('Error al buscar las noticias por categoría:', error);
}


}
static async getPrincipalNoticias(){
try {
  const noticiasPrincipales = await Noticias.findAll({
    attributes: ['id','titulo', 'contenido', 'fechaPublicacion'],
    order: [['fechaPublicacion', 'DESC']], // Ordenar por fecha en orden descendente
    limit: 5, // Obtener las 5 noticias principales (ajusta según tus necesidades)
    include: 'imagenVideo', 
  });
  
  return noticiasPrincipales;
} catch (error) {
  throw error;
  
}



}
static async getNoticiasRecientes(){
try {
    // Realizar la consulta a la base de datos
    const noticiasRecientes = await Noticias.findAll({
      attributes: ['id', 'titulo', 'contenido', 'fechaPublicacion'],
      order: [['fechaPublicacion', 'DESC']], // Ordenar por fecha en orden descendente
      include: 'imagenVideo', 
      limit: 5, // Limitar a las 10 noticias más recientes (ajusta según tus necesidades)
    });
    return noticiasRecientes;
} catch (error) {
  throw error;
}


}
static async postNoticias(datos){
  try {
  const noti=datos.forEach(async(x)=>{
  
      
   const noticia=[{titulo:x.titulo,
    contenido:x.contenido,
    categoryId:x.seleccion}];

    const nuevaNoticia = await Noticias.bulkCreate(noticia);
    return nuevaNoticia.forEach(async(s) =>{
    
    const results= await guardar(s,x);
    
    return results;
    });

   })
  
    // Devolver la noticia y la nueva imagen o video
    return noti;
  } catch (error) {
    throw error;
  }
  


}
static async putNoticias(datos,id){
try {
  const noticias=await Noticias.update(datos,{where:{id:id}});
  return noticias;
  
} catch (error) {
  
}


}
static async deleteNoticias(id){
try {
  const noticias=await Noticias.destroy({where:{id:id}});
  return noticias;
} catch (error) {
  
}


}
static async getNoticiasId(id){
try {
  const noticiasDeCategoria = await Noticias.findAll({
    include:'imagenVideo',
    where:{id:id},
    
  });
  return noticiasDeCategoria;


} catch (error) {
  throw error;
}


}
static  async getByCategories(){
try {
    const categorias = await Categories.findAll({  include: [
      {
        model: Noticias,
        include: [
          {
            model: ImagenVideo,
            as: 'imagenVideo' // Alias definido en la relación Noticia.hasMany(ImagenVideo)
          }
        ],
        limit: 6,
        separate: true, // Para aplicar el límite solo a las noticias
        required: false // Dependiendo de tu lógica, puedes ajustar este valor
      }
    ]});

  
    
    return categorias;
} catch (error) {
    throw error;
}



}
static async PostContactos(datos){

try {
  const contact= await Contactos.create(datos);
  return contact;
} catch (error) {
  throw error;
}

}

static async GetContactos(){
try {
  const contact=await Contactos.findAll();
  return contact;
} catch (error) {
  throw error;
}


}
static async deleteContactos(id){
try {
  const contacto=await Contactos.destroy({where:{id:id}});
  return contacto;
} catch (error) {
  throw error;
}


}


static async getNews(){
  try {
    const newsData = await News.findAll();
    const formattedData = newsData.map(news => {
      const month = new Date(news.fecha).toLocaleString('default', { month: 'long' });
      return [month, news.newsCount];
    });
    return formattedData;
  } catch (error) {
   // console.error('Error al obtener datos de noticias:', error);
   // res.status(500).json({ error: 'Error al obtener datos de noticias' });
   throw error;
  }


}
static async getNoticasByCategory(){
try {
  const category=await Categories.findAll();
  return category;
} catch (error) {
  throw error;
}


}


}

module.exports= NoticiasServices;