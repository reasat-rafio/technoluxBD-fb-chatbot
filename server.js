const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const app = express();

const web = require("./routes/web");

// Middleware
app.use(express.static("./public"));

// Set ejs as view engin
app.set("view engine", "ejs");
// app.set("views", "./views");

app.use("/", web);

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
