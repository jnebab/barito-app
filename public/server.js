const mysql = require('mysql');
// const formidable = require('formidable');
// const static = require('node-static');
// const file = new static.Server('./public');
// const { parse } = require('querystring');
// const fs = require('fs');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'relikez5',
	database: 'baritodb',
	debug: false,
	multipleStatements: true
});
connection.connect((err) => {
	if (err) throw err;
    console.log("mysql connected!");
});

const handlers = {};

handlers["/"] = (req, res) => {
	res.writeHead(200, { 'Content-Type' : 'text/html'})
	res.end('hello world!');
}

handlers["/add-equipment"] = (req, res) => {
	if(req.method === "POST") {
		let body = '';
		req.on('data', chunk => {
				body += chunk.toString(); // convert Buffer to string
		});
		req.on('end', () => {
				const { equipment_brand, equipment_unit, equipment_model, equipment_serial, equipment_description, equipment_status } = JSON.parse(body);
				const equipment = `${equipment_brand} ${equipment_unit} ${equipment_model}`;
				connection.query("INSERT INTO equipment_tbl(eq_brand, eq_unit, eq_model, eq_serial, eq_description, eq_status) VALUES (?, ?, ?, ?, ?, ?); INSERT INTO transaction_history_tbl(transaction_type, transaction_date, transaction_user, transaction_item) VALUES (?, ?, ?, ?);", [ equipment_brand, equipment_unit, equipment_model, equipment_serial, equipment_description, equipment_status, 'add', new Date(), null, equipment ], (err, result, fields) => {
					if (err) throw err.message;
						console.log("new equipment added: " + result.affectedRows);  
				})
				res.end();
		});
	}
}

handlers["/reserve-equipment"] = (req, res) => {
	if(req.method === "POST") {
		let body = '';
		req.on('data', chunk => {
				body += chunk.toString(); // convert Buffer to string
		});
		req.on('end', () => {
				const { equipment_name, reservee_name, reservee_office, reservee_purpose, date_to_use, date_to_pickup } = JSON.parse(body);
				const id = parseInt(equipment_name.split(")")[0], 10);
				const sql = "INSERT INTO reserved_equipment_tbl(eq_id, reservee_name, reservee_office, reservee_purpose, date_to_use, date_to_pickup) VALUES (?, ?, ?, ?, ?, ?); UPDATE equipment_tbl SET eq_status = 'reserved' WHERE eq_id = ?; INSERT INTO transaction_history_tbl(transaction_type, transaction_date, transaction_user, transaction_item) VALUES (?, ?, ?, ?);"; 
				connection.query(sql, [ id, reservee_name, reservee_office, reservee_purpose, date_to_use, date_to_pickup, id, 'reserve', new Date(), null, equipment_name ], (err, result, fields) => {
					if (err) throw err.message;
					console.log("reserved equipment inserted: " + result.affectedRows);
				})
				res.end();
		});
	}
}

handlers["/borrow-equipment"] = (req, res) => {
	if(req.method === "POST") {
		console.log("it is here!");
		let body = '';
		req.on('data', chunk => {
				body += chunk.toString(); // convert Buffer to string
		});
		req.on('end', () => {
				console.log("Then here!")
				const { equipment_name, borrower_name, borrower_office, borrower_purpose, borrower_signature,releasing_personnel_name, releasing_personnel_signature, borrowed_date, expected_return_date } = JSON.parse(body);
				const id = parseInt(equipment_name.split(")")[0], 10);
				const sql = "INSERT INTO borrowed_equipment_tbl(eq_id, borrower_name, borrower_office, borrower_purpose, borrower_signature, releasing_personnel_name, releasing_personnel_signature, borrowed_date, expected_return_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?); UPDATE equipment_tbl SET eq_status = 'borrowed' WHERE eq_id = ?; INSERT INTO transaction_history_tbl(transaction_type, transaction_date, transaction_user, transaction_item) VALUES (?, ?, ?, ?);";
				connection.query(sql, [id, borrower_name, borrower_office, borrower_purpose, borrower_signature, releasing_personnel_name, releasing_personnel_signature, borrowed_date, expected_return_date, id, 'borrow', new Date(), releasing_personnel_name, equipment_name], (err, result, fields) => {
					if (err) throw err.message;
						console.log("borrowed equipment inserted: " + result);
				})
				res.end();
		});
	}
}

