// En el archivo de definición de modelos (puede estar en otro archivo)
const Noticia = require('./noticiasModels');
const Categoria = require('./categoriesModels');
const Usuario = require('./userModels');
const ImagenVideo = require('./imagenVideoModels');
const Contactos=require('./contactoModels');
//const Etiqueta = require('./Etiqueta');
//const LikeFavorito = require('./LikeFavorito');
const initModels = () => {

Categoria.hasMany(Noticia);
Noticia.belongsTo(Categoria, { foreignKey: 'categoryId' });
Noticia.belongsTo(Usuario); // Una noticia es creada por un usuario
Usuario.hasMany(Noticia); // Un usuario puede crear muchas noticias

Noticia.hasMany(ImagenVideo,{  foreignKey: 'noticiasId',  as: 'imagenVideo' }); // Una noticia puede tener muchas imágenes/videos
ImagenVideo.belongsTo(Noticia, { foreignKey: 'noticiasId', as: 'noticia' }); // Una imagen/video pertenece a una noticia
Contactos.hasOne(Usuario);
Usuario.belongsTo(Contactos);


//Noticia.belongsToMany(Etiqueta, { through: 'NoticiaEtiqueta' }); // Una noticia puede tener muchas etiquetas
//Etiqueta.belongsToMany(Noticia, { through: 'NoticiaEtiqueta' }); // Una etiqueta puede pertenecer a muchas noticias

//Usuario.belongsToMany(Noticia, { through: LikeFavorito, as: 'NoticiasFavoritas' }); // Un usuario puede marcar muchas noticias como favoritas
//Noticia.belongsToMany(Usuario, { through: LikeFavorito }); // Una noticia puede ser marcada como favorita por muchos usuarios
}
module.exports=initModels;