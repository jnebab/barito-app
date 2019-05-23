import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import './viewCalendar.scss'

const ViewCalendar = props => {


	const handleDateClick = e => {
		e.preventDefault()
		console.log("Clicked!")
	}

	return (
		<>
			<FullCalendar
				handleWindowResize={true} 
				defaultView="dayGridMonth"
				plugins={[dayGridPlugin]}
				contentHeight={450}
				events={[{
					title: 'Fund Raising',
					date: '2019-05-14T13:00'
				}]}
			/>
		</>
	)
}

export default ViewCalendar