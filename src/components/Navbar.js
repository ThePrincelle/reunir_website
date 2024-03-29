import { Fragment } from 'react'
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import {
	Link,
	withRouter
  } from "react-router-dom";

function Navbar(props) {
    let linkActive = "border-yellow-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"

	let linkActiveMobile = "bg-yellow-50 border-yellow-500 text-yellow-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"

	let linkNotActive = "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"

	let linkNotActiveMobile = "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6 transition-colors"

	return (
		<Popover as="nav" className="bg-white shadow">
			{({ open }) => (
				<>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex justify-between h-16 full-width flex-row-reverse lg:flex-row">
							<div className="-ml-2 mr-2 flex items-center lg:hidden">
								{/* Mobile menu button */}
								<Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500 transition-colors">
									<span className="sr-only">Ouvrir le menu de navigation</span>
									{open ? (
										<XIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<MenuIcon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Popover.Button>
							</div>
							<Link to="/" className="flex-shrink-0 flex items-center">
								<h1 className="text-2xl font-bold antialiased text-green-700">Ré-Unir<span className="hidden md:inline-block text-gray-900">, un espace dédié à la <span className="text-green-600">parole</span>.</span></h1>
							</Link>
							<div className="hidden lg:ml-6 lg:flex lg:space-x-7">
								{props.routes.map(route => {
									return (route.disableMainNav !== true && <Link
										key={route.id}
										to={route.path}
										className={props.location.pathname === route.path ? linkActive : linkNotActive}
									>
										{route.name}
									</Link>)
							})}
							</div>
						</div>
					</div>
					<Transition
						as={Fragment}
						enter="duration-150 ease-out"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="duration-100 ease-in"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
					<Popover.Panel className="lg:hidden">
						<div className="pt-2 pb-3 space-y-1">
							{props.routes.map(route => {
								return (route.disableMainNav !== true && <Link
									key={route.id}
									to={route.path}
									className={props.location.pathname === route.path ? linkActiveMobile : linkNotActiveMobile}
								>
									{route.name}
								</Link>)
							})}
						</div>
					</Popover.Panel>
				</Transition>
				</>
			)}
		</Popover>
	);
}

export default withRouter(Navbar);