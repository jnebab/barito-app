import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import './viewCalendar.scss'

const ViewCalendar = props => {
	return (
		<FullCalendar 
			handleWindowResize={true} 
			defaultView="dayGridMonth" 
			plugins={[dayGridPlugin]} 
			contentHeight={450}
			selectable={true}
			/>
	)
}

export default ViewCalendar