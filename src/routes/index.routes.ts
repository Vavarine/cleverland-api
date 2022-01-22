import { Router } from "express";

const routes = Router();

routes.get("/teste", (req, res) => {
  return res.status(201).json({ message: "teste" });
});

export default routes;
