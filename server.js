
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const db_url = process.env.DATABASE_URL || "postgres://"+process.env.POSTGRES_USER+":"+process.env.POSTGRES_PASSWORD+"@"+process.env.POSTGRES_HOST+":"+5432+"/"+process.env.POSTGRES_DB;
var pgp = require("pg-promise")(/*options*/);
var db = pgp(db_url);

app.get('/', (req, res) => {
    db.query("SELECT * from hello")
        .then(function (data) {
            let counter = data[0].counter;
            counter = counter + 1;
            db.query(`update hello set counter=${counter} where id=0`)
                .catch(function (error) {
                    console.log("ERROR:", error);
                });
            res.send(`Hello World! x${counter}`);
        })
        .catch(function (error) {
            console.log("ERROR:", error);
        });
})

db.query("drop table if exists hello; create table hello(id int primary key, counter int); insert into hello values(0,0);");

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(db_url);
})