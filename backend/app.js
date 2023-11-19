import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleWare.js";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Redux POC App");
});

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB(
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  })
);
