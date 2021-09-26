import * as React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Psychamarche from './pages/Psychamarche'
import Contact from './pages/Contact'

function App() {
	const routes = [
		{
			id: "home",
			name: "Accueil",
			path: "/",
			exact: true,
			component: Home
		},
		{
			id: "presentations",
			name: "Présentations",
			path: "/presentations",
			exact: false,
			component: About
		},
		{
			id: "services",
			name: "Services",
			path: "/services",
			exact: false,
			component: Services
		},
		{
			id: "psychamarche",
			name: "Psychamarche",
			path: "/psychamarche",
			exact: false,
			component: Psychamarche
		},
		{
			id: "contact",
			name: "Contact",
			path: "/contact",
			exact: false,
			component: Contact
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
