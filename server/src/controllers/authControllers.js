const { AuthServices } = require("../services");

const userLogin = async (req, res, next) => {
  try {
    // email y password
    const credentials = req.body;
    const result = await AuthServices.authenticate(credentials);
    // false --> no era contraseña invalida
    // null --> no se encuentra al usuario
    // { isValid, result }
    if (result) {
      const {username, email } = result.result;
      const user = {username,email };
      const token = AuthServices.genToken(user);
      user.token = token;
      res.json({ ...user });
    } else {
      res.status(400).json({ message: "Información inválida" });
    }
  } catch (error) {
    /*next({
      status: 400,
      errorContent: error,
      message: "Email o contraseña inválida",
    });*/
    console.log(error);
  }
};

module.exports = {
  userLogin,
};
