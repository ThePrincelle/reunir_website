import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Link } from "react-router-dom";

import DOMPurify from "dompurify";

export default function ServicesDetails(props) {
	const [open, setOpen] = useState(true);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-10 inset-0 overflow-y-auto"
				onClose={() => {setOpen(false); props.closeDetails();}}
			>
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-400"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="inline-block align-bottom bg-white rounded-lg px-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-16 sm:align-middle sm:max-w-lg sm:w-full p-5 sm:p-6">
							<img
								className="flex-shrink-0 rounded-t-lg absolute inset-0 h-48 w-full min-w-full object-cover"
								src={
									"https://cms.re-unir.fr/api/cockpit/image?token=fbf36043e1aef774506461b27f1cd1&m=thumbmail&w=400&h=180&f[brighten]=10&o=true&src=" +
									props.service.image.path
								}
								alt=""
							/>
							<div className="pt-40">
								<div className="flex-1 bg-white pt-8 pb-6 p-2 flex flex-col justify-between">
									<div className="flex-1 pb-5">
										<p className="text-sm font-medium text-green-600">
											{props.service.type}
										</p>
										<p className="text-xl font-semibold text-gray-900">
											{props.service.titre}
										</p>
										<div
											className="flex-row space-between pb-1 mt-3 overflow-y text-base text-gray-500 space-y-2"
											dangerouslySetInnerHTML={{
												__html: DOMPurify.sanitize(
													props.service
														.description_detaillee
												),
											}}
										></div>
									</div>
                                    {(props.service.duree_details || props.service.prix_details) && (
									<div className="pt-3">
										<div className="relative">
											<div
												className="absolute inset-0 flex items-center"
												aria-hidden="true"
											>
												<div className="w-full border-t border-gray-300" />
											</div>
											<div className="relative flex justify-center">
												<span className="px-2 bg-white text-sm text-gray-500">
													Détails
												</span>
											</div>
										</div>
									</div>
								)}
								{props.service.duree_details && (
									<div className="pt-1">
										<div className="pt-1 italic text-gray-500 text-sm">
											{props.service.duree_details}
										</div>
									</div>
								)}
								{props.service.prix_details && (
									<div className="pt-1">
										<div className="pt-1 italic text-gray-500 text-sm">
											{props.service.prix_details}
										</div>
									</div>
								)}
									<div className="mt-6 flex items-center">
										<div className="flex-shrink-0">
											<span className="sr-only">
												{props.service.prix}
											</span>
										</div>
										<div className="">
											<p className="text-sm font-medium text-gray-900">
												{props.service.prix}
											</p>
											<div className="flex space-x-1 text-sm text-gray-500">
												<span>
													{props.service.duree}
												</span>
											</div>
										</div>
										<div className="ml-auto align-center flex">
											<Link to="/contact">
												<button
													type="button"
													className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
												>
													Contact
												</button>
											</Link>
										</div>
									</div>
								</div>
							</div>
							<button
								type="button"
								className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm"
								onClick={() => {
									setOpen(false);
									props.closeDetails();
								}}
							>
								Retourner aux services
							</button>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
