require("dotenv").config();
const express = require("express");
const app = express();
const adminRouter = require("./api/admin/admin.router");
const userRouter = require("./api/users/user.router");
var cors = require("cors");

app.use(express.json());
app.use(express.static("upload"));

// // app.use(cors({ origin: "http://127.0.0.1/ReadBook/" }));

app.use((req, res, next) => {
  var userIP = req.socket.remoteAddress;
  var hostname = req.hostname;
  console.log(hostname);

  //   res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1/ReadBook/");
  //   if (req.headers.origin === "http://127.0.0.1/ReadBook/") next();
  //   else res.json({ success: 0, message: "not allow" });
  next();
});

app.get("/", (req, res) => {
  res.json({
    success: 1,
    message: "app is running",
  });
});
app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);

const PORT = process.env.PORT || process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running of port...${PORT}`);
});
