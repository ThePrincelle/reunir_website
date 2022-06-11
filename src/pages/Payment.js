import React, { useState, useEffect } from "react";

import { LinkIcon } from "@heroicons/react/solid";

import { getSingleton } from "../cms";

import DOMPurify from "dompurify";

export default function Payment(props) {
	const [texts, setTexts] = useState(null);

	useEffect(() => {
		window.scrollTo(0, 0);
		props.loader(true);
		getSingleton("payment")
			.then((data) => {
				setTexts(data);
				props.loader(false);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<div className="relative py-16 bg-white overflow-hidden">
			<div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
				<div
					className="relative h-full text-lg max-w-prose mx-auto"
					aria-hidden="true"
				>
					<svg
						className="absolute top-12 left-full transform translate-x-32"
						width={404}
						height={384}
						fill="none"
						viewBox="0 0 404 384"
					>
						<defs>
							<pattern
								id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
								x={0}
								y={0}
								width={20}
								height={20}
								patternUnits="userSpaceOnUse"
							>
								<rect
									x={0}
									y={0}
									width={4}
									height={4}
									className="text-gray-200"
									fill="currentColor"
								/>
							</pattern>
						</defs>
						<rect
							width={404}
							height={384}
							fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
						/>
					</svg>
					<svg
						className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
						width={404}
						height={384}
						fill="none"
						viewBox="0 0 404 384"
					>
						<defs>
							<pattern
								id="f210dbf6-a58d-4871-961e-36d5016a0f49"
								x={0}
								y={0}
								width={20}
								height={20}
								patternUnits="userSpaceOnUse"
							>
								<rect
									x={0}
									y={0}
									width={4}
									height={4}
									className="text-gray-200"
									fill="currentColor"
								/>
							</pattern>
						</defs>
						<rect
							width={404}
							height={384}
							fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
						/>
					</svg>
					<svg
						className="absolute bottom-12 left-full transform translate-x-32"
						width={404}
						height={384}
						fill="none"
						viewBox="0 0 404 384"
					>
						<defs>
							<pattern
								id="d3eb07ae-5182-43e6-857d-35c643af9034"
								x={0}
								y={0}
								width={20}
								height={20}
								patternUnits="userSpaceOnUse"
							>
								<rect
									x={0}
									y={0}
									width={4}
									height={4}
									className="text-gray-200"
									fill="currentColor"
								/>
							</pattern>
						</defs>
						<rect
							width={404}
							height={384}
							fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
						/>
					</svg>
				</div>
			</div>
			{texts && (
				<div className="relative px-4 sm:px-6 lg:px-8">
					<div className="text-lg max-w-prose mx-auto">
						<h1>
							{/* <span className="block text-base text-center text-green-600 font-semibold tracking-wide uppercase">
								{texts.subtitle}
							</span> */}
							<span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
								{texts.title}
							</span>
						</h1>
					</div>
					<div
						className="mt-6 prose prose-green prose-lg text-gray-500 mx-auto text-justify"
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(texts.content),
						}}
					/>
					{texts.paypal_qrcode && (
						<div className="relative text-center mx-auto max-w-md mt-10">
							<figure>
								<div className="aspect-w-4 aspect-h-4">
                                    <a href={texts.paypal_link} target="_blank">
									<img
										className="rounded-lg shadow-lg hover:shadow-xl transition-shadow object-cover object-center"
										src={
											"https://cms.re-unir.fr/api/cockpit/image?token=fbf36043e1aef774506461b27f1cd1&m=thumbmail&w=1000&h=1000&o=true&src=" +
											texts.paypal_qrcode.path
										}
										alt={texts.paypal_link}
										width={500}
										height={500}
									/></a>
								</div>
								{texts.paypal_link != "" && (
									<figcaption className="mt-3 flex text-sm text-green-600 hover:text-green-800">
										<LinkIcon
											className="flex-none w-5 h-5"
											aria-hidden="true"
										/>
										<a
											href={texts.paypal_link}
											target="_blank"
											className="ml-2"
										>
											{texts.paypal_link}
										</a>
									</figcaption>
								)}
							</figure>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
