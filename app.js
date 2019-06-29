require("dotenv");

const express = require("express");
const app = express();

const morgan = require("morgan");

const passport = require("passport");

app.use(express.json);
app.use(morgan("common"))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    if(req.method === 'OPTIONS'){
        return res.sendStatus(204);
    }
    next();
});

let server;

function runServer(port = 3000) {
    server = app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

function closeServer() {
    server = app.close(err => {
        if(err) {
            return console.error(err);
        }
        console.log(`Server terminated at ${Date.now()}`);
    });
}

if(require.main === module) {
    runServer();
}

module.exports = {app, runServer, closeServer, server};