import { queryDatabase } from "../db/connect.js";
import jwt from "jsonwebtoken";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[a-zA-Z\s]{2,}$/;

export const newBook = (req, res) => {
  try {
    const { datetime, services, client, comment } = req.body;
    console.log(client, datetime, services, comment);

    if(datetime && services.length > 0 && client && client?.email != null && emailRegex.test(client?.email) && client?.name != null && nameRegex.test(client?.name)) {
        queryDatabase("call bb_new_book(?, ?, ?, ?, ?, ?)", [client.email, client.social?.trim() == "" ? null : client.social, client.name, datetime, comment?.trim() == "" ? null : comment, JSON.stringify(services)]).then((data) => {
            return res.status(200).json("Reserva realizada con exito");
        }); 
    } else return res.status(400).json("Los datos no fueron validos");
  } catch (err) {
    console.log(err)
    return res.status(400).json("Ocurrió un error");
  }
}

export const getBookedTimes = (req, res) => {
  try {
    const { date } = req.query;

    if(date) {
      queryDatabase("select bb_get_booked_times(?)", [date]).then(data => {
        console.log(data[0][Object.keys(data[0])[0]]);
        return res.status(200).json(data[0][Object.keys(data[0])[0]]);
      })
    } else return res.status(400).json("Ingresa una fecha valida");
  } catch (err) {
    return res.status(400).json("Ocurrió un error");
  }
}

export const getBooks = (req, res) => {

  console.log("ENTRE")
  try {
    const token = req.headers['authorization'];
    if(!token) return res.status(401).json("Not logged in");

    const { orderLast } = req.query;
    console.log(orderLast)

    jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
      queryDatabase("call bb_get_books(?, ?)", [userInfo.id, orderLast ? orderLast : false]).then(data => {
        console.log(data[0], userInfo.id);
        return res.status(200).json(data[0]);
      })
    });

  } catch (err) {
    console.log(err)
    return res.status(400).json("Ocurrió un error");
  }
}


