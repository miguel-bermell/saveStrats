require("dotenv").config();
const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 4000;

//Routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const stratsRouter = require("./routes/strats");

const loadModels = require("./models/relationship");
const tokenValidation = require("./middlewares/tokenValidation");

const server = express();
loadModels();

server.use(express.json());
server.use(tokenValidation);
server.use(express.static(path.join(__dirname, "public")));

server.use("/", indexRouter);
server.use("/users", usersRouter);
server.use("/strats", stratsRouter);
server.listen(PORT, () => console.log("Server running on port:", PORT));
