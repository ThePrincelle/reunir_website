import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

export default function NavBar() {
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
							<div className="flex-shrink-0 flex items-center">
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
							</div>
							<div className="hidden md:ml-6 md:flex md:space-x-8">
								{/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
								<a
									href="#"
									className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
								>
									Dashboard
								</a>
								<a
									href="#"
									className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
								>
									Team
								</a>
								<a
									href="#"
									className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
								>
									Projects
								</a>
								<a
									href="#"
									className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
								>
									Calendar
								</a>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="md:hidden">
						<div className="pt-2 pb-3 space-y-1">
							{/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
							<a
								href="#"
								className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
							>
								Dashboard
							</a>
							<a
								href="#"
								className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
							>
								Team
							</a>
							<a
								href="#"
								className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
							>
								Projects
							</a>
							<a
								href="#"
								className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium sm:pl-5 sm:pr-6"
							>
								Calendar
							</a>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
