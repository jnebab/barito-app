import React, { useContext } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import { PickupEventsContext } from '../../Store'

import './viewCalendar.scss'

const ViewCalendar = props => {
	const [pickupEvents, isLoadingEvents] = useContext(PickupEventsContext)

	const events = !isLoadingEvents && pickupEvents.map(({borrower_name, expected_return_date, reservee_name, date_to_pickup}) => {
		const event = borrower_name ? {
			title: `Return of Equipment by ${borrower_name}`,
			date: expected_return_date,
			color: 'orangered'
		} : {
			title: `Pickup of Equipment by ${reservee_name}`,
			date: date_to_pickup
		}
		return event
	})
	
	return (
		<>
			<FullCalendar
				handleWindowResize={true} 
				defaultView="dayGridMonth"
				plugins={[dayGridPlugin]}
				contentHeight={450}
				events={events}
				eventClick={function(info) {
					var eventObj = info.event;
		
					if (eventObj.url) {
						alert(
							'Clicked ' + eventObj.title + '.\n' +
							'Will open ' + eventObj.url + ' in a new tab'
						);
		
						window.open(eventObj.url);
		
						info.jsEvent.preventDefault(); // prevents browser from following link in current tab.
					} else {
						alert(eventObj.title);
					}
				}}
				eventLimit={true}
			/>
		</>
	)
}

export default ViewCalendar