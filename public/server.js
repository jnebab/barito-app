const mysql = require('mysql');
const _ = require('lodash');

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
				body += chunk.toString();
		});
		req.on('end', () => {
				const { borrowed_id, equipment_id, equipment_name, returnee_name, returnee_signature, receiving_personnel_name, receiving_personnel_signature, returned_date, returned_equipment_remarks } = JSON.parse(body);
				console.log("returnee name", returnee_name)
				connection.query("UPDATE borrowed_equipment_tbl SET returnee_name = ?, returnee_signature = ?, receiving_personnel_name = ?, receiving_personnel_signature = ?, returned_date = ?, returned_eq_remarks = ? WHERE borrowed_id=?; UPDATE equipment_tbl SET eq_status = 'available' WHERE eq_id = ?; INSERT INTO transaction_history_tbl(transaction_type, transaction_date, transaction_user, transaction_item) VALUES (?, ?, ?, ?);" , [ returnee_name, returnee_signature, receiving_personnel_name, receiving_personnel_signature, returned_date, returned_equipment_remarks, borrowed_id[0], equipment_id[0], 'return', new Date(), receiving_personnel_name, equipment_name ], (err, result, fields) => {
					if (err) throw err.message;
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
		connection.query("SELECT equipment_tbl.eq_brand, equipment_tbl.eq_unit, equipment_tbl.eq_model, borrowed_equipment_tbl.eq_id, borrowed_equipment_tbl.borrowed_id, borrowed_equipment_tbl.borrower_name, borrowed_equipment_tbl.borrower_purpose, borrowed_equipment_tbl.borrower_office, borrowed_equipment_tbl.borrowed_date, borrowed_equipment_tbl.borrower_signature, borrowed_equipment_tbl.expected_return_date, borrowed_equipment_tbl.releasing_personnel_name, borrowed_equipment_tbl.releasing_personnel_signature, borrowed_equipment_tbl.returned_eq_remarks FROM equipment_tbl INNER JOIN borrowed_equipment_tbl ON equipment_tbl.eq_id = borrowed_equipment_tbl.eq_id", (err, result, fields) => {
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

handlers["/pickup-events"] = (req, res) => {
	if(req.method === 'GET') {
		connection.query("SELECT reservee_name, date_to_pickup FROM reserved_equipment_tbl; SELECT borrower_name, expected_return_date FROM borrowed_equipment_tbl", (err, result, fields) => {
			const events = _.mergeWith(result[0], result[1], customizer)
			if (err) throw err.message;
				res.end(JSON.stringify(events));
		})
	};
}

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
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
