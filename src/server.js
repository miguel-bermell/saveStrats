require("dotenv").config();
const express = require("express");
const path = require("path");
const loadModels = require("./models/relationship");
const PORT = process.env.PORT || 4000;

const server = express();
loadModels();

//Routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const stratsRouter = require("./routes/strats");

server.use(express.json());
server.use(express.static(path.join(__dirname, "public")));

server.use("/", indexRouter);
server.use("/users", usersRouter);
server.use("/strats", stratsRouter);
server.listen(PORT, () => console.log("Server running on port:", PORT));
