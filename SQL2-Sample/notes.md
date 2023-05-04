This sample is for connecting NodeJs app to MySql database using SQL2 package https://www.npmjs.com/package/mysql2

1- to install it in use the following command `npm i --save mysql2`

to connect tot he database and run certain command you need to create , open connection then close it after you are done
creating a new connection and open it every time you need to execute command is time consuming 

so to enhance performance  reduce the time spent connecting to the MySQL server this package has CONNECTION POOL
by reusing a previous connection, leaving them open instead of closing when you are done with them.
This improves the latency of queries as you avoid all of the overhead that comes with establishing a new connection.