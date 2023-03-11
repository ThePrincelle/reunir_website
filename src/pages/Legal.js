import React, { useState, useEffect } from "react";
import { getSingleton } from "../cms";
import DOMPurify from "dompurify";

export default function Legal(props) {
	let [content, setContent] = useState(null);

	useEffect(() => {
		props.loader(true);
		getSingleton("legal")
			.then((data) => {
				setContent(data.content);
				props.loader(false);
			})
			.catch((err) => console.error(err));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Mentions Légales page
	return (
		<div className="relative py-20 bg-white overflow-hidden">
			<div className="pt-10 hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
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
			<div className="relative px-4 sm:px-6 lg:px-8">
				<div className="text-lg max-w-prose mx-auto">
					<h1>
						<span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
							Mentions Légales
						</span>
					</h1>
                    <div
                        className="pt-10 prose prose-yellow prose-lg text-gray-500 lg:max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(content),
                        }}
                    ></div>
				</div>
			</div>
		</div>
	);
}
