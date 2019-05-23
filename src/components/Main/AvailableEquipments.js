import React, { useContext, useEffect } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

import { AvailableEquipmentContext } from '../../Store'

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

const AvailableEquipments = props => {
	const { classes } = props
	const [availableEquipments, isLoadingAvailable] = useContext(AvailableEquipmentContext)

	useEffect(() => {
		console.log(availableEquipments)
	})

	const rows = availableEquipments

	return (
		<>
		<h2 style={{textAlign: 'center'}}>Available Equipment</h2>
		<Table className={classes.table}>
			<TableHead>
				<TableRow>
					<TableCell align="center">Equipment ID</TableCell>
					<TableCell align="center">Equipment Brand</TableCell>
					<TableCell align="center">Equipment Unit</TableCell>
					<TableCell align="center">Equipment Model</TableCell>
					<TableCell align="center">Equipment Serial Number</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{rows.map((row, index) => (
					<TableRow key={index}>
						<TableCell align="center">{row.eq_id}</TableCell>
						<TableCell align="center">{row.eq_brand}</TableCell>
						<TableCell align="center">{row.eq_unit}</TableCell>
						<TableCell align="center">{row.eq_model}</TableCell>
						<TableCell align="center">{row.eq_serial}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
		</>
	)
}

export default withStyles(styles)(AvailableEquipments)
