import React, { useState } from 'react'

// import BorrowForm from './BorrowForm'
import './Forms.css'

const BorrowEquipmentForm = props => {
	const [isChecked, setIsChecked] = useState(false)
	const [borrowerName, setBorrowerName] = useState("")
	const [borrowerOffice, setBorrowerOffice] = useState("")
	const [borrowerPurpose, setBorrowerPurpose] = useState("")
	const [borrowerSignature, setBorrowerSignature] = useState("")
	const [releasingPersonnelName, setReleasingPersonnelName] = useState("")
	const [releasingPersonnelSignature, setReleasingPersonnelSignature] = useState("")
	const [borrowedDate, setBorrowedDate] = useState(null)
	const [expectedReturnDate, setExpectedReturnDate] = useState(null)
	const [transactionStatus, setTransactionStatus] = ("")

	const handleSubmit = () => {
		const uri = 'http://localhost:8001/borrow-equipment';
		const head = new Headers();
		const req = new Request(uri, {
			method: 'POST',
			headers: head,
			mode: 'no-cors',
			body: JSON.stringify({
				// equipment_name : name,
				// equipment_serial: serial,
				// equipment_description: description,
				// equipment_status: status
			})
		});
		fetch(req)
		.then(response => {
			setTransactionStatus(`Equipment ${document.querySelector(".equipment_list").value} has been borrowed.`)
			// clearFields();
		})
		.catch(error => setTransactionStatus(error.message))
	}

	const encodeImageFileAsURL = (e, user) => {
		//console.log(element)
		const file = e.target.files[0];
		const reader = new FileReader();
		let str = "";
		reader.onloadend = function() {
			//document.querySelector("#encoded").innerHTML = `<img src="${reader.result}" />`;
			if(user === 'borrower')
				setBorrowerSignature(reader.result);
			else {
				setReleasingPersonnelSignature(reader.result);
			}
		}
		reader.readAsDataURL(file);
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
			<h2>Borrow An Equipment</h2>
			<select name="equipment_list">
				<option >Select Equipment Here</option>
			</select>
			<input 
				type="input" 
				// name="equipment_name" 
				// className="equipment_name" 
				placeholder="Borrower's Name" 
				value={borrowerName}
				onChange={e => setBorrowerName(e.target.value)}
			/>
			<input 
				type="input"
				// name="equipment_serial" 
				// className="equipment_serial" 
				placeholder="Borrower's Office"
				value={borrowerOffice}
				onChange={e => setBorrowerOffice(e.target.value)}
			/>
			<textarea 
				// name="equipment_desc" 
				// className="equipment_desc" 
				placeholder="Borrower's Purpose"
				rows="8"
				columns="10"
				value={borrowerPurpose}
				onChange={e => setBorrowerPurpose(e.target.value)}
				>
			</textarea>
			<input 
				type="file"
				// name="equipment_status" 
				// className="equipment_status" 
				// value={borrowerSignature}
				onChange={e => encodeImageFileAsURL(e, 'borrower')}
			/>
			<textarea 
				// name="equipment_desc" 
				// className="equipment_desc" 
				placeholder="Borrower's Signature"
				rows="8"
				columns="10"
				value={borrowerSignature}
				>
			</textarea>
			<img src={borrowerSignature} alt="Borrower's Signature" width="300" height="auto"/>
			<input 
				type="input"
				// name="equipment_serial" 
				// className="equipment_serial" 
				placeholder="Personnel's Name"
				value={releasingPersonnelName}
				onChange={e => setReleasingPersonnelName(e.target.value)}
			/>
			<input 
				type="file" 
				// name="equipment_status" 
				// className="equipment_status" 
				// value={borrowerSignature}
				onChange={e => encodeImageFileAsURL(e, 'personnel')}
			/>
			<textarea 
				// name="equipment_desc" 
				// className="equipment_desc" 
				placeholder="Personnel's Signature"
				rows="8"
				columns="10"
				value={releasingPersonnelSignature}
				>
			</textarea>
			<img src={releasingPersonnelSignature} alt="Personnel's Signature" width="300" height="auto"/>
			<input type="date" name="date_borrowed" />
			<input type="date" name="expected_return_date" />
			<button type="submit" onClick={handleSubmit}>Submit</button>
			<div className="success">{transactionStatus}</div>
		</div>
	)
}

export default BorrowEquipmentForm
