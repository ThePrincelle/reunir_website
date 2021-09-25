import * as React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Users from './pages/Users'


function App() {
	const routes = [
		{
			id: "home",
			navbar: true,
			name: "Accueil",
			path: "/",
			exact: true,
			component: Home
		},
		{
			id: "psychanalyse",
			navbar: true,
			name: "Psychanalyse",
			path: "/psychanalyse",
			exact: false,
			component: About
		},
		{
			id: "services",
			navbar: true,
			name: "Services",
			path: "/services",
			exact: false,
			component: Users
		},
		{
			id: "psychamarche",
			navbar: true,
			name: "Psychamarche",
			path: "/psychamarche",
			exact: false,
			component: Users
		},
		{
			id: "contact",
			navbar: true,
			name: "Contact",
			path: "/contact",
			exact: false,
			component: Users
		}
	];

	return (
		<Router>
			<div>
				<Navbar routes={routes} />

				<Switch>

				{routes.map((route) => (
					<Route key={route.id} path={route.path} exact={route.exact}>
						<route.component />
					</Route>
				))}

				<Redirect to="/"/>

				</Switch>

				<Footer routes={routes} />
			</div>
		</Router>
	);
}

export default App;
