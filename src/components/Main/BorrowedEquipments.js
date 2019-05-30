import React, { useContext, useEffect } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Link } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { BorrowedEquipmentContext } from '../../Store'

import './viewCalendar.scss'

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
	
	const rows = borrowedEquipments.filter(eq => eq.returned_eq_remarks === null)

	return (
		<>
		<h2 style={{textAlign: 'center'}}>Borrowed Equipment</h2>
		<Table className={classes.table}>
			<TableHead>
				<TableRow>
					<TableCell align="center">Equipment ID</TableCell>
					<TableCell align="center">Equipment Name (Brand Model Unit)</TableCell>
					<TableCell align="center">Borrower's Name</TableCell>
					<TableCell align="center">Borrower's Office</TableCell>
					<TableCell align="center">Borrower's Purpose</TableCell>
					<TableCell align="center">Borrowed Date</TableCell>
					<TableCell align="center">Expected Date of Return</TableCell>
					<TableCell align="center">Releasing Personnel</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{!isLoadingBorrowed && rows.map((row, index) => {
					const options = {
						year: 'numeric',
						month: 'numeric',
						day: 'numeric',
						hour: 'numeric',
						minute: 'numeric',
						second: 'numeric'
					}
					const equipmentName = `${row.eq_brand} ${row.eq_model} ${row.eq_unit}`
					const borrowedDate = Date.parse(row.borrowed_date)
					const expectedReturnDate = Date.parse(row.expected_return_date)
					return (<TableRow key={index}>
						<TableCell align="center">{row.eq_id}</TableCell>
						<TableCell align="center">{equipmentName}</TableCell>
						<TableCell align="center"><Link>{row.borrower_name}<div className="b-signature"><img src={row.borrower_signature} alt="Borrower's Signature" width="500" /></div></Link></TableCell>
						<TableCell align="center">{row.borrower_office}</TableCell>
						<TableCell align="center">{row.borrower_purpose}</TableCell>
						<TableCell align="center">{new Intl.DateTimeFormat('en-US', options).format(borrowedDate)}</TableCell>
						<TableCell align="center">{new Intl.DateTimeFormat('en-US', options).format(expectedReturnDate)}</TableCell>
						<TableCell align="center"><Link>{row.releasing_personnel_name}<div className="p-signature"><img src={row.releasing_personnel_signature} alt="Personnel's Signature" width="500" /></div></Link></TableCell>
					</TableRow>)
				})}
			</TableBody>
		</Table>
		</>
	)
}

export default withStyles(styles)(BorrowedEquipments)
