import { Router } from "express";

const router = Router();

router.post("/teste", (req, res) => {
  return res.status(201).json({ message: "aooba" });
});

export { router };
