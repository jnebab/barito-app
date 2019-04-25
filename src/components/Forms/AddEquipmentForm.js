import React, { useState } from 'react'

import './Forms.css'

const AddEquipmentForm = props => {
	const [name, setName] = useState("")
	const [serial, setSerial] = useState("")
	const [description, setDescription] = useState("")
	const [status, setStatus] = useState("")
	const [transactionStatus, setTransactionStatus] = useState("")

	const handleSubmit = () => {
		const uri = 'http://localhost:8001/add-equipment';
		const head = new Headers();
		const req = new Request(uri, {
			method: 'POST',
			headers: head,
			mode: 'no-cors',
			body: JSON.stringify({
				equipment_name : name,
				equipment_serial: serial,
				equipment_description: description,
				equipment_status: status
			})
		});
		fetch(req)
		.then(response => {
			setTransactionStatus(`New Equipment ${name} has been added successfully.`)
			clearFields();
		})
		.catch(error => setTransactionStatus(error.message))
	}

	const clearFields = () => {
		setName("")
		setSerial("")
		setDescription("")
		setStatus("")
	}

	return (
		<div 
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: 500,
				margin: '0 auto',
				textAlign: 'center'
			}}
			className="addForm"
		>
			<h2>Add New Equipment</h2>
			<input 
				type="input" 
				name="equipment_name" 
				className="equipment_name" 
				placeholder="Equipment's Name" 
				value={name}
				onChange={e => setName(e.target.value)}
			/>
			<input 
				type="input"
				name="equipment_serial" 
				className="equipment_serial" 
				placeholder="Equipment's Serial"
				value={serial}
				onChange={e => setSerial(e.target.value)}
			/>
			<textarea 
				name="equipment_desc" 
				className="equipment_desc" 
				placeholder="Equipment's Description"
				rows="8"
				columns="10"
				value={description}
				onChange={e => setDescription(e.target.value)}
				>
			</textarea>
			<input 
				type="input" 
				name="equipment_status" 
				className="equipment_status" 
				placeholder="Equipment's Status"
				value={status}
				onChange={e => setStatus(e.target.value)}
			/>
			<button type="submit" onClick={handleSubmit}>Submit</button>
			<div className="success">{transactionStatus}</div>
		</div>
	)
}

export default AddEquipmentForm