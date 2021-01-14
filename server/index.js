const express = require("express");
const colors = require("colors");
const bodyParser = require("body-Parser");
const mongoose = require("mongoose");
const players = require("./controllers/players");
const users = require("./controllers/users");
const logins = require("./controllers/logins");
const registerPlayers = require("./controllers/registerPlayers");
const dotenv = require("dotenv");
const app = express();

// Middleware
const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};

// Cores Middleware
const cors = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept,Authorization,Origin"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

app.use(bodyParser.json());
app.use(cors);
app.use(logging);

dotenv.config();

const DB_CONNECT = process.env.DB_CONNECT || "mongodb://localhost/players";

//data stuff
mongoose.connect(DB_CONNECT, () => console.log("Database connected"));
// mongoose.connect("mongodb://localhost/rez", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });
mongoose.set("useFindAndModify", false);
const db = mongoose.connection;

let db_status = "MongoDB connection not successful.";
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => (db_status = "Successfully opened connection to Mongo!"));
app.route("/").get((request, response) => {
  response.send("HELLO WORLD");
});
app.get("/status", (request, response) => {
  response.send(JSON.stringify({ message: "Service running ok" }));
});

app
  .route("/posts")
  .get((request, response) => {
    // express adds a "params" Object to requests
    const id = request.params.id;
    let data = "The ID equals " + id;
    // handle GET request for post with an id of "id"
    if (request.query) {
      if (request.query.type) {
        if (request.query.type === "json") {
          data = { id: request.params.id, q: request.query };
        }
      }
    }
    response.status(418).json(data);
  })
  .post((request, response) => {
    response.json(request);
  });

//Routes
app.use("/players", players);
app.use("/registerPlayers", registerPlayers);
app.use("/users", users);
app.use("/logins", logins);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`.yellow.bold));
