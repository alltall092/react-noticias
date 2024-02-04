const db = require("../utils/db");
const { DataTypes } = require("sequelize");
//const Users=require("./users.models");





const Categories=require('./categoriesModels.js');
const Noticias = db.define(
  "noticias",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fechaPublicacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },

    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Categories,
        key: 'id'
      }
    }

}

)
module.exports=Noticias;