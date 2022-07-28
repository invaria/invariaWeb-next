import { createUser } from "../../src/utils/storeFirebase";

export default async function handler(req, res) {
  if (req.method === 'POST' || req.body.idv_task_id !== undefined) {
    try {
      await createUser(req.body.idv_task_id, req.body)
      res.status(201).json("crearted")
    } catch (error) {
      res.status(417).json(error)
    }
  } else if (req.method === 'GET') {
    res.status(200).json("This is a response for GET. Try to POST.")
  }
}