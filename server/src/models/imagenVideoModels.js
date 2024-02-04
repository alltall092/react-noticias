const Noticias  = require("./noticiasModels");
const db = require("../utils/db");
const { DataTypes } = require("sequelize");

const imagenVideo= db.define(
  "imagenVideo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
imagenes: {
        type: DataTypes.STRING,
        allowNull: false
      },
      video: {
        type: DataTypes.STRING,
        allowNull: false
      },
    noticiasId: {
      type: DataTypes.INTEGER,
      references: {
        model: Noticias,
        key: 'id'
      }
    }

}

)
module.exports=imagenVideo;