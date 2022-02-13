import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Psychamarche from "./pages/Psychamarche";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";

function App() {
	const routes = [
		{
			id: "home",
			name: "Accueil",
			path: "/",
			exact: true,
			component: Home,
		},
		{
			id: "presentations",
			name: "Présentations",
			path: "/presentations",
			exact: false,
			component: About,
		},
		{
			id: "services",
			name: "Services",
			path: "/services",
			exact: false,
			component: Services,
		},
		{
			id: "psychamarche",
			name: "Psychamarche",
			path: "/psychamarche",
			exact: false,
			component: Psychamarche,
		},
		{
			id: "contact",
			name: "Contact",
			path: "/contact",
			exact: false,
			component: Contact,
		},
		{
			id: "legal",
			name: "Mentions légales",
			path: "/legal",
			exact: false,
			disableMainNav: true,
			component: Legal,
		}
	];

	let [loading, setLoading] = useState(true);

	let setLoaded = (state) => {
		setLoading(state);
	};

	return (
		<Router>
			<div>
				<Navbar routes={routes} />
				<Loading loading={loading} />

				<Switch>
					{routes.map((route) => (
						<Route
							key={route.id}
							path={route.path}
							exact={route.exact}
						>
							<route.component loader={setLoaded} />
						</Route>
					))}
					<Redirect to="/" />
				</Switch>

				<Footer routes={routes} />
			</div>
		</Router>
	);
}

export default App;
