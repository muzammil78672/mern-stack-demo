const cors = require("cors");
const express = require("express");
const next = require("next");
const mongoose = require("mongoose");

const server = express();
const router = express.Router();

const dev = process.env.NODE_ENV === "development";
const app = next({ dev, dir: "./src/frontEnd" });

const PORT = process.env.PORT || "3005";

// const DB_URL = "mongodb://localhost/demo";
const DB_URL = "mongodb://tmdb:Tmdb123@ds351428.mlab.com:51428/tmdb";

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    server.use(cors());
    server.use(express.json({ limit: "100mb" }));
    server.use(express.urlencoded({ extended: false }));

    require("./src/backEnd/routes")(router);

    server.use("/api", router);
    server.get("*", (req, res) => handle(req, res));

    server.use((err, req, res, next) => {
      console.error(err);
      const status = err.status || 500;
      const message = err.message || "Something failed!";
      res.status(status).send({
        message,
      });
    });

    server.listen(PORT, () => {
      mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log("Server started on port :", PORT);
    });
  })
  .catch(() => {
    process.exit(1);
  });
