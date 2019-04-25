import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import './main.scss'

const ViewCalendar = props => {
	return (
		<FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} weekends={false}/>
	)
}

export default ViewCalendar