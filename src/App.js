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
	const [reservedEquipments, setReservedEquipments] = useState([])
	const [isError, setIsError] = useState(false);
	

	useEffect(() => {
		async function fetchAvailableEquipments() {
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
		fetchAvailableEquipments()
	}, [])

	useEffect(() => {
		async function fetchReservedEquipments() {
			setIsError(false)
			try {
				const response = await axios('http://localhost:8001/reseved-equipments')
				const result = await response
				setReservedEquipments(result.data)
			} catch (error) {
				setIsError(true)
			}
		}
	})

		return (
				<eqContext.Provider data={{availableEquipments}}>
					<div className="wrapper">
						<MainContainer />
					</div>
				</eqContext.Provider>
		)
}

export default App
