import React, { useState, useEffect } from 'react'

//grabbing components
import Main from './components/Main'
import Header from './components/Header'

//applying CSS
import './App.css'

//grabbing equipment context
import EquipmentContext from './components/Context/EquipmentContext'

const App = () => {
	const [availableEquipments, setAvailableEquipments] = useState([])
	//const [reservedEquipments, setReservedEquipments] = useState([])

	// useEffect(() => {
	// 	const uri = 'http://localhost:8001/available-equipments';
	// 	const head = new Headers();
	// 	const req = new Request(uri, {
	// 		method: 'GET',
	// 		headers: head,
	// 		mode: 'no-cors',
	// 	});
	// 	setAvailableEquipments(getAvailableEquipments(req));
	// 	console.log(availableEquipments)
	// }, [])

	// useEffect(() => {
	// 	const uri = 'http://localhost:8001/reserved-equipments';
	// 	setReservedEquipments(getReservedEquipments(uri));
	// }, [reservedEquipments])

	async function getAvailableEquipments(req) {
		// console.log("it is here!")
		const response = await fetch(req);
		const jsonData = await response.json();
		//console.log(jsonData)
		// const jsonData = JSON.parse(responseText);
		// console.log(jsonData)
		return jsonData;
	}

	// const getReservedEquipments = async(uri) => {
	// 	const response = await fetch(uri);
	// 	const responseText = await response.text();
	// 	const jsonData = JSON.parse(responseText);
	// 	return jsonData;
	// }

		return (
				<EquipmentContext.Provider data={{availableEquipments}}>
					<div className="container">
						<Header />
						<Main />
					</div>
				</EquipmentContext.Provider>
		)
}

export default App
