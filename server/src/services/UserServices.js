const { Users } = require("../models");

class UserServices {
  static async create(user) {
    try {
      const result = await Users.create(user);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      const result = await Users.findAll();
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async  updatePassword(id,pass){

    try {
      const password=await Users.update({password:pass},
        {where:{id:id}
      
      });
      return password;
    } catch (error) {
      throw error;
    }
    
    
    }
static async deleteUser(id){
try {
  const borrar=await Users.destroy({where:{id:id}});
  return borrar;
} catch (error) {
  throw error;
}


}




}

module.exports = UserServices;
