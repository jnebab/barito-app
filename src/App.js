import React, { useState, useEffect } from 'react'
import axios from 'axios'

//grabbing components
import MainContainer from './components/MainContainer'

//applying CSS
import './App.css'

//create equipment context
import { eqContext } from './components/Main/Context'

const App = () => {
	const [availableEquipments, setAvailableEquipments] = useState([])
	//const [reservedEquipments, setReservedEquipments] = useState([])
	const [isError, setIsError] = useState(false);
	

	useEffect(() => {
		async function fetchData() {
			setIsError(false)
			try {
				const response = await axios('http://localhost:8001/available-equipments')
				const result = await response
				console.log(result)
				setAvailableEquipments(result.data)
      } catch (error) {
        setIsError(true);
      }
		}
		fetchData()
	}, [])

	// useEffect(() => {
	// 	const uri = 'http://localhost:8001/reserved-equipments';
	// 	setReservedEquipments(getReservedEquipments(uri));
	// }, [reservedEquipments])

	// async function getAvailableEquipments(req) {
	// 	// console.log("it is here!")
	// 	const response = await fetch(req);
	// 	console.log(response);
	// 	const jsonData = await response.text();
	// 	//console.log(jsonData)
	// 	// const jsonData = JSON.parse(responseText);
	// 	// console.log(jsonData)
	// 	return jsonData;
	// }

		return (
				<eqContext.Provider data={{availableEquipments}}>
					<div className="wrapper">
						<MainContainer />
					</div>
				</eqContext.Provider>
		)
}

export default App
