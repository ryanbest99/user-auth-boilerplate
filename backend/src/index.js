require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const connectDB = require("./db/mongoose");
const userRouter = require("./routers/users");

connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/auth", userRouter);

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV === "production") {
  // app.use(express.static(path.join(__dirname, "../../client/build")));
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname + "../../client", "build", "index.html")
    );
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
