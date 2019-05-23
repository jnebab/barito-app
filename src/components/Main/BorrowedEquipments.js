import React, { useContext, useEffect } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { BorrowedEquipmentContext } from '../../Store'

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: 24,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
})

const BorrowedEquipments = props => {
	const { classes } = props
	const [borrowedEquipments, isLoadingBorrowed] = useContext(BorrowedEquipmentContext)

	useEffect(() => {
		console.log(isLoadingBorrowed ? 'fetching data...' : borrowedEquipments)
	})
	
	const rows = borrowedEquipments[0]

	return (
		<>
		<h2 style={{textAlign: 'center'}}>Borrowed Equipment</h2>
		<Table className={classes.table}>
			<TableHead>
				<TableRow>
					<TableCell align="center">Equipment ID</TableCell>
					<TableCell align="center">Equipment Name</TableCell>
					<TableCell align="center">Borrower's Name</TableCell>
					<TableCell align="center">Borrower's Office</TableCell>
					<TableCell align="center">Borrower's Purpose</TableCell>
					<TableCell align="center">Borrowed Date</TableCell>
					<TableCell align="center">Expected Date of Return</TableCell>
					<TableCell align="center">Releasing Personnel</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{!isLoadingBorrowed && rows.map((row, index) => (
					<TableRow key={index}>
						<TableCell align="center">{row.eq_id}</TableCell>
						<TableCell align="center">{borrowedEquipments[1].filter(beq => row.eq_id === beq.eq_id).map(eq => {
							return (`${eq.eq_brand} ${eq.eq_unit} ${eq.eq_model}`)
						})}</TableCell>
						<TableCell align="center">{row.borrower_name}</TableCell>
						<TableCell align="center">{row.borrower_office}</TableCell>
						<TableCell align="center">{row.borrower_purpose}</TableCell>
						<TableCell align="center">{row.borrowed_date}</TableCell>
						<TableCell align="center">{row.expected_return_date}</TableCell>
						<TableCell align="center">{row.releasing_personnel_name}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
		</>
	)
}

export default withStyles(styles)(BorrowedEquipments)
