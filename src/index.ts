import express from "express";

import mapRouter from "./routes/maps";

const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/", (_, res) => {
  res.send("Hello Metaverse!");
});

app.use("/map", mapRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
