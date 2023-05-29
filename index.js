const express = require('express');
const bodyparser = require('body-parser');
const sequelize = require('./util/database');
const User = require('./models/user');
const dotenv = require("dotenv");
const { Client } = require('pg')

const app = express();
const port = 3443;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});


const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'node_crud_proj',
    password: "Postgres",
    port: 5432,
})
client.connect(function (err) {
    if (err) throw err;
    console.log("DATABASE Connected Successfully !");
});
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})


//test route

app.get('/', (req, res, next) => {
    res.send('Hello World');
});

//CRUD routes
app.use('/users', require('./routes/users'));

//error handling
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});


// //sync database
sequelize
    .sync()
    .then(result => {
        console.log("Database connected");
        app.listen(3000);
    })
    .catch(err => console.log(err));