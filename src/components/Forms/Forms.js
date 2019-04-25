// import React, { useContext } from 'react'

// import ViewCalendar from '../Main/ViewCalendar'
// import AvailableEquipments from '../Main/AvailableEquipments'
// import BorrowedEquipments from '../Main/BorrowedEquipments'
// import AddEquipmentForm from './AddEquipmentForm'
// import BorrowEquipmentForm from './BorrowEquipmentForm'
// import ReserveEquipmentForm from './ReserveEquipmentForm'
// import ReturnEquipmentForm from './ReturnEquipmentForm'
// import HistoryLog from '../Main/HistoryLog'

// import EquipmentContext from '../Context/EquipmentContext'


// const Forms = props => {
// 	const { showCalendar, showAvailable, showBorrowed, isAddingEquipment, isBorrowingEquipment, isReservingEquipment, isReturningEquipment, showHistory } = useContext(EquipmentContext)
// 	return (
// 		<>
// 		{showCalendar && <ViewCalendar />}
// 		{showAvailable && <AvailableEquipments />}
// 		{showBorrowed && <BorrowedEquipments />}
// 		{isAddingEquipment && <AddEquipmentForm />}
// 		{isBorrowingEquipment && <BorrowEquipmentForm />}
// 		{isReservingEquipment && <ReserveEquipmentForm />}
// 		{isReturningEquipment && <ReturnEquipmentForm />}
// 		{showHistory && <HistoryLog />}
// 		</>
// 	)
// }

// export default Forms