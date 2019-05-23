import React, {useState} from 'react'

import { useFetch } from './components/hooks/hooks'

export const AvailableEquipmentContext = React.createContext(null)
export const ReservedEquipmentContext = React.createContext(null)
export const BorrowedEquipmentContext = React.createContext(null)
export const HistoryLogContext = React.createContext(null)

const Store = ({ children }) => {
	const [availableEquipments, isLoadingAvailable] = useFetch('http://localhost:8001/available-equipments')
	const [reservedEquipments, isLoadingReserve] = useFetch('http://localhost:8001/reserved-equipments')
	const [borrowedEquipments, isLoadingBorrowed] = useFetch('http://localhost:8001/borrowed-equipments')
	const [transactions, setTransactions] = useFetch('http://localhost:8001/transaction-history')

	return (
		<AvailableEquipmentContext.Provider value={[availableEquipments, isLoadingAvailable]}>
			<ReservedEquipmentContext.Provider value={[reservedEquipments, isLoadingReserve]}>
				<BorrowedEquipmentContext.Provider value={[borrowedEquipments, isLoadingBorrowed]}>
					<HistoryLogContext.Provider value={[transactions, setTransactions]}>
						{children}
					</HistoryLogContext.Provider>
				</BorrowedEquipmentContext.Provider>
			</ReservedEquipmentContext.Provider>
		</AvailableEquipmentContext.Provider>
	)
}

export default Store
