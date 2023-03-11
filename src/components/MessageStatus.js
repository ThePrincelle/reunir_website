/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";

export default function MessageStatus(props) {
	const [open, setOpen] = useState(true);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-10 inset-0 overflow-y-auto"
				onClose={() => {setOpen(false); props.closeStatus(null)}}
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
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-16 sm:align-middle sm:max-w-lg sm:w-full p-5 px-14 m-auto mt-1/2 sm:p-6">
							<div>
							{props.status === "OK" ? <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
									<CheckIcon
										className="h-6 w-6 text-green-600"
										aria-hidden="true"
									/>
								</div> : <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
									<XIcon
										className="h-6 w-6 text-red-600"
										aria-hidden="true"
									/>
								</div>}
								<div className="mt-3 text-center sm:mt-5">
									<Dialog.Title
										as="h3"
										className="text-lg leading-6 font-medium text-gray-900"
									>
										{props.status === "OK" ? "Message envoyé avec succès" : "Erreur lors de l'envoi du message"} 
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
										{props.status === "OK" ? "Votre message a bien été envoyé." : "Vous pouvez tenter de recommencer ou alors m'envoyer un message directement."}
										</p>
									</div>
								</div>
							</div>
							<div className="mt-5 sm:mt-6">
								<button
									type="button"
									className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:text-sm"
									onClick={() => {setOpen(false); props.closeStatus(null)}}
								>
									Retour au formulaire
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
