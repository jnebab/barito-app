import React from 'react'

import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarCheck, faCheckSquare, faClipboardCheck, faPlusSquare, faClipboardList, faFileSignature, faFileUpload, faArchive } from '@fortawesome/free-solid-svg-icons'

import routes from '../../routes'

import './Header.scss'


const Header = props => {

	return (
		<Router>
			<header>
				<h1>BaRITO <small>powered by PGIN</small></h1>
				<nav>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
							<FontAwesomeIcon icon={faCalendarCheck} size="lg"/>
              <Link to="/">View Calendar</Link>
            </li>
            <li>
							<FontAwesomeIcon icon={faCheckSquare} size="lg"/>
              <Link to="/available-equipments">Available Equipments</Link>
            </li>
            <li>
							<FontAwesomeIcon icon={faClipboardCheck} size="lg" />
              <Link to="/borrowed-equipments">Borrowed Equipments</Link>
            </li>
						<li>
							<FontAwesomeIcon icon={faPlusSquare} size="lg" />
              <Link to="/add-new-equipments">Add New Equipment</Link>
            </li>
						<li>
							<FontAwesomeIcon icon={faClipboardList} size="lg" />
              <Link to="/reservation-form">Reservation Form</Link>
            </li>
						<li>
							<FontAwesomeIcon icon={faFileSignature} size="lg" />
              <Link to="/borrowing-form">Borrowing Form</Link>
            </li>
						<li>
							<FontAwesomeIcon icon={faFileUpload} size="lg" />
              <Link to="/returning-form">Returning Form</Link>
            </li>
						<li>
							<FontAwesomeIcon icon={faArchive} size="lg" />
              <Link to="/history-log">History Log</Link>
            </li>
          </ul>
				</nav>
			</header>
			<main>
						{routes.map((route, index) => (
							<Route
								key={index}
								path={route.path}
								exact={route.exact}
								component={route.main}
							/>
						))}
				</main>
    </Router>
	)
}

export default Header
