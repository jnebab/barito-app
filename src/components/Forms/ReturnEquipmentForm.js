import React from 'react'
import BorrowForm from './BorrowForm'

const ReturnEquipmentForm = props => {

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
		//load disabled borrowing form containing the borrowed data of the equipment set to return
		<div className="return_equipment-form">
			<h2>Return An Equipment</h2>
			<BorrowForm isReturning={true} />
			<p>Returning Form</p>
		</div>
	)
}

export default ReturnEquipmentForm
