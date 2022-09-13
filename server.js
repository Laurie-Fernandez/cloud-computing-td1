
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://"+process.env.POSTGRES_USER+":"+process.env.POSTGRES_PASSWORD+"@"+process.env.POSTGRES_HOST+":"+port+"/"+process.env.POSTGRES_DBT);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

db.query("SELECT $1 AS value", 123)
    .then(function (data) {
        console.log("DATA:", data.value);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})