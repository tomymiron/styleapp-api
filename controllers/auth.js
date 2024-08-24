import { queryDatabase } from "../db/connect.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Account Login
export const login = (req, res) => {
  try {
    const { email, pass } = req.body;

    console.log(email, pass, "HOLAAA")
    if(email != null && emailRegex.test(email) && pass) {
        queryDatabase("call auth_login(?)", [email]).then((data) => {
          if(data[0].length > 0){
            console.log("FOUNT ACCOUNT")
            const checkPassword = bcrypt.compareSync(pass, data[0][0].password);
            if(!checkPassword) return res.status(400).json("Contraseña o usuario incorrectos!");


            const token = jwt.sign({ id: data[0][0].id }, process.env.SECRET_KEY);
            let {password, password_visible, ...user} = data[0][0];
            console.log({token, user});
            res.status(200).json({token: token, user: user});
          }
        }); 
    } else return res.status(400).json("Credenciales no validas");
  } catch (err) {
    return res.status(400).json("Ocurrió un error");
  }
};

// Account Register
export const register = (req, res) => {
  try {
    const { email, pass, fullname, nick } = req.body;

    if(email != null && emailRegex.test(email) && pass && fullname && nick) {

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(pass, salt);

      queryDatabase("call auth_register(?, ?, ?, ?, ?)", [fullname, email, hashedPassword, pass, nick]).then(data => {
        return res.status(200).json("Usuario creado con exito");
      }).catch (err => {
        console.log(err);
        return res.status(500).json("Ocurrio un error");
      });
    }else return res.status(400).json("Credenciales no validas para el registro");
  } catch (err) {
    return res.status(400).json("Ocurrió un error");
  }
};
