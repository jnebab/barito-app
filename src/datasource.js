const availableEquipments = [
	{
		"id": 1,
		"brand": "EPSON",
		"unit": "X-B81",
		"model": "HA4H45",
		"serial": "TUXLAJDA2E00L",
		"description": "VGA, Powercord, bag",
		"status": "available"
	},
	{
		"id": 2,
		"brand": "EPSON",
		"unit": "X-J11",
		"model": "KA4I44",
		"serial": "TUKLVJDA21G99L",
		"description": "VGA, bag",
		"status": "available"
	}
]

const reservedEquipments = [
	{
		"id": 1,
		"brand": "EPSON",
		"unit": "X-C81",
		"model": "L4H34T",
		"serial": "TUXLAJDA2E00L",
		"description": "VGA, Powercord, bag",
		"status": "reserved"
	},
	{
		"id": 2,
		"brand": "EPSON",
		"unit": "X-D81",
		"model": "J4HL34T",
		"serial": "TUKLAYDA2E00L",
		"description": "VGA",
		"status": "reserved"
	}
]

const borrowedEquipments = [
	{
		"id": 1,
		"equipment_name": "EPSON X-C918 L5HTR",
		"borrower_name": "Ivan Nebab",
		"borrower_office": "ITO",
		"borrowing_purpose": "Oath Taking",
		"borrowed_date": "2019-05-14T08:00",
		"expected_return_date": "2019-05-16T10:00",
		"releasing_personnel_name": "Erwin Maximo"
	},
	{
		"id": 2,
		"equipment_name": "EPSON D-A918 L6HZ",
		"borrower_name": "Karen Rai",
		"borrower_office": "Tourism",
		"borrowing_purpose": "Seminar",
		"borrowed_date": "2019-05-14T13:00",
		"expected_return_date": "2019-05-16T09:00",
		"releasing_personnel_name": "Erwin Maximo"
	},
]

export { availableEquipments, borrowedEquipments, reservedEquipments }