// This file is used to create a connection to the MySQL database and execute queries.
// The executeQuery function is used to execute queries and return the results. The connection is created using the mysql2/promise package and the environment variables for the database connection details are read from the .env file.
import mysql from "mysql2/promise";

// Create the connection to database
const connection = await mysql.createConnection({
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	database: process.env.MYSQL_DATABASE,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
});

export default async function executeQuery({query, values}) {
	try {
		const [results] = await connection.query(query, values);
		return results;
	} catch (error) {
		console.error("MySQL Error:", error);
		return {error};
	}
}
