const {noticiasByCategories,deleteContactos,getNews,getnoticias,postNoticias,putNoticias,deleteNoticias,noticiasPrincipales, getByCat,postContactos,getContactos,getNoticiasRecientes,getNoticiasId}=require('./NoticasControllers');
const {userLogin }=require('./authControllers');
const {userRegister,getAllUser,postUserRoles,updatePassword,deleteUser }=require('./userControllers');

module.exports={noticiasByCategories, deleteContactos,updatePassword,deleteUser,getNews,getnoticias,postNoticias,putNoticias,deleteNoticias, postUserRoles,userLogin,userRegister,getAllUser,noticiasPrincipales,getNoticiasRecientes,getByCat,postContactos,getContactos,getNoticiasId};