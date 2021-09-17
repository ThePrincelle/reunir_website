import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import {
	Link,
	useLocation
  } from "react-router-dom";

export default function Navbar(props) {
    let linkActive = "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"

	let linkActiveMobile = "bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"

	let linkNotActive = "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"

	let linkNotActiveMobile = "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"

	let location = useLocation();

	return (
		<Disclosure as="nav" className="bg-white shadow">
			{({ open }) => (
				<>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex justify-between h-16 full-width sm:flex-row flex-row-reverse">
							<div className="-ml-2 mr-2 flex items-center md:hidden">
								{/* Mobile menu button */}
								<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<MenuIcon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<Link to="/" className="flex-shrink-0 flex items-center">
								<img
									className="block lg:hidden h-8 w-auto"
									src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
									alt="Workflow"
								/>
								<img
									className="hidden lg:block h-8 w-auto"
									src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
									alt="Workflow"
								/>
							</Link>
							<div className="hidden md:ml-6 md:flex md:space-x-8">
								{/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
								<Link
									to="/"
									className={location.pathname === "/" ? linkActive : linkNotActive}
								>
									Accueil
								</Link>
								<Link
									to="/about"
									className={location.pathname === "/about" ? linkActive : linkNotActive}
								>
									About
								</Link>
								<Link
									to="/users"
									className={location.pathname === "/users" ? linkActive : linkNotActive}
								>
									Users
								</Link>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="md:hidden">
						<div className="pt-2 pb-3 space-y-1">
							{/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
							<Link
								to="/"
								className={location.pathname === "/" ? linkActiveMobile : linkNotActiveMobile}
							>
								Accueil
							</Link>
							<Link
								to="/about"
								className={location.pathname === "/about" ? linkActiveMobile : linkNotActiveMobile}
							>
								About
							</Link>
							<Link
								to="/users"
								className={location.pathname === "/users" ? linkActiveMobile : linkNotActiveMobile}
							>
								Users
							</Link>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
