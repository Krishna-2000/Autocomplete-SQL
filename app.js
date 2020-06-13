const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://localhost/queries";

const app = express();

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("connected..");
});

app.use(express.json());

const queryrouter = require("./routes/queryroutes");
app.use("/queries", queryrouter);

app.use("/", (req, res) => {
  res.sendFile(__dirname + "/editor.html");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 9000;
}

app.listen(port, () => {
  console.log("Server started");
});
