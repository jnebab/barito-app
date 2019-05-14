import React, { useContext, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
//import { withStyles } from '@material-ui/core/styles'

//import { eqContext } from './Context'

const AvailableEquipments = props => {
	//const { availableEquipments } = useContext(eqContext)

	// useEffect(() => {
	// 	console.log(availableEquipments)
	// }, [])


	return (
		<>
			<Typography component="h2" variant="h1" gutterBottom>Available Equipments</Typography>
		</>
	)
}

export default AvailableEquipments