import React, { useState, useContext } from 'react'
import { Stepper, Step, StepLabel, 
		Button, Checkbox, TextField, Select, MenuItem, 
		FormControlLabel, Typography,
		Card, CardContent, CardActionArea, CardMedia } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { AvailableEquipmentContext, ReservedEquipmentContext, HistoryLogContext } from '../../Store'

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
		maxWidth: 345,
		marginTop: 20
	},
	backButton: {
    marginRight: 8,
  },
}))

function getSteps() {
	return ['Equipment Info and Dates', 'Borrower and Personnel Details', 'Borrower and Personnel Signatures'];
}

const BorrowEquipmentForm = props => {
	const classes = useStyles()
	const [activeStep, setActiveStep] = React.useState(0);
	const [hasReservation, setHasReservation] = React.useState(false)
	const [equipmentName, setEquipmentName] = useState("Select an Equipment")
	const [borrowerName, setBorrowerName] = useState("")
	const [borrowerOffice, setBorrowerOffice] = useState("")
	const [borrowerPurpose, setBorrowerPurpose] = useState("")
	const [borrowerSignature, setBorrowerSignature] = useState("")
	const [releasingPersonnelName, setReleasingPersonnelName] = useState("")
	const [releasingPersonnelSignature, setReleasingPersonnelSignature] = useState("")
	const [borrowedDate, setBorrowedDate] = useState("")
	const [expectedReturnDate, setExpectedReturnDate] = useState("")
	const [availableEquipments, isLoadingAvailable] = useContext(AvailableEquipmentContext)
	const [reservedEquipments, isLoadingReserve] = useContext(ReservedEquipmentContext)
	const [transactionStatus, setTransactionStatus] = ("")
	const steps = getSteps()

	function getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return (
					<div style={{display: 'flex', justifyContent: 'center'}}>
						<div style={{display: 'flex', flexDirection: 'column',  margin: '0 20px'}}>
							<FormControlLabel
								control={
									<Checkbox
										checked={hasReservation}
										onChange={e => setHasReservation(!hasReservation)}
										value={hasReservation ? "has reservation" : "has no reservation"}
										color="primary"
									/>
								}
								label="Has Reservation?"
								style={{
									marginTop: 15
								}}
							/>
							<Select
								name="equipment_dropdown"
								value={equipmentName} 
								onChange={e => setEquipmentName(e.target.value)}
								style={{
									marginTop: 22,
									width: 190
								}}
							>
								<MenuItem value="Select an Equipment">
									Select an Equipment
								</MenuItem>
								{equipments.map((eq, index) => {
									return (<MenuItem key={index} value={`${eq.eq_id}-${eq.eq_brand}-${eq.eq_unit}-${eq.eq_model}`}>{`(${eq.eq_id}) ${eq.eq_brand} ${eq.eq_unit} ${eq.eq_model}`}</MenuItem>)
								})}
							</Select>
						</div>
						<div style={{display: 'flex', flexDirection: 'column', margin: '0 20px'}}>
							<TextField
								id="date-borrowed"
								label="Date Borrowed"
								type="datetime-local"
								className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
								value={borrowedDate}
								onChange={e => setBorrowedDate(e.target.value)}
								required
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
								value={expectedReturnDate}
								onChange={e => setExpectedReturnDate(e.target.value)}
								required
							/>
						</div>
					</div>
				)
			case 1:
				return (
					<div  style={{display: 'flex', justifyContent: 'center'}}>
						<div style={{display: 'flex', flexDirection: 'column', margin: '0 20px'}}>
							<TextField
								id="borrower-name"
								label="Name of Borrower"
								placeholder="Type borrower's name"
								className={classes.textField}
								margin="normal"
								variant="filled"
								value={borrowerName}
								onChange={e => setBorrowerName(e.target.value)}
							/>
							<TextField
								id="borrower-office"
								label="Office of Borrower"
								placeholder="Type borrower's office"
								className={classes.textField}
								margin="normal"
								variant="filled"
								value={borrowerOffice}
								onChange={e => setBorrowerOffice(e.target.value)}
							/>
						</div>
						<div style={{display: 'flex', flexDirection: 'column', margin: '0 10px'}}>
							<TextField 
								id="borrower-purpose"
								label="Purpose of Borrowing"
								placeholder="Type borrower's purpose"
								className={classes.textField}
								margin="normal"
								variant="filled"
								multiline
								rowsMax={4}
								value={borrowerPurpose}
								onChange={e => setBorrowerPurpose(e.target.value)}
							/>
							<TextField
								id="personnel-name"
								label="Name of Releasing Personnel"
								placeholder="Type personnel name"
								className={classes.textField}
								margin="normal"
								variant="filled"
								value={releasingPersonnelName}
								onChange={e => setReleasingPersonnelName(e.target.value)}
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
									Upload Borrower Signature
								</Button>
							</label>
							<Card className={classes.card}>
								<CardActionArea>
									<CardMedia
										className={classes.media}
										image={borrowerSignature}
										title="Borrower's Signature"
										src={borrowerSignature}
									/>
									<CardContent>
										<Typography component="p">
											{borrowerSignature}
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
										image={releasingPersonnelSignature}
										title="Releasing Personnel's Signature"
										src={releasingPersonnelSignature}
									/>
									<CardContent>
										<Typography component="p">
											{releasingPersonnelSignature}
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

	function handleNext() {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	}

	function handleBack() {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	}

	function handleReset() {
		setActiveStep(0);
	}

	const handleSubmit = () => {
		const uri = 'http://localhost:8001/borrow-equipment';
		const head = new Headers();
		const req = new Request(uri, {
			method: 'POST',
			headers: head,
			mode: 'no-cors',
			body: JSON.stringify({
				equipment_name: equipmentName,
				borrower_name: borrowerName,
				borrower_office: borrowerOffice,
				borrower_purpose: borrowerPurpose,
				borrower_signature: borrowerSignature,
				borrowed_date: borrowedDate,
				expected_return_date: expectedReturnDate,
				releasing_personnel_name: releasingPersonnelName,
				releasing_personnel_signature: releasingPersonnelSignature
			})
		})
		fetch(req)
		.then(response => {
			if(response.status === 200) {
				setTransactionStatus(`${equipmentName} has been successfully borrowed by ${equipmentName}`)
				clearFields()
			}
		})
		.catch(error => console.log(error.message))
	}

	const clearFields = () => {
		setEquipmentName("")
		setBorrowerName("")
		setBorrowerOffice("")
		setBorrowerPurpose("")
		setBorrowerSignature("")
		setBorrowedDate("")
		setExpectedReturnDate("")
		setReleasingPersonnelName("")
		setReleasingPersonnelSignature("")
	}

	const encodeImageFileAsURL = (e, user) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		let str = "";
		reader.onloadend = function() {
			if(user === 'borrower')
				setBorrowerSignature(reader.result);
			else {
				setReleasingPersonnelSignature(reader.result);
			}
		}
		reader.readAsDataURL(file);
	}
	
	const equipments = hasReservation ? reservedEquipments : availableEquipments
	
	return (
		<div 
			className={classes.root}
		>
		<h2 style={{textAlign: 'center'}}>Borrow An Equipment</h2>
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
					<div className="success">{transactionStatus}</div>
				</div>

			)}
      </div>
		</div>
	)
}

export default BorrowEquipmentForm
