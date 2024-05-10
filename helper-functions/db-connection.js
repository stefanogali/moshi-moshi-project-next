import mysql from "serverless-mysql";

const db = mysql({
	config: {
		host: process.env.MYSQL_HOST,
		port: process.env.MYSQL_PORT,
		database: process.env.MYSQL_DATABASE,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
	},
});

export default async function executeQuery({query, values}) {
	try {
		const results = await db.transaction().query(query, values).commit(); // commit the transaction and send the query

		const [innerArray] = results;
		return innerArray;
	} catch (error) {
		console.error("MySQL Error:", error);
		return {error};
	}
}
