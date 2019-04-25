import React from 'react'
import ViewCalendar from './components/Main/ViewCalendar'
import AvailableEquipments from './components/Main/AvailableEquipments'
import BorrowedEquipments from './components/Main/BorrowedEquipments'
import HistoryLog from './components/Main/HistoryLog'

import AddEquipmentForm from './components/Forms/AddEquipmentForm'
import BorrowEquipmentForm from './components/Forms/BorrowEquipmentForm'
import ReserveEquipmentForm from './components/Forms/ReserveEquipmentForm'
import ReturnEquipmentForm from './components/Forms/ReturnEquipmentForm'

const routes = [
  {
    path: "/",
    exact: true,
    main: () => <ViewCalendar />
  },
  {
    path: "/available-equipments",
    main: () => <AvailableEquipments />
  },
  {
    path: "/borrowed-equipments",
    main: () => <BorrowedEquipments />
	},
	{
    path: "/add-new-equipments",
    main: () => <AddEquipmentForm />
	},
	{
    path: "/reservation-form",
    main: () => <ReserveEquipmentForm />
	},
	{
    path: "/borrowing-form",
    main: () => <BorrowEquipmentForm />
	},
	{
    path: "/returning-form",
    main: () => <ReturnEquipmentForm />
	},
	{
    path: "/history-log",
    main: () => <HistoryLog />
	},
];

export default routes