import express from "express";
import cors from "cors";
import routes from "./routes/index.routes";
import errorHandler from "./errors/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "aooba" });
});

app.use("/api", routes);
app.use(errorHandler);

app.listen(process.env.PORT || 3333, () => {
  console.log(`🚀 Server started on port ${process.env.PORT || 3333}!`);
});
