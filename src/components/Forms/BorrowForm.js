import React, { useState, useContext } from 'react'


const BorrowForm = ({ isChecked, isReturning }) => {
	const [equipmentName, setEquipmentName] = useState("")
	const [borrowerName, setBorrowerName] = useState("")
	const [borrowerOffice, setBorrowerOffice] = useState("")
	const [borrowerPurpose, setBorrowerPurpose] = useState("")
	const [borrowerSignature, setBorrowerSignature] = useState("")
	const [releasingPersonnelName, setReleasingPersonnelName] = useState("")
	const [releasingPersonnelSignature, setReleasingPersonnelSignature] = useState("")
	const [borrowDate, setBorrowingDate] = useState("")
	const [expectedReturnDate, setExpectedReturnDate] = useState("")

	function encodeImageFileAsURL(element) {
		const file = element.files[0];
		const reader = new FileReader();
		let str = "";
		reader.onloadend = function() {
			document.querySelector("#encoded").innerHTML = `<img src="${reader.result}" />`;
			document.querySelector("#imgStr").value = reader.result;
		}
		reader.readAsDataURL(file);
	}

	return (
		<>
			<select value={equipmentName} onChange={e => setEquipmentName(e.target.value)}>
				{/* {isChecked && reserved.filter(eq => eq.eq_status === 'reserved').map(req => <option>{req.eq_brand} {req.eq_unit} {req.eq_model}</option>)}
				{!isChecked && reserved.map(eq => <option>{eq.eq_brand} {eq.eq_unit} {eq.eq_model}</option>)} */}
			</select>
			<input onChange={e => setBorrowerName(e.target.value)} placeholder="Borrower's Name"/>
		</>
			//isChecked, load reservedEquipments in the Select Component
	)
}

export default BorrowForm