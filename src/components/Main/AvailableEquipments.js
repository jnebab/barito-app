import React, { useContext, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import { Table, TableHead, TableRow, TableCell, Tooltip, TableSortLabel } from '@material-ui/core';
//import { withStyles } from '@material-ui/core/styles'

//import { eqContext } from './Context'
//import { availableEquipments } from '../../datasource'

const AvailableEquipments = props => {
	const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;
	//const { availableEquipments } = useContext(eqContext)

	// useEffect(() => {
	// 	console.log(availableEquipments)
	// }, [])

	const createSortHandler = property => event => {
		this.props.onRequestSort(event, property)
	}


	const rows = [
		{ id: 'id', numeric: true, disablePadding: true, label: 'Equipment ID' },
		{ id: 'brand', numeric: false, disablePadding: false, label: 'Equipment Brand' },
		{ id: 'unit', numeric: false, disablePadding: false, label: 'Equipment Unit' },
		{ id: 'model', numeric: false, disablePadding: false, label: 'Equipment Model' },
		{ id: 'serial', numeric: false, disablePadding: false, label: 'Equipment Serial Number' },
		{ id: 'description', numeric: false, disablePadding: false, label: 'Description'},
		{ id: 'status', numeric: false, disablePadding: false, label: 'Status'}
	]

	return (
		<>
			<Typography variant="h6" id="tableTitle">Available Equipments</Typography>
			<TableHead>
				<TableRow>
					{rows.map(
							row => (
								<TableCell
									key={row.id}
									align={row.numeric ? 'right' : 'left'}
									padding={row.disablePadding ? 'none' : 'default'}
									sortDirection={orderBy === row.id ? order : false}
								>
									<Tooltip
										title="Sort"
										placement={row.numeric ? 'bottom-end' : 'bottom-start'}
										enterDelay={300}
									>
										<TableSortLabel
											active={orderBy === row.id}
											direction={order}
											onClick={createSortHandler(row.id)}
										>
											{row.label}
										</TableSortLabel>
									</Tooltip>
								</TableCell>
							),
							this,
						)}
				</TableRow>
			</TableHead>
		</>
	)
}

export default AvailableEquipments