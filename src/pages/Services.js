import React, { useState, useEffect } from "react";

import { PlusSmIcon as PlusSmIconSolid } from "@heroicons/react/solid";

import DOMPurify from "dompurify";

import { Link } from "react-router-dom";

import { getCollection } from "../cms";

import ServicesDetails from "../components/ServiceDetails";

export default function Services(props) {
	let [services, setServices] = useState([]);
	let [details, setDetails] = useState(false);

	useEffect(() => {
		getCollection("service")
			.then((data) => {
				setServices(data.entries);
                props.loader(false)
			})
			.catch((err) => console.error(err));
	}, []);

	let closeDetails = () => {
		setTimeout(() => {
			setDetails(false);
		}, 250);
	};

	return (
		<div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
			<div className="absolute inset-0">
				<div className="bg-white h-1/3 sm:h-2/3" />
			</div>
			<div className="relative max-w-7xl mx-auto">
				<div className="text-center">
					<h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
						Services
					</h2>
					<p className="mt-3 max-w-2xl mx-auto text-md sm:text-lg text-gray-500 sm:mt-4">
						Vous trouverez ici la liste des services que je propose.
					</p>
				</div>
				<div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
					{services.map((service) => (
                        service.publish && (
						<div
							key={service.titre}
							className="flex flex-col rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg"
							onClick={() =>
								service.description_detaillee &&
								setDetails(service)
							}
						>
							<div className="flex-shrink-0 object-cover">
								<img
									className="h-48 w-full object-cover"
									src={
										"https://cms.re-unir.fr/api/cockpit/image?token=fbf36043e1aef774506461b27f1cd1&m=thumbmail&w=400&h=180&f[brighten]=10&o=true&src=" +
										service.image.path
									}
									alt=""
								/>
							</div>
							<div className="flex-1 bg-white p-6 flex flex-col justify-between">
								<div className="flex-1 pb-5">
									<p className="text-sm font-medium text-green-600">
										{service.type}
									</p>
									<p className="text-xl font-semibold pt-2 text-gray-900">
										{service.titre}
									</p>
									<div
										className="mt-3 text-base text-gray-500"
										dangerouslySetInnerHTML={{
											__html: DOMPurify.sanitize(
												service.description_courte
											),
										}}
									></div>
                                    {service.description_detaillee && <div className="pt-4 prose prose-yellow"><a onClick={() => {setDetails(service)}}>Plus d'informations...</a></div>}
								</div>
                                {(service.duree_details || service.prix_details) && (
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
								{service.duree_details && (
									<div className="pt-1">
										<div className="pt-1 italic text-gray-500 text-sm">
											{service.duree_details}
										</div>
									</div>
								)}
								{service.prix_details && (
									<div className="pt-1">
										<div className="pt-1 italic text-gray-500 text-sm">
											{service.prix_details}
										</div>
									</div>
								)}
								<div className="mt-6 flex items-center">
									<div className="flex-shrink-0">
										<span className="sr-only">
											{service.prix}
										</span>
									</div>
									<div className="">
										<p className="text-sm font-medium text-gray-900">
											{service.prix}
										</p>
										<div className="flex space-x-1 text-sm text-gray-500">
											<span>{service.duree}</span>
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
										{service.description_detaillee && (
											<button
												onClick={() =>
													setDetails(service)
												}
												type="button"
												className="inline-flex ml-2 items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
											>
												<PlusSmIconSolid
													className="h-5 w-5"
													aria-hidden="true"
												/>
											</button>
										)}
									</div>
								</div>
							</div>
						</div>)
					))}
				</div>
			</div>
			{details && (
				<ServicesDetails
					service={details}
					closeDetails={closeDetails}
				/>
			)}
		</div>
	);
}
