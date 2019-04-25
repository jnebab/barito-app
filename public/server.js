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
				const { equipment_name, equipment_serial, equipment_description, equipment_status } = JSON.parse(body);
				connection.query("INSERT INTO equipment_tbl(eq_name, eq_serial, eq_desc, eq_status) VALUES (?, ?, ?, ?)", [ equipment_name, equipment_serial, equipment_description, equipment_status ], (err, result, fields) => {
					if (err) throw err.message;
						console.log("Number of records inserted: " + result.affectedRows);  
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
				const unit = equipment_name.split(" ")[1];
				const model = equipment_name.split(" ")[2];
				let equipmentID = null;
				connection.query("SELECT eq_id from equipment_tbl WHERE eq_unit == '?' AND eq_model = ?", [ unit, model ], (err, result, fields) => {
					if (err) throw err.message;
						equipmentID = result[0].eq_id;
				})
				connection.query("INSERT INTO reserved_equipment_tbl(eq_id, reservee_name, reservee_office, reservee_purpose, date_to_use, date_to_pickup) VALUES (?, ?, ?, ?, ?, ?)", [ equipmentID, reservee_name, reservee_office, reservee_purpose, date_to_use, date_to_pickup ], (err, result, fields) => {
					if (err) throw err.message;
						console.log("Number of records inserted: " + result.affectedRows);
						res.write("Number of records inserted: " + result.affectedRows);
				})
				connection.query("UPDATE equipment_tbl SET eq_status = 'reserved' WHERE eq_id == ?", [equipmentID], (err, result, fields) => {
					console.log("Number of records updated: " + result.affectedRows);
				})
				res.end();
		});
	}
}

handlers["/borrow-equipment"] = (req, res) => {
	if(req.method === "POST") {
		let body = '';
		req.on('data', chunk => {
				body += chunk.toString(); // convert Buffer to string
		});
		req.on('end', () => {
				const { equipment_name, borrower_name, borrower_office, borrower_purpose, borrower_signature, releasing_personnel_name, releasing_personnel_signature, borrowed_date, expected_return_date } = JSON.parse(body);
				const unit = equipment_name.split(" ")[1];
				const model = equipment_name.split(" ")[2];
				let equipmentID = null;
				connection.query("SELECT eq_id from equipment_tbl WHERE eq_unit == '?' AND eq_model = ?", [ unit, model ], (err, result, fields) => {
					if (err) throw err.message;
						equipmentID = result[0].eq_id;
				})
				connection.query("INSERT INTO borrowed_equipment_tbl(eq_id, borrower_name, borrower_office, borrower_purpose, borrower_signature, releasing_personnel_name, releasing_personnel_signature, borrowed_date, expected_return_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [ equipmentID, borrower_name, borrower_office, borrower_purpose, borrower_signature, releasing_personnel_name, releasing_personnel_signature, borrowed_date, expected_return_date ], (err, result, fields) => {
					if (err) throw err.message;
						console.log("Number of records inserted: " + result.affectedRows);
						res.write("Number of records inserted: " + result.affectedRows);
				})
				connection.query("UPDATE equipment_tbl SET eq_status = 'reserved' WHERE eq_id == ?", [equipmentID], (err, result, fields) => {
					console.log("Number of records updated: " + result.affectedRows);
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
				const { borrower_name, date_borrowed, returnee_name, returnee_signature, receiving_personnel_name, receiving_personnel_signature, returned_date, remarks } = JSON.parse(body);
				const bname = borrower_name;
				const bdate = date_borrowed;
				let equipmentID = null;
				let borrowedID = null;
				connection.query("SELECT eq_id, borrowed_id from borrowed_equipment_tbl WHERE borrower_name = '?' AND borrowed_date = '?'", [ bname, bdate ], (err, result, fields) => {
					if (err) throw err.message;
					equipmentID = result[0].eq_id;
					borrowedID = result[0].borrowed_id;
				})
				connection.query("UPDATE borrowed_equipment_tbl SET returnee_name = '?', returnee_signature = '?', receiving_personnel_name = '?', receiving_personnel_signature = '?', returned_date = '?', remarks = '?' WHERE borrowed_id='?'" , [ returnee_name, returnee_signature, receiving_personnel_name, receiving_personnel_signature, returned_date, remarks, borrowedID ], (err, result, fields) => {
					if (err) throw err.message;
						console.log("Number of records inserted: " + result.affectedRows);
						res.write("Number of records updated: " + result.affectedRows);
				})
				connection.query("UPDATE equipment_tbl SET eq_status = 'reserved' WHERE eq_id == ?", [equipmentID], (err, result, fields) => {
					console.log("Number of records updated: " + result.affectedRows);
				})
				res.end();
		});
	}
}

handlers["/available-equipments"] = (req, res) => {
	if(req.method == "GET") {
		connection.query("SELECT * FROM equipment_tbl WHERE eq_status = 'available'", (err, result, fields) => {
			if (err) throw err.message;
				let responseData = [];
				Object.values(result).forEach((res, id) => {
					responseData.push({
						"id": res.eq_id,
						"brand": res.eq_brand,
						"unit": res.eq_unit,
						"model": res.eq_model,
						"serial": res.eq_serial,
						"description": res.eq_description,
						"status": res.eq_status
					});
				});
				res.end(JSON.stringify(responseData));
		})
	};
};

handlers["/borrowed-equipments"] = (req, res) => {
	if(req.method === "GET") {
		connection.query("SELECT * FROM equipment_tbl WHERE eq_status === 'borrowed'", (err, result, fields) => {
			if (err) throw err.message;
				console.log("Number of records inserted: " + result.affectedRows);
				res.end(result);  
		})
	};
}

handlers["/reserved-equipments"] = (req, res) => {
	if(req.method === "GET") {
		connection.query("SELECT * FROM equipment_tbl WHERE eq_status === 'reserved'", (err, result, fields) => {
			if (err) throw err.message;
				console.log("Number of records inserted: " + result.affectedRows);
				res.end(result);  
		})
	};
}

require('http').createServer((req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
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