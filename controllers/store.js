import { queryDatabase } from "../db/connect.js";

export const getStore = (req, res) => {
  try {
    const { storename } = req.query;
    if(storename === undefined) return res.status(404).json("Not storename getted")
    queryDatabase("call aa_get_store(?)", [storename]).then((data) => {
        return res.status(200).json({...data[0][0], services: data[1], schedules: data[2], contact: data[3]});
    });
  } catch (err) {
    return res.status(400).json("Ocurrió un error");
  }
}

export const getStoreBooking = (req, res) => {
  try {
    const { storename } = req.query;
    if(storename === undefined) return res.status(404).json("Not storename getted")
    queryDatabase("call aa_get_store_booking(?)", [storename]).then((data) => {
        return res.status(200).json({...data[0][0], services: data[1], schedules: data[2]});
    });
  } catch (err) {
    return res.status(400).json("Ocurrió un error");
  }
}