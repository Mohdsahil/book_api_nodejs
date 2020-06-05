require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const categoryRouter = require("./routes/category");
const bookRouter = require("./routes/book");
const reviewRouter = require("./routes/review");
var cors = require("cors");

app.use(express.json());
app.use(cors());
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

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", bookRouter);
app.use("/api", reviewRouter);

if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server is running of port...${PORT}`);
});
