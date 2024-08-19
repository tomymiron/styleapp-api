import { queryDatabase } from "../db/connect.js";

export const getStore = (req, res) => {
  try {
    queryDatabase("call aa_get_store(?)", [1]).then((data) => {
        return res.status(200).json({...data[0][0], services: data[1], schedules: data[2], contact: data[3]});
    });
  } catch (err) {
    return res.status(400).json("Ocurrió un error");
  }
}