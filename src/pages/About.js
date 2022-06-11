import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import DOMPurify from "dompurify";

import { CameraIcon } from "@heroicons/react/solid";

import { getSingleton } from "../cms";

export default function About(props) {
	const [contenu, setContenu] = useState("");
	const [profilePicture, setProfilePicture] = useState("");
	const [titre, setTitre] = useState("");
	const [firstParagraph, setFirstParagraph] = useState("");

	useEffect(() => {
		window.scrollTo(0, 0);
		props.loader(true);
		getSingleton("presentations")
			.then((data) => {
				setTitre(data.titre);
				setContenu(data.contenu);
				setProfilePicture(data.profile_pic);
				setFirstParagraph(data.first_paragraph);
				props.loader(false);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<div className="bg-white overflow-hidden">
			<div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
				<div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />
				<div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
					<div>
						{/* <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
							Case Study
						</h2> */}
						<h3 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
							{titre}
						</h3>
					</div>
				</div>
				<div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
					<div className="relative lg:row-start-1 lg:col-start-2">
						<svg
							className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20"
							width={404}
							height={384}
							fill="none"
							viewBox="0 0 404 384"
							aria-hidden="true"
						>
							<defs>
								<pattern
									id="de316486-4a29-4312-bdfc-fbce2132a2c1"
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
								fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
							/>
						</svg>
						{profilePicture && <div className="relative text-base mx-auto max-w-prose lg:max-w-none hidden lg:block">
							<figure>
								<div className="aspect-w-12 aspect-h-7 lg:aspect-none">
									<img
										className="rounded-lg shadow-lg object-cover object-center"
										src={
											"https://cms.re-unir.fr/api/cockpit/image?token=fbf36043e1aef774506461b27f1cd1&m=thumbmail&w=1184&h=1376&o=true&src=" +
											profilePicture.path
										}
										alt={profilePicture && profilePicture.meta.title}
										width={1184}
										height={1376}
									/>
								</div>
								{profilePicture.meta.author != null && profilePicture.meta.author != "" && <figcaption className="mt-3 flex text-sm text-gray-500">
									<CameraIcon
										className="flex-none w-5 h-5 text-gray-400"
										aria-hidden="true"
									/>
									<span className="ml-2">
										Photo prise par {profilePicture.meta.author}
									</span>
								</figcaption>}
							</figure>
						</div>}
					</div>
					<div className="mt-8 lg:mt-0">
					<div className="text-base max-w-prose mx-auto lg:max-w-none">
							<p className="text-lg text-gray-500">
								{firstParagraph}
							</p>
						</div>
						{profilePicture && <div className="mt-5 relative text-base mx-auto max-w-prose lg:max-w-none block lg:hidden">
							<figure>
								<div className="aspect-w-12 aspect-h-13 lg:aspect-none">
									<img
										className="rounded-lg shadow-lg object-cover object-center"
										src={
											"https://cms.re-unir.fr/api/cockpit/image?token=fbf36043e1aef774506461b27f1cd1&m=thumbmail&w=1184&h=1376&o=true&src=" +
											profilePicture.path
										}
										alt={profilePicture && profilePicture.meta.title}
										width={1184}
										height={1376}
									/>
								</div>
								{profilePicture.meta.author != null && profilePicture.meta.author != "" && <figcaption className="mt-3 flex text-sm text-gray-500">
									<CameraIcon
										className="flex-none w-5 h-5 text-gray-400"
										aria-hidden="true"
									/>
									<span className="ml-2">
										Photo prise par {profilePicture.meta.author}
									</span>
								</figcaption>}
							</figure>
						</div>}
						<div
							className="mt-6 lg:mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1"
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(contenu),
							}}
						></div>
					</div>
					
				</div>
				<div className="mt-8 inline-flex rounded-md shadow">
							<Link
								to="/services"
								className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
							>
								Mes Services
							</Link>
						</div>
			</div>
		</div>
	);
}
