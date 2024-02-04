const db = require("../utils/db");
const { DataTypes } = require("sequelize");

const Contactos= db.define(
    "contactos",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      comentario: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      fechaPublicacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
  
     /* userId: {
        type: DataTypes.INTEGER,
        references: {
          model: Users,
          key: 'id'
        }
      }*/
  
  });
  module.exports=Contactos;