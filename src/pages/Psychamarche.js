import React, { useState, useEffect } from "react";

import { CameraIcon } from "@heroicons/react/solid";

import { ChevronRightIcon, HomeIcon, DocumentDownloadIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

import DOMPurify from "dompurify";

import { getSingleton, downloadAsset } from "../cms";

import { HashLink } from "react-router-hash-link";

import Events from "../sections/psychamarches/Events";
import Participate from "../sections/psychamarches/Participate";

const pages = [
	{ name: "Services", href: "/services", current: false },
	{ name: "Psychamarche", href: "/psychamarche", current: true },
];

export default function Psychamarche(props) {
	let [content, setContent] = useState(null);

	useEffect(() => {
		window.scrollTo(0, 0);
		props.loader(true);
		getSingleton("psychamarche")
			.then((data) => {
				setContent(data);
				props.loader(false);
			})
			.catch((err) => console.error(err));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let downloadForm = () => {
		downloadAsset(content.form)
	}

	return (
		<div className="bg-white overflow-hidden">
			<div className="relative max-w-7xl mx-auto pt-5 py-16 px-4 sm:px-6 lg:px-8">
				<div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />

				<nav className="flex" aria-label="Breadcrumb">
					<ol className="flex items-center space-x-2">
						<li>
							<div>
								<Link
									to="/"
									className="text-gray-400 hover:text-gray-500 transition-colors"
								>
									<HomeIcon
										className="flex-shrink-0 h-5 w-5"
										aria-hidden="true"
									/>
									<span className="sr-only">Accueil</span>
								</Link>
							</div>
						</li>
						{pages.map((page) => (
							<li key={page.name}>
								<div className="flex items-center">
									<ChevronRightIcon
										className="flex-shrink-0 h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
									<Link
										to={page.href}
										className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
										aria-current={
											page.current ? "page" : undefined
										}
									>
										{page.name}
									</Link>
								</div>
							</li>
						))}
					</ol>
				</nav>

				<div className="mx-auto mt-8 text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
					<div>
						<h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
							Psychamarche
						</h3>
						{/* <HashLink to="/psychamarche#events">
							<button
								type="button"
								className="inline-flex mr-4  mt-4 ml-0 items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 space-x-1"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 animate-pulse"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
									/>
								</svg>
								<span className="text-sm font-medium pr-1">
									Aller aux évènements
								</span>
							</button>
						</HashLink>
						<button
							type="button"
							onClick={() =>
								downloadForm()
							}
							className="inline-flex mt-4 items-center p-1.5 border border-transparent rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 space-x-1"
						>
							<DocumentDownloadIcon
								className="h-6 w-6"
								aria-hidden="true"
							/>
							<span className="text-sm font-medium pr-1">
								Télécharger le formulaire d'inscription
							</span>
						</button> */}
					</div>
				</div>
				{content && (
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
							<div className="relative text-base mx-auto max-w-prose lg:max-w-none">
								<figure>
									<div className="aspect-w-12 aspect-h-7 lg:aspect-none">
										<img
											className="rounded-lg shadow-lg object-cover object-center bg-gray-100"
											src={
												"https://cms.re-unir.fr/api/cockpit/image?token=fbf36043e1aef774506461b27f1cd1&m=thumbmail&w=1184&h=1376&f[brighten]=10&o=true&src=" +
												content.image.path
											}
											alt="Illustration pour les psychamarches"
											width={1184}
											height={1376}
										/>
									</div>
									{content.image_author && (
										<figcaption className="mt-3 flex text-sm text-gray-500">
											<CameraIcon
												className="flex-none w-5 h-5 text-gray-400"
												aria-hidden="true"
											/>
											<span className="ml-2">
												{content.image_author}
											</span>
										</figcaption>
									)}
								</figure>
							</div>
						</div>
						<div className="mt-8 lg:mt-0">
							<div
								className="text-lg max-w-prose mx-auto lg:max-w-none space-y-3 pb-3"
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(
										content.description_first_paragraph
									),
								}}
							></div>
							<div
								className="mt-4 prose prose-yellow text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1"
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(
										content.description
									),
								}}
							></div>
						</div>
					</div>
				)}
			</div>
			{content && <Participate content={content} />}
			{content && <Events content={content} />}
		</div>
	);
}
