import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import entryRoutes from "./routes/entryRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/auth", authRoute);
app.use("/entries", entryRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Memento API running...");
}); 

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});


export default app;
