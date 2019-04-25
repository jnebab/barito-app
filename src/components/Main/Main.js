import React from 'react'
import { BrowserRouter as Route } from "react-router-dom"

import routes from '../../routes'

// import Forms from '../Forms/Forms'

const Main = props => {
	return (
		<div style={{ flex: 1, padding: "10px" }}>
				{routes.map((route, index) => (
					<Route
						key={index}
						path={route.path}
						exact={route.exact}
						component={route.main}
					/>
				))}
    </div>
	)
}

export default Main