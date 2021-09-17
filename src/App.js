import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar'

function App() {
	let activePage, setActivePage = useState("home");

	const wrapperSetActivePage = useCallback(val => {
		setActivePage(val);
	  }, [setActivePage]);

	let routes = [
		{
			id: "home",
			route: "/",
			active: true
		},
		{
			id: "about",
			route: "/about",
			active: false
		},
		{
			id: "users",
			route: "/users",
			active: false
		}
	];

	return (
		<div className="App">
			<Router>
				<Navbar routes={routes} activePage={activePage} setActivePage={wrapperSetActivePage} />

				<Switch>
					<Route path="/about">
						<p>About</p>
					</Route>
					<Route path="/users">
						<p>Users</p>
					</Route>
					<Route path="/">
						<p>Home</p>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
