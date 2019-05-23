import React from 'react'

//grabbing components
import MainContainer from './components/MainContainer'

//applying CSS
import './App.css'

//grabbing global state from Store
import Store from './Store'

const App = () => (
	<Store>
		<MainContainer />
	</Store>
)

export default App
