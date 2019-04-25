import React, { useState, useEffect } from 'react'

const ReserveEquipmentForm = props => {
	const [reserveeName, setReserveeName] = useState("")
	const [reserveeOffice, setReserveeOffice] = useState("")
	const [reserveePurpose, setReserveePurpose] = useState("")
	const [dateToUse, setDateToUse] = useState("")
	const [dateToPickUp, setDateToPickUp] = useState("")
	const [equipmentName, setEquipmentName] = useState("")
	const [availableEquipments, setAvailableEquipments] = useState([])
	const [transactionStatus, setTransactionStatus] = useState("")

	// useEffect(() => {
	// 	const uri = 'http://localhost:8001/available-equipments';
	// 	const head = new Headers();
	// 	const req = new Request(uri, {
	// 		method: 'GET',
	// 		headers: head,
	// 		mode: 'no-cors'
	// 	});
	// 	fetch(req)
	// 	.then(response => setAvailableEquipments(response))
	// 	.catch(error => console.log(error.message))
	// }, [availableEquipments])

	const handleSubmit = e => {
		const uri = 'http://localhost:8001/reserve-equipment';
		const head = new Headers();
		const req = new Request(uri, {
			method: 'POST',
			headers: head,
			mode: 'no-cors',
			body: JSON.stringify({
				equipment_name: equipmentName,
				reservee_name: reserveeName,
				reservee_office: reserveeOffice,
				reservee_purpose: reserveePurpose,
				date_to_use: dateToUse,
				date_to_pickup: dateToPickUp
			})
		});
		fetch(req)
		.then(response => response.status === 200 && setTransactionStatus(`${equipmentName} has been successfully reserved for ${reserveeName}.`))
		.catch(error => setTransactionStatus(error.message))
	}
	return (
		<>
				<h2>Reserve An Equipment</h2>
				<select name="equipment_dropdown" value={equipmentName} onChange={e => setEquipmentName(e.target.value)}>
					{/* {availableEquipments.map(eq => <option key={eq.eq_id}>{eq.eq_brand} {eq.eq_unit} {eq.eq_model}</option>)} */}
				</select>
				<input 
				type="input"
				name="reservee_name" 
				className="reservee_name" 
				placeholder="Reservee Name" 
				value={reserveeName}
				onChange={e => setReserveeName(e.target.value)}
			/>
			<input 
				type="input" 
				name="reservee_office" 
				className="reservee_office" 
				placeholder="Reservee's Office"
				value={reserveeOffice}
				onChange={e => setReserveeOffice(e.target.value)}
			/>
			<textarea 
				cols="40" 
				rows="5" 
				name="reservee_purpose" 
				className="reservee_purpose" 
				placeholder="Purpose of Reservation"
				value={reserveePurpose}
				onChange={e => setReserveePurpose(e.target.value)}
				>
			</textarea>
			<input 
				type="date" 
				name="date_to_use" 
				className="date_to_use" 
				value={dateToUse}
				onChange={e => setDateToUse(e.target.value)}
			/>
			<input 
				type="date" 
				name="date_to_pickup" 
				className="date_to_pickup" 
				value={dateToPickUp}
				onChange={e => setDateToPickUp(e.target.value)}
			/>
			<button type="submit" onClick={handleSubmit}>Submit</button>
			<div className="success">{transactionStatus}</div>
		</>
	)
}

export default ReserveEquipmentForm
