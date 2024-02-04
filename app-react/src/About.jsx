import Footer from "./Footer";
import Header from "./Header";
import './about.css';
import { useState,useEffect } from "react";
const About=()=>{
  const [isVisible, setIsVisible] = useState(true);
/*
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const shouldBeVisible = currentScrollPos > 100; // Cambia esto a la posición de scroll deseada
      setIsVisible(shouldBeVisible);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);*/
return(<>
<Header/>
<div class="contenedor5">
    <div class="overlay">
      <h1>Noticias de Alto Nivel</h1>
      <p>Sumérgete en un mundo de información refinada y actual.</p>
    </div>
    <img src="./imagenes/ingenio1.jpg" className="img" alt="Imagen de fondo"/>

   
  </div>
  <div className="container-fluid ct">
  
      
      <div className="conatainer">
  <div className="row">
    <div className="col-md-6">
  
      <img
        src="./imagenes/ingenio2.webp"
        alt="Descripción de la imagen"
        className="zoom-img "
        
      />

    
    </div>
    <div className="col-md-6">
      
      <h2>Historia de Ingenio boca de nigua</h2>
    <p className="parra">El ingenio Boca de Nigua es una infraestructura colonial que se construyó a mediados del año 1600 para el procesamiento de azúcar, donde predominaba la utilización de mano de obra esclava. En este lugar, también, se protagonizó la histórica rebelión de los esclavos contra los españoles en el año 1796.</p>
<p className="parra">Las ruinas forman parte de un conjunto de obras coloniales, entre las que se encuentran las ruinas del ingenio Diego Caballero, y la Iglesia San Gregorio. Ésta edificación, propiedad del duque de Aranda, es una construcción que data del siglo XVI y forma parte esencial de los primeros ingenios coloniales de América, época en que la isla estaba bajo el dominio español.

El antiguo ingenio de Boca de Nigua fue declarado por la Organización de las Naciones Unidas (ONU) como Patrimonio Cultural de la Humanidad, dentro del proyecto “Los primeros ingenios coloniales azucareros de América”. Desde el año 2005 solo se ven sus escombros y piedras. Poco queda del lugar donde se protagonizó la histórica rebelión de los negros esclavos contra los españoles, en el año 1796.

El ingenio Boca de Nigua es una infraestructura colonial que se construyó a mediados del 1600 para el procesamiento de azúcar, donde predominaba la utilización de mano de obra esclava.

Por la severidad de los trabajos y el alto nivel de explotación, los esclavos que eran asignados a este ingenio, no pasaban de siete años de labor.</p>

    </div>

    </div>
    <div className="row">
      <div className="col-md-6">
<h2>Caracteristica</h2>
<p className="parra">Un camino angosto, rodeado de hierba, plagado de hoyos y piedras, da acceso a las ruinas de lo que fuera el majestuoso Ingenio Nigua, una construcción colonial que en su época procesaba en sus 12 calderas la caña para convertirla en azúcar. Las instalaciones fueron remodeladas en el año 1979. De las 12 calderas que poseía, seis fueron remozadas, las otras seis fueron dejadas intactas para que los visitantes las puedan conocer en su forma original. En el espacio que ocupa, se puede apreciar la casa de Pulga, parcialmente remodelada. En la parte trasera quedan restos del trapiche donde los bueyes molían la caña. En la casa principal aún quedan los cimientos de los pisos.</p>
<p className="parra">Según narra la tradición hubo en la zona una de las revueltas de esclavos más tardías de la parte española de la isla y de Santo Domingo. El ingenio fue originado para la colonia francesa, luego de la sesión de Santo Domingo a Francia por el tratado de Basilea. Tenía trapiche de planta poligonal, casa de calderas de gran tamaño, canaletas y pasos de bóvedas para el jugo o guarapo, con sótano para calderas y fogones, con bellos arcos.

El secadero es un depósito con torre, dentro de la cual funcionaban los almacenes de azúcar.

Esta ubicado en la margen occidental del río Nigua, aproximadamente a un kilometro de su desembocadura. Este ingenio constituye la obra más importante realizada en Nigua durante el siglo XVIII y una de las más importantes de la colonia.

El Ingenio Boca de Nigua, fue restaurado y forma parte esencial de la ruta de los primeros ingenios coloniales de América. Allí se celebra el “Festival de Cimarronaje” desde el año 1989, donde se destacan los valores de la cultura afro-americana.</p>
      </div>
      <div className="col-md-6">
  
      <img
        src="./imagenes/register2.jpg"
        alt="Descripción de la imagen"
        className="zoom-img"
        
      />

    
    </div>
    <div className="container">
<div className="row">
  <div className="col-md-12">
<img src="./imagenes/mapa2.jpg" height="400" width="1500"/>
<h3>Ubicacion</h3>
<p className="parra">El histórico ingenio está localizado en el municipio San Gregorio de Nigua, provincia San Cristóbal, rodeado, al este por el arroyo Agua Dulce y las secciones Ingenio Nuevo y Sainaguá, al norte por el Arroyo Seco y la sección Hatillo y al sur por el mar Caribe.</p>
</div>

    </div>
    </div>
</div>
</div>
</div>

<Footer/></>)

}
export default About;