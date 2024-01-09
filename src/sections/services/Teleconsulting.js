import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";

import { getSingleton } from "../../cms";

// import { CreditCardIcon } from "@heroicons/react/solid";

export default function Teleconsulting(props) {
	const [title, setTitle] = useState("");
	const [subtitle, setSubtitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		getSingleton("teleconsulting")
			.then((data) => {
				setTitle(data.title);
				setSubtitle(data.subtitle);
				setContent(data.content);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<div className="">
			<div className="max-w-7xl mx-auto py-12 px-0 sm:px-6 lg:py-16 lg:px-8 lg:flex-row lg:justify-between">
				<h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
					<span className="block">{subtitle}</span>
					<span className="block text-green-600">{title}</span>
				</h2>
				<p
					className="prose prose-green prose-md mt-6"
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(content),
					}}
				></p>
				{/* <div className="mt-8">
					<div className="inline-flex rounded-md shadow w-2/3 sm:w-1/3 h-16">
						<button
							onClick={() => {
								props.setPaymentModal(true);
							}}
							type="button"
							className="inline-flex items-center min-w-full justify-center px-5 py-1 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
						>
							<CreditCardIcon className="w-12" />
							<span className="ml-2">Paiement via PayPal</span>
						</button>
					</div>
				</div> */}
			</div>
		</div>
	);
}
