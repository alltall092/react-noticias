const { Router}=require('express');

const path = require('path');
const {noticiasByCategories,getNews,deleteContactos, getnoticias,getByCat,postContactos,getContactos,noticiasPrincipales,getNoticiasRecientes,getNoticiasId,postNoticias,putNoticias,deleteNoticias} = require('../controllers');
const router=Router();



router.get("/noticias",getnoticias);
router.get("/noticias/:id",getNoticiasId);
router.post("/noticias",postNoticias);
router.put("/noticias",putNoticias);
router.delete("/noticias",deleteNoticias);
router.get("/categories",getByCat);
router.post('/contactos',postContactos);
router.get('/contactos',getContactos);
router.delete("/contactos/:id",deleteContactos);
router.get('/noticiasprincipales',noticiasPrincipales);
router.get('/noticiasrecientes',getNoticiasRecientes);
router.get('/news',getNews);
router.get('/category',noticiasByCategories);



module.exports=router;