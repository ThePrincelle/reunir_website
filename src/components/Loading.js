import { Fragment } from "react";
import { Transition } from "@headlessui/react";

export default function Loading(props) {
	return (
		<Transition
			show={props.loading}
			as={Fragment}
			enter="ease-out"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in duration-300"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<div className="bg-white w-screen h-screen z-20 flex flex-col items-center justify-center content-around m-auto pb-48 text-green-600 transition-opacity">
				<svg
					className="animate-spin h-20 w-20 text-green-600"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				<span className="text-gray-600 pt-6">Chargement en cours</span>
			</div>
		</Transition>
	);
}