handlers["/return-equipment"] = (req, res) => {
	if(req.method === "POST") {
		let body = '';
		req.on('data', chunk => {
				body += chunk.toString(); // convert Buffer to string
		});
		req.on('end', () => {
				const { equipment_name, borrower_name, date_borrowed, returnee_name, returnee_signature, receiving_personnel_name, receiving_personnel_signature, returned_date, remarks } = JSON.parse(body);
				const bname = borrower_name;
				const bdate = date_borrowed;
				let equipmentID = null;
				let borrowedID = null;
				connection.query("SELECT eq_id, borrowed_id from borrowed_equipment_tbl WHERE borrower_name = '?' AND borrowed_date = '?'", [ bname, bdate ], (err, result, fields) => {
					if (err) throw err.message;
					equipmentID = result[0].eq_id;
					borrowedID = result[0].borrowed_id;
				})
				connection.query("UPDATE borrowed_equipment_tbl SET returnee_name = '?', returnee_signature = '?', receiving_personnel_name = '?', receiving_personnel_signature = '?', returned_date = '?', remarks = '?' WHERE borrowed_id='?'; INSERT INTO transaction_history_tbl(transaction_type, transaction_date, transaction_user, transaction_item) VALUES (?, ?, ?, ?);" , [ returnee_name, returnee_signature, receiving_personnel_name, receiving_personnel_signature, returned_date, remarks, borrowedID, 'return', new Date(), receiving_personnel_name, equipment_name ], (err, result, fields) => {
					if (err) throw err.message;
						console.log("Number of records inserted: " + result.affectedRows);
						res.write("Number of records updated: " + result.affectedRows);
				})
				connection.query("UPDATE equipment_tbl SET eq_status = 'reserved' WHERE eq_id == ?", [equipmentID], (err, result, fields) => {
					console.log("return equipment updated: " + result.affectedRows);
				})
				res.end();
		});
	}
}

handlers["/available-equipments"] = (req, res) => {
	if(req.method == "GET") {
		connection.query("SELECT * FROM equipment_tbl WHERE eq_status = 'available'", (err, result, fields) => {
			if (err) throw err.message;
				res.end(JSON.stringify(result));
		})
	};
};

handlers["/borrowed-equipments"] = (req, res) => {
	if(req.method === "GET") {
		connection.query("SELECT * FROM borrowed_equipment_tbl; SELECT * FROM equipment_tbl", (err, result, fields) => {
			if (err) throw err.message;
				res.end(JSON.stringify(result));  
		})
	};
}

handlers["/reserved-equipments"] = (req, res) => {
	if(req.method === "GET") {
		connection.query("SELECT * FROM equipment_tbl WHERE eq_status = 'reserved'", (err, result, fields) => {
			if (err) throw err.message;
				res.end(JSON.stringify(result));  
		})
	};
}

handlers["/transaction-history"] = (req, res) => {
	if(req.method === 'GET') {
		connection.query("SELECT * FROM transaction_history_tbl;", (err, result, fields) => {
			if (err) throw err.message;
				res.end(JSON.stringify(result));
		})
	};
}

require('http').createServer((req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	if(handlers[req.url]) {
		res.writeHead(200, {"Content-Type":"application/json"});
		handlers[req.url](req, res);
	}
	else {
		res.writeHead(404, {"Content-Type": "text/html"});
		res.end("404 Not Found");
	}
}).listen(8001);
console.log("The server is now running...");
