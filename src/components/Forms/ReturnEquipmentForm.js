import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/styles'
import { Stepper, Step, StepLabel, 
	Button, TextField, Select, MenuItem, Typography,
	Card, CardContent, CardActionArea, CardMedia } from '@material-ui/core'

import { BorrowedEquipmentContext } from '../../Store'

const useStyles = makeStyles(theme => ({
	root: {
		width: '70%',
		display: 'flex',
		flexDirection: 'column',
		margin: '0 auto',
		justifyContent: 'center'
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: 16,
		marginRight: 16,
		width: 250
	},
	input: {
		display: 'none'
	},
	button: {
		width: 250
	},
	media: {
		height: 100,
	},
	card: {
		maxWidth: 250,
		marginTop: 20
	},
	backButton: {
		marginRight: 8,
	},
	instructions: {
		marginTop: 8,
		marginBottom: 8,
	}
}))

function getSteps() {
	return [`Borrowed Equipment Info`, `Returnee's and Personnel's Details`, `Signatures`];
}

const ReturnEquipmentForm = props => {
	const classes = useStyles()
	const [borrowedEquipmentName, setBorrowedEquipmentName] = useState("Select an Equipment")
	//const [equipmentId, setEquipmentId] = useState("")
	const [activeStep, setActiveStep] = useState(0)
	const [returneeName, setReturneeName] = useState("")
	const [returneeOffice, setReturneeOffice] = useState("")
	const [returneeSignature, setReturneeSignature] = useState("")
	const [receivingPersonnelName, setReceivingPersonnelName] = useState("")
	const [receivingPersonnelSignature, setReceivingPersonnelSignature] = useState("")
	const [returnedDate, setReturnedDate] = useState("")
	const [returnedEquipmentRemarks, setReturnedEquipmentRemarks] = useState("")
	const [transactionStatus, setTransactionStatus] = useState()
	const [borrowedEquipments, isLoadingBorrowed] = useContext(BorrowedEquipmentContext)
	const steps = getSteps()

	useEffect(() => {
		console.log('equipments array',isLoadingBorrowed ? 'fetching data...' : equipments)
		console.log('borrowed equipments array', borrowed)
	})

	const equipments = !isLoadingBorrowed && borrowedEquipments[0]
	const borrowed = !isLoadingBorrowed && borrowedEquipments[1].filter(eq => eq.eq_status == 'borrowed')

	const getBorrowedEquipmentId = (name) => {
		borrowed.filter(b => `${b.eq_brand} ${b.eq_unit} ${b.eq_mode}` == name).map(eq => console.log(eq.eq_id))
	}

	function getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return (
					<div style={{display: 'flex', justifyContent: 'center'}}>
						<div style={{display: 'flex', flexDirection: 'column',  margin: '0 20px'}}>
							<Select
									name="equipment_dropdown"
									value={borrowedEquipmentName} 
									onChange={e => setBorrowedEquipmentName(e.target.value)}
									style={{
										marginTop: 22,
										width: 250
									}}
								>
									<MenuItem value="Select an Equipment">
										Select an Equipment
									</MenuItem>
									{!isLoadingBorrowed && borrowed.map((eq, index) => (<MenuItem key={index} value={`${eq.eq_brand} ${eq.eq_unit} ${eq.eq_model}`}>{`${eq.eq_brand} ${eq.eq_unit} ${eq.eq_model}`}</MenuItem>))}
							</Select>
							<TextField
								id="borrower-name"
								label="Name of Borrower"
								className={classes.textField}
								margin="normal"
								variant="filled"
								value={!isLoadingBorrowed && equipments.filter(b => b.eq_id === getBorrowedEquipmentId(borrowedEquipmentName)).map(eq => console.log('borrower name', eq.borrower_name))}
								disabled
							/>
							{/* <TextField 
								id="borrower-purpose"
								label="Purpose of Borrowing"
								className={classes.textField}
								margin="normal"
								variant="filled"
								multiline
								rowsMax={4}
								value={borrowedEquipments.filter(beq => beq.equipment_name === borrowedEquipmentName).map(eq => eq.borrower_purpose)}
								disabled
							/>
						</div>
						<div style={{display: 'flex', flexDirection: 'column', margin: '0 20px'}}>
							<TextField
									id="personnel-name"
									label="Name of Releasing Personnel"
									className={classes.textField}
									margin="normal"
									variant="filled"
									value={borrowedEquipments.filter(beq => beq.equipment_name === borrowedEquipmentName).map(eq => eq.releasing_personnel_name)}
									disabled
								/>
							<TextField
								id="date-borrowed"
								label="Date Borrowed"
								type="datetime-local"
								className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
								value={borrowedEquipments.filter(beq => beq.equipment_name === borrowedEquipmentName).map(eq => eq.borrowed_date)}
								disabled
							/>
							<TextField
								id="date-expected-return"
								label="Expected Return Date"
								type="datetime-local"
								className={classes.textField}
								style={{
									marginTop: 20
								}}
								InputLabelProps={{
									shrink: true,
								}}
								value={borrowedEquipments.filter(beq => beq.equipment_name === borrowedEquipmentName).map(eq => eq.expected_return_date)}
								disabled
							/> */}
						</div>
					</div>
				)
			case 1:
				return (
					<div  style={{
						display: 'flex', 
						flexDirection: 'column', 
						alignItems: 'center', 
						justifyContent: 'center', 
					}}>
						<div style={{display: 'flex'}}>
							<TextField
								id="returnee-name"
								label="Name of Returnee"
								placeholder="Type name of returnee"
								className={classes.textField}
								margin="normal"
								variant="filled"
								value={returneeName}
								onChange={e => setReturneeName(e.target.value)}
								style={{
									margin: 10
								}}
							/>
							<TextField
								id="returnee-office"
								label="Office of Returnee"
								placeholder="Type office of returnee"
								className={classes.textField}
								margin="normal"
								variant="filled"
								value={returneeOffice}
								onChange={e => setReturneeOffice(e.target.value)}
								style={{
									margin: 10
								}}
							/>
						</div>
						<div style={{display: 'flex'}}>
							<TextField
								id="receiving-personnel-name"
								label="Name of Receiving Personnel"
								placeholder="Type name of personnel"
								className={classes.textField}
								margin="normal"
								variant="filled"
								value={receivingPersonnelName}
								onChange={e => setReceivingPersonnelName(e.target.value)}
								style={{
									margin: 10
								}}
							/>
							<TextField
								id="equipment-remarks"
								label="Returned Equipment Remarks"
								placeholder="Type the status of the returned equipment"
								className={classes.textField}
								margin="normal"
								variant="filled"
								value={returnedEquipmentRemarks}
								multiline
								rowsMax={4}
								onChange={e => setReturnedEquipmentRemarks(e.target.value)}
								style={{
									margin: 10
								}}
							/>
						</div>
						<div style={{display: 'flex'}}>
							<TextField
								id="returned-date"
								label="Returned Date"
								type="datetime-local"
								className={classes.textField}
								style={{
									marginTop: 20
								}}
								InputLabelProps={{
									shrink: true,
								}}
								value={returnedDate}
								onChange={e => setReturnedDate(e.target.value)}
								required
							/>
						</div>
					</div>
				)
			case 2:
				return (
					<div style={{display: 'flex', justifyContent: 'center'}}>
						<div style={{display: 'flex', flexDirection: 'column', margin: '0 20px'}}>
							<input
								accept="image/*"
								className={classes.input}
								id="borrower-signature"
								type="file"
								onChange={e => encodeImageFileAsURL(e, 'borrower')}
							/>
							<label htmlFor="borrower-signature">
								<Button component="span" className={classes.button} variant="contained" color="primary">
									Upload Returnee Signature
								</Button>
							</label>
							<Card className={classes.card}>
								<CardActionArea>
									<CardMedia
										className={classes.media}
										image={returneeSignature}
										title="Returnee's Signature"
									/>
									<CardContent>
										<Typography component="p">
											{returneeSignature}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</div>
						<div style={{display: 'flex', flexDirection: 'column', margin: '0 20px'}}>
							<input
								accept="image/*"
								className={classes.input}
								id="personnel-signature"
								type="file"
								onChange={e => encodeImageFileAsURL(e, 'personnel')}
							/>
							<label htmlFor="personnel-signature">
								<Button component="span" className={classes.button} variant="contained" color="primary">
									Upload Personnel Signature
								</Button>
							</label>
							<Card className={classes.card}>
								<CardActionArea>
									<CardMedia
										className={classes.media}
										image={receivingPersonnelSignature}
										title="Receiving Personnel's Signature"
									/>
									<CardContent>
										<Typography component="p">
											{receivingPersonnelSignature}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</div>
					</div>
				)
			default:
				return 'Uknown stepIndex';
		}
	}

	const handleSubmit = () => {
		const uri = 'http://localhost:8001/borrow-equipment';
		const head = new Headers();
		const req = new Request(uri, {
			method: 'POST',
			headers: head,
			mode: 'no-cors',
			body: JSON.stringify({
				equipment_name: borrowedEquipmentName,
				returnee_name: returneeName,
				returnee_office: returneeOffice,
				returnee_signature: returneeSignature,
				returned_date: returnedDate,
				receiving_personnel_name: receivingPersonnelName,
				receiving_personnel_signature: receivingPersonnelSignature,
				returned_equipment_remarks: returnedEquipmentRemarks
			})
		})
		fetch(req)
		.then(response => {
			setTransactionStatus(`New Equipment ${borrowedEquipmentName} has been returned successfully.`)
			clearFields()
		})
		.catch(error => console.log(error.message))
	}

	const clearFields = () => {
		setBorrowedEquipmentName("")
		setReturneeName("")
		setReturneeOffice("")
		setReturneeSignature("")
		setReturnedDate("")
		setReceivingPersonnelName("")
		setReceivingPersonnelSignature("")
		setReturnedEquipmentRemarks("")
	}

	function handleNext() {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	}

	function handleBack() {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	}

	function handleReset() {
		setActiveStep(0);
	}


	const encodeImageFileAsURL = (e, user) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		let str = "";
		reader.onloadend = function() {
			if(user === 'borrower')
				setReturneeSignature(reader.result);
			else {
				setReceivingPersonnelSignature(reader.result);
			}
		}
		reader.readAsDataURL(file);
	}

	return (
		//load disabled borrowing form containing the borrowed data of the equipment set to return
		<div className="return_equipment-form">
			<h2>Return An Equipment</h2>
			<Stepper activeStep={activeStep} alternativeLabel>
			{steps.map(label => (
				<Step key={label}>
					<StepLabel>{label}</StepLabel>
				</Step>
			))}
		</Stepper>
		<div style={{ textAlign: 'center'}}>
			{activeStep === steps.length ? (
				<div>
					<Typography className={classes.instructions}>All steps completed</Typography>
					<Button onClick={handleReset}>Reset</Button>
				</div>
			) : (
				<div>
					<div className={classes.instructions}>{getStepContent(activeStep)}</div>
					<div style={{display: 'flex', justifyContent: 'space-around', marginTop: 16}}>
						<Button
							disabled={activeStep === 0}
							onClick={handleBack}
							className={classes.backButton}
						>
							Back
						</Button>
						<Button variant="contained" color="primary" onClick={activeStep === steps.length -1 ? handleSubmit : handleNext}>
							{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
						</Button>
					</div>
				</div>
			)}
			</div>
		</div>
	)
}

export default ReturnEquipmentForm
