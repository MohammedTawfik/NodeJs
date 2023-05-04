const mysql2 = require('mysql2');

const connectionPool = mysql2.createPool({
    host:'localhost',
    user: 'root',
    database: 'nodesample',
    password: 'Windows.2000'
});

module.exports = connectionPool.promise();