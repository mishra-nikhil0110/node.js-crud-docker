const Sequalize = require("sequelize");


const sequalize = new Sequalize(

    'node_crud_proj',
    'postgres',
    'Postgres',
    {

        host: process.env.HOST,
        dialect: 'postgres',
    }

);

module.exports = sequalize;