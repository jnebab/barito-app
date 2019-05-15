import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

//import './Forms.css'

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

const AddEquipmentForm = props => {
	const classes = useStyles()
	const [brand, setBrand] = useState("")
	const [unit, setUnit] = useState("")
	const [model, setModel] = useState("")
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
				equipment_brand : brand,
				equipment_unit: unit,
				equipment_mode: model,
				equipment_serial: serial,
				equipment_description: description,
				equipment_status: 'available'
			})
		});
		fetch(req)
		.then(response => {
			setTransactionStatus(`New Equipment ${brand} ${unit} ${model} has been added successfully.`)
			clearFields();
		})
		.catch(error => setTransactionStatus(error.message))
	}

	const clearFields = () => {
		setBrand("")
		setUnit("")
		setModel("")
		setSerial("")
		setDescription("")
		setStatus("")
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
			className="addForm"
		>
			<h2>Add New Equipment</h2>
			<div 
				style={{
					display: 'flex',
					justifyContent: 'space-between'
				}}
			>
				<TextField
					id="equipment-brand"
					label="Equipment's Brand"
					placeholder="Enter equipment brand"
					className={classes.textField}
					margin="normal"
					variant="filled"
					value={brand}
					onChange={e => setBrand(e.target.value)}
				/>
				<TextField
					id="equipment-unit"
					label="Equipment's Unit"
					placeholder="Enter equipment unit"
					className={classes.textField}
					margin="normal"
					variant="filled"
					value={unit}
					onChange={e => setUnit(e.target.value)}
				/>
			</div>
			<div 
				style={{
					display: 'flex',
					justifyContent: 'space-between'
				}}
			>
				<TextField
					id="equipment-model"
					label="Equipment's Model"
					placeholder="Enter equipment model"
					className={classes.textField}
					margin="normal"
					variant="filled"
					value={model}
					onChange={e => setModel(e.target.value)}
				/>
				<TextField
					id="equipment-serial"
					label="Equipment's Serial Number"
					placeholder="Enter equipment serial number"
					className={classes.textField}
					margin="normal"
					variant="filled"
					value={serial}
					onChange={e => setSerial(e.target.value)}
				/>
			</div>
			<TextField
				id="equipment-desc"
				label="Equipment's Description"
				placeholder="Enter equipment description"
				className={classes.textField}
				margin="normal"
				variant="filled"
				multiline
				rowsMax="4"
				value={description}
				onChange={e => setDescription(e.target.value)}
			/>
			<Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>
				Submit
			</Button>
			<div className="success">{transactionStatus}</div>
		</div>
	)
}

export default AddEquipmentForm