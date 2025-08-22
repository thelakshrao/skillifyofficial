const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const dotenv = require("dotenv");
const AuthRouter = require("./Routes/AuthRouter");
const ProfileRouter = require("./Routes/ProfileRouter");
const progressRoutes = require("./Routes/courseProgress.routes");

dotenv.config();
require("./Models/db");

const PORT = process.env.PORT || 8000;

app.use(helmet());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  setHeaders: function (res, path) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
}));

app.use("/auth", AuthRouter);
app.use("/api/user", ProfileRouter);
app.use("/api/user/progress", progressRoutes);

app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

