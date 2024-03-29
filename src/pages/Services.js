import React, { useState, useEffect } from "react";

import { PlusSmIcon as PlusSmIconSolid, DocumentDownloadIcon } from "@heroicons/react/solid";

import DOMPurify from "dompurify";

import { Link, useHistory } from "react-router-dom";

import { getCollection, downloadAsset } from "../cms";

import Tabs from "../components/Tabs";
import ServicesDetails from "../components/ServiceDetails";
import PaymentModal from "../components/PaymentModal";
import Teleconsulting from "../sections/services/Teleconsulting";

export default function Services(props) {
	let [services, setServices] = useState([]);
	let [details, setDetails] = useState(false);
	let [paymentsModal, setPaymentModal] = useState(false);
	let [currentTab, setCurrentTab] = useState("Particuliers");
	let [tabs, setTabs] = useState([]);

	let processTypes = (services, isPublished = true) => {
		// Tabs is generated from services on type string (tab1;tab2;tab3)
		let tabs = [];
		let entries = services;
		if (isPublished) {
			entries = services.filter((service) => service.publish);
		}
		entries.forEach((service) => {
			if (service.type) {
				let types = service.type.split(";");
				types.forEach((type) => {
					if (!tabs.includes(type)) {
						tabs.push(type);
					}
				});
			}
		});
		return tabs;
	}

	useEffect(() => {
		window.scrollTo(0, 0);
		props.loader(true);
		getCollection("service")
			.then((data) => {
				setServices(data.entries);
				setTabs(processTypes(data.entries, true));
				setCurrentTab(
					processTypes(data.entries, true)[0]
				);
				props.loader(false);
			})
			.catch((err) => console.error(err));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let closeDetails = () => {
		setTimeout(() => {
			setDetails(false);
		}, 250);
	};

	let closePaymentModal = () => {
		setTimeout(() => {
			setPaymentModal(false);
		}, 250);
	};

	let setTab = (tab) => {
		setCurrentTab(tab);
	};

	let displayDetails = (e, service) => {
		e.stopPropagation();
		setDetails(service);
	};

	let downloadForm = (e, service) => {
		e.stopPropagation();
		downloadAsset(service.form);
	};

	let history = useHistory();

	let parseTabs = (tabs) => {
		// Tabs is a string (tab1;tab2;tab3)
		// Split it and create a nice string (tab1, tab2 & tab3) (or tab1 & tab2)
		let parsedTabs = tabs.split(";");
		let parsedTabsString = "";
		parsedTabs.forEach((tab, index) => {
			if (index === parsedTabs.length - 1) {
				parsedTabsString += tab;
			} else if (index === parsedTabs.length - 2) {
				parsedTabsString += tab + " & ";
			} else {
				parsedTabsString += tab + ", ";
			}
		});
		return parsedTabsString;
	}

	return (
		<div className="bg-gray-50 relative px-4 sm:px-6 lg:px-8">
			<div className="pt-16 lg:pt-24">
				<div className="absolute inset-0 z-0">
					<div className="bg-white h-1/4 sm:h-2/4" />
				</div>
				<div className="relative max-w-7xl mx-auto">
					<div className="text-center">
						<h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
							Services
						</h2>
						{/* <p className="hidden sm:inline-block mt-3 max-w-2xl mx-auto text-md sm:text-lg text-gray-500 sm:mt-4">
							Vous trouverez ici la liste des services que je propose.
						</p> */}
					</div>
					{tabs.length > 1 && (
						<Tabs
							tabs={tabs}
							currentTab={currentTab}
							setCurrentTab={setTab}
						/>
					)}
					{/*(currentTab === "Professionnels" && assetsServices && assetsServices.image) && (
						<img
							className="h-32 sm:h-64 rounded-lg mt-8 w-full object-cover bg-gray-100"
							src={
								"https://cms.re-unir.fr/api/cockpit/image?token=fbf36043e1aef774506461b27f1cd1&m=crop&w=1300&h=400&f[brighten]=10&o=true&fp=top&src=" +
								assetsServices.image.path
							}
							alt=""
						/>
						)*/}
					<div className="mt-8 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
						{services.map(
							(service) =>
								service.publish &&
								service.type.split(";").includes(currentTab) && (
									<div
										key={service.titre}
										className="flex flex-col rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg"
										onClick={(e) => {
											service.description_detaillee &&
											displayDetails(e, service);
											// service.redirect && history.push(service.redirect)
										}}
									>
										{service.image &&
											"path" in service.image && (
												<div className="flex-shrink-0 object-cover">
													<img
														className="h-48 w-full object-cover bg-gray-100"
														src={
															"https://cms.re-unir.fr/api/cockpit/image?token=fbf36043e1aef774506461b27f1cd1&m=thumbmail&w=400&h=180&f[brighten]=10&o=true&src=" +
															service.image.path
														}
														alt=""
													/>
												</div>
											)}
										<div className="flex-1 bg-white p-6 flex flex-col justify-between">
											<div className="flex-1 pb-5">
												<p className="text-sm font-medium text-green-600">
													{parseTabs(service.type)}
												</p>
												<p className="text-xl font-semibold pt-2 text-gray-900">
													{service.titre}
												</p>
												<div
													className="mt-3 text-base prose prose-yellow text-gray-500 space-y-2"
													dangerouslySetInnerHTML={{
														__html: DOMPurify.sanitize(
															service.description_courte
														),
													}}
												></div>
												{service.description_detaillee && (
													<div className="pt-4 text-yellow-600 hover:text-yellow-700">
														<span
															onClick={() => {
																setDetails(
																	service
																);
															}}
															type="button"
														>
															Plus
															d'informations...
														</span>
													</div>
												)}

												{service.redirect && (
													<div className="pt-4 text-yellow-600 hover:text-yellow-700">
														<span
															onClick={() => {
																history.push(
																	service.redirect
																);
															}}
															type="button"
														>
															Plus
															d'informations...
														</span>
													</div>
												)}
											</div>
											{service.form && (
												<button 
													type="button" 
													onClick={(e) =>
														downloadForm(
															e, service
														)
													}
													className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 w-full justify-center"
													>
												<DocumentDownloadIcon
														className="-ml-1 mr-2 h-5 w-5"
														aria-hidden="true"
													/>
												Télécharger le formulaire d'inscription
												</button>
											)}
											{(service.duree_details ||
												service.prix_details) && (
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
											<div className="mt-4 flex items-center">
												{service.prix && (
													<div className="flex-shrink-0">
														<span className="sr-only">
															{service.prix}
														</span>
													</div>
												)}
												<div className="mr-4">
													{service.prix && (
														<p className="text-sm font-medium text-gray-900">
															{service.prix}
														</p>
													)}
													{service.duree && (
														<div className="flex space-x-1 text-sm text-gray-500">
															<span>
																{service.duree}
															</span>
														</div>
													)}
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
																setDetails(
																	service
																)
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
													{service.redirect && (
														<button
															onClick={() =>
																history.push(
																	service.redirect
																)
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
									</div>
								)
						)}
					</div>
				<div className="pb-10 pt-10 z-10">
					<Teleconsulting setPaymentModal={setPaymentModal} />
				</div>
				</div>
			</div>
			{details && (
				<ServicesDetails
					service={details}
					closeDetails={closeDetails}
				/>
			)}
			{paymentsModal && (
				<PaymentModal closePaymentModal={closePaymentModal} />
			)}
		</div>
	);
}
