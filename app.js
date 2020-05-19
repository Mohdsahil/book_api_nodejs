require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const adminRouter = require("./api/admin/admin.router");
// const userRouter = require("./api/users/user.router");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const categoryRouter = require("./routes/category");
const bookRouter = require("./routes/book");
const reviewRouter = require("./routes/review");

var cors = require("cors");

app.use(express.json());
app.use(express.static("upload"));

// mongoose db connect
mongoose
  .connect(process.env.MANGOOSE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB CONNECTED..!!"))
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.json({
    success: 1,
    message: "app is running",
  });
});

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", bookRouter);
app.use("/api", reviewRouter);

// app.use("/api/admin", adminRouter);
// app.use("/api/users", userRouter);

const PORT = process.env.PORT || process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running of port...${PORT}`);
});
