import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { LinkIcon } from "@heroicons/react/solid";

import { getSingleton } from "../cms";

import DOMPurify from "dompurify";

export default function PaymentModal(props) {
	const [open, setOpen] = useState(true);
	const [texts, setTexts] = useState(null);

	useEffect(() => {
		getSingleton("payment")
			.then((data) => {
				setTexts(data);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-10 inset-0 overflow-y-auto"
				onClose={() => {
					setOpen(false);
					props.closeDetails();
				}}
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
							<div>
								<div className="flex-1 bg-white pb-6 p-2 flex flex-col justify-between">
									{texts ? (
										<div className="flex-1">
											<p className="text-sm font-medium text-green-600">
												{texts.subtitle}
											</p>
											<p className="text-xl font-semibold text-gray-900">
												{texts.title}
											</p>
											<div
												className="flex-row space-between pb-1 mt-3 overflow-y text-base text-gray-500 space-y-2 prose prose-yellow"
												dangerouslySetInnerHTML={{
													__html: DOMPurify.sanitize(
														texts.content
													),
												}}
											/>
											{texts.paypal_qrcode && (
												<div className="relative text-center mx-auto max-w-prose lg:max-w-none">
													<figure>
														<div className="aspect-w-4 aspect-h-4">
															<img
																className="rounded-lg shadow-lg object-cover object-center"
																src={
																	"https://cms.re-unir.fr/api/cockpit/image?token=fbf36043e1aef774506461b27f1cd1&m=thumbmail&w=1000&h=1000&o=true&src=" +
																	texts
																		.paypal_qrcode
																		.path
																}
																alt={
																	texts.paypal_link
																}
																width={500}
																height={500}
															/>
														</div>
														{texts.paypal_link !=
															"" && (
															<figcaption className="mt-3 flex text-sm text-green-600 hover:text-green-800">
																<LinkIcon
																	className="flex-none w-5 h-5"
																	aria-hidden="true"
																/>
																<a
																	href={
																		texts.paypal_link
																	}
																	target="_blank"
																	className="ml-2 "
																>
																	{
																		texts.paypal_link
																	}
																</a>
															</figcaption>
														)}
													</figure>
												</div>
											)}
										</div>
									) : <div className="flex-1 text-center py-36">
                      Chargement en cours...
                    </div>}
								</div>
							</div>
							<button
								type="button"
								className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm"
								onClick={() => {
									setOpen(false);
									props.closePaymentModal();
								}}
							>
								Retour
							</button>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
