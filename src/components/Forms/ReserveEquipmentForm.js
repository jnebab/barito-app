import React, { useState } from 'react'
import { Select, MenuItem, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'


// import { eqContext } from '../Main/Context'
import { availableEquipments } from '../../datasource'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: 8,
		marginRight: 8,
	},
	dense: {
		marginTop: 16,
	},
	menu: {
		width: 200,
	},
}))

const ReserveEquipmentForm = props => {
	const classes = useStyles()
	const [reserveeName, setReserveeName] = useState("")
	const [reserveeOffice, setReserveeOffice] = useState("")
	const [reserveePurpose, setReserveePurpose] = useState("")
	const [dateToUse, setDateToUse] = useState("")
	const [dateToPickUp, setDateToPickUp] = useState("")
	const [equipmentName, setEquipmentName] = useState("Select an Equipment")
	const [transactionStatus, setTransactionStatus] = useState("")
	// const { availableEquipments } = useContext(eqContext)

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
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: 420,
				margin: '0 auto',
				textAlign: 'center'
			}}
		>
			<h2>Reserve An Equipment</h2>
			<Select
				name="equipment_dropdown"
				value={equipmentName} 
				onChange={e => setEquipmentName(e.target.value)}
			>
				<MenuItem value="Select an Equipment">
					Select an Equipment
				</MenuItem>
				{availableEquipments.map((eq, index) => (<MenuItem value={`${eq.brand} ${eq.unit} ${eq.model}`}>{`${eq.brand} ${eq.unit} ${eq.model}`}</MenuItem>))}
			</Select>
			<TextField
				id="reservee-name"
				label="Name of Reservee"
				placeholder="Enter your name"
				className={classes.textField}
				margin="normal"
				variant="filled"
				value={reserveeName}
				onChange={e => setReserveeName(e.target.value)}
			/>
			<TextField 
				id="reservee-office" 
				label="Office of the Reservee"
				placeholder="Enter your office"
				className={classes.textField}
				margin="normal"
				variant="filled"
				value={reserveeOffice}
				onChange={e => setReserveeOffice(e.target.value)}
			/>
			<TextField 
				id="reservee-purpose" 
				label="Purpose of Reservation"
				placeholder="Purpose of Reservation"
				className={classes.textField}
				margin="normal"
				variant="filled"
				multiline
				rowsMax={4}
				value={reserveePurpose}
				onChange={e => setReserveePurpose(e.target.value)}
			/>
			<TextField
				id="date-to-use"
				label="Date To Use"
				type="datetime-local"
				className={classes.textField}
				InputLabelProps={{
					shrink: true,
				}}
				value={dateToUse}
				onChange={e => setDateToUse(e.target.value)}
			/>
			<TextField
				id="date-to-pickup"
				label="Date To Pickup"
				type="datetime-local"
				className={classes.textField}
				InputLabelProps={{
					shrink: true,
				}}
				value={dateToPickUp}
				onChange={e => setDateToPickUp(e.target.value)}
			/>
			<Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>
				Submit
			</Button>
			<div className="success">{transactionStatus}</div>
		</div>
	)
}

export default ReserveEquipmentForm
