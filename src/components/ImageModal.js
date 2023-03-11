import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function ImageModal(props) {
	const [open, setOpen] = useState(true);

	const cancelButtonRef = useRef(null);

	return (
		<Transition.Root
			show={open}
			as={Fragment}
		>
			<Dialog
				as="div"
				className="relative z-10"
				initialFocus={cancelButtonRef}
				onClose={() => {
					setOpen(false);
					props.closeImageModal();
				}}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
								<div>
									<div className="">
										<Dialog.Title
											as="h3"
											className="text-base leading-6 text-gray-900"
										>
											<span className="font-semibold">Image : </span>{props.wantedImageAlt}
										</Dialog.Title>
										<div className="mt-2">
											<img
												className="w-full rounded-lg shadow-md"
												src={
													"https://cms.re-unir.fr/api/cockpit/image?token=fbf36043e1aef774506461b27f1cd1&m=bestFit&w=900&h=900&f[brighten]=10&o=true&src=" +
													props.wantedImagePath
												}
												alt={props.wantedImageAlt}
											/>
										</div>
									</div>
								</div>
									<button
										type="button"
										className="mt-5 inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 sm:col-start-2"
										onClick={() => {
											setOpen(false);
											props.closeImageModal();
										}}
									>
										Fermer
									</button>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
