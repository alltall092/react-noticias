const db = require("../utils/db");
const { DataTypes } = require("sequelize");







const categories= db.define(
  "categories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
      }
   /* userId: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: 'id'
      }
    }*/

}

)
module.exports=categories;