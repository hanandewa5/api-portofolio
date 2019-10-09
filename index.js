require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cool = require("cool-ascii-faces");
const app = express();
const port = process.env.PORT || 5000;
const userDB = require("./services/userServices");
const portoDB = require("./services/portofolioServices");
const cors = require("cors");
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.get("/", (request, response) => {
    response.json({ info: "Node.js, Express, and Postgres API" });
});

// ? Untuk ambil file dari folder public
app.use(express.static(path.join(__dirname, 'public')));


// USERS
app.get("/users", userDB.getUsers);
app.get("/users/:id", userDB.getUserById);
app.post("/users", userDB.createUser);
app.put("/users/:id", userDB.updateUser);
app.delete("/users/:id", userDB.deleteUser);

// ? PORTOFOLIO
app.get("/portofolio", portoDB.getPortofolio);
app.get("/portofolio/:id", portoDB.getPortofolioById);
app.post("/portofolio", portoDB.createPortofolio);
app.put("/portofolio/:id", portoDB.updatePortofolio);
app.delete("/portofolio/:id", portoDB.deletePortofolio);

app.get("/cool", (req, res) => {
    console.log("us", process.env.PORT);
    return res.send(cool());
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
