import React, { Fragment, useState, useEffect } from "react";

import { getCollection, sendForm } from "../cms";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };

const objects = [
	{ id: "autre", name: "Autre" },
	{ id: "rdv", name: "Demande de rendez-vous" },
	{ id: "psychamarche", name: "Demande de participation à une psychamarche" },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function ContactForm(props) {
	let [firstName, setFirstName] = useState("");
	let [lastName, setLastName] = useState("");
	let [email, setEmail] = useState("");
	let [phone, setPhone] = useState("");
	let [subject, setSubject] = useState("");
	let [message, setMessage] = useState("");

	let [selected, setSelected] = useState(objects[0]);

	let [psychamarches, setPsychamarches] = useState([]);
	let [services, setServices] = useState([]);

	let [sMarche, setsMarche] = useState(null);
	let [sService, setsService] = useState(null);

	useEffect(() => {
		if (selected.id == "psychamarche") {
			getCollection("events")
				.then((data) => {
					setPsychamarches(
						data.entries
							.filter((e) => e.published == true)
							.concat([
								{ _id: "question", text: "Autre question" },
							])
					);
				})
				.catch((err) => console.error(err));
		}

		if (selected.id == "rdv") {
			getCollection("service")
				.then((data) => {
					setServices(
						data.entries
							.filter((e) => e.publish == true)
							.concat([
								{ _id: "question", text: "Autre question" },
							])
					);
				})
				.catch((err) => console.error(err));
		}

		if (selected.id == "autre") {
			setsService(null);
			setsMarche(null);
		}
	}, [selected]);

	let sendMessage = (e) => {
        e.preventDefault();

		let dataForm = {
			prenom: firstName,
			nom: lastName,
			email: email,
			tel: phone,
			sujet: subject,
			message: message,
		};

		if (selected.id == "autre") {
			sendForm("contact", dataForm)
				.then(() => {
					resetForm();
					props.setMessageStatus("OK");
				})
				.catch((err) => {
					props.setMessageStatus("ERROR");
				});
		}

		if (selected.id == "rdv") {
			dataForm.service = sService
				? "text" in sService
					? sService.text
					: sService.titre + " (" + sService.type + ")"
				: "Aucun service sélectionné.";

			sendForm("RDV", dataForm)
				.then(() => {
					resetForm();
					props.setMessageStatus("OK");
				})
				.catch((err) => {
					props.setMessageStatus("ERROR");
				});
		}

		if (selected.id == "psychamarche") {
			dataForm.evenement = sMarche
				? "text" in sMarche
					? sMarche.text
					: sMarche.titre +
					  " (" +
					  sMarche.lieu.address.split(", ").slice(0, -2).join(", ") +
					  ") - " +
					  new Date(sMarche.date).toLocaleDateString(
							"fr-FR",
							dateOptions
					  ) +
					  " " +
					  sMarche.heure
				: "Aucune séance sélectionnée.";

			sendForm("Psychamarche", dataForm)
				.then(() => {
					resetForm();
					props.setMessageStatus("OK");
				})
				.catch((err) => {
					props.setMessageStatus("ERROR");
				});
		}
	};

	let resetForm = () => {
        document.getElementById("contact-form").reset();
		setFirstName("");
		setLastName("");
		setEmail("");
		setPhone("");
		setSubject("");
		setMessage("");
		setSelected(objects[0]);
		setsMarche(null);
		setsService(null);
	};

	return (
		<form
            id="contact-form"
			className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
			onSubmit={(e) => {
				sendMessage(e);
			}}
		>
			<div>
				<label
					htmlFor="first-name"
					className="block text-sm font-medium text-warm-gray-900"
				>
					Prénom
				</label>
				<div className="mt-1">
					<input
						type="text"
						name="first-name"
						id="first-name"
                        required="required"
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
						autoComplete="given-name"
						className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-green-500 focus:border-green-500 border-warm-gray-300 rounded-md"
					/>
				</div>
			</div>
			<div>
				<label
					htmlFor="last-name"
					className="block text-sm font-medium text-warm-gray-900"
				>
					Nom de famille
				</label>
				<div className="mt-1">
					<input
						type="text"
						name="last-name"
						id="last-name"
                        required="required"
						onChange={(e) => {
							setLastName(e.target.value);
						}}
						autoComplete="family-name"
						className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-green-500 focus:border-green-500 border-warm-gray-300 rounded-md"
					/>
				</div>
			</div>
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-warm-gray-900"
				>
					Email
				</label>
				<div className="mt-1">
					<input
						id="email"
						name="email"
						type="email"
                        required="required"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						autoComplete="email"
						className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-green-500 focus:border-green-500 border-warm-gray-300 rounded-md"
					/>
				</div>
			</div>
			<div>
				<div className="flex justify-between">
					<label
						htmlFor="phone"
						className="block text-sm font-medium text-warm-gray-900"
					>
						Téléphone
					</label>
					<span
						id="phone-optional"
						className="text-sm text-warm-gray-500"
					>
						Optionnel
					</span>
				</div>
				<div className="mt-1">
					<input
						type="text"
						name="phone"
						id="phone"
						autoComplete="tel"
						onChange={(e) => {
							setPhone(e.target.value);
						}}
						className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-green-500 focus:border-green-500 border-warm-gray-300 rounded-md"
						aria-describedby="phone-optional"
					/>
				</div>
			</div>
			<div className="sm:col-span-2">
				<Listbox value={selected} onChange={setSelected}>
					<Listbox.Label className="block text-sm font-medium text-gray-700">
						Objet du message
					</Listbox.Label>
					<div className="mt-1 relative">
						<Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm">
							<span className="block truncate">
								{selected.name}
							</span>
							<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
								<SelectorIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>

						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
								{objects.map((object) => (
									<Listbox.Option
										key={object.id}
										className={({ active }) =>
											classNames(
												active
													? "text-white bg-green-600"
													: "text-gray-900",
												"cursor-default select-none relative py-2 pl-3 pr-9"
											)
										}
										value={object}
									>
										{({ selected, active }) => (
											<>
												<span
													className={classNames(
														selected
															? "font-semibold"
															: "font-normal",
														"block truncate"
													)}
												>
													{object.name}
												</span>

												{selected ? (
													<span
														className={classNames(
															active
																? "text-white"
																: "text-green-600",
															"absolute inset-y-0 right-0 flex items-center pr-4"
														)}
													>
														<CheckIcon
															className="h-5 w-5"
															aria-hidden="true"
														/>
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</Listbox>
			</div>
			{selected.id == "psychamarche" && psychamarches && (
				<div className="sm:col-span-2">
					<Listbox value={sMarche} onChange={setsMarche}>
						<Listbox.Label className="block text-sm font-medium text-gray-700">
							Séance de psychamarche ou autre
						</Listbox.Label>
						<div className="mt-1 relative">
							<Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm">
								<span className="block truncate">
									{sMarche
										? "text" in sMarche
											? sMarche.text
											: sMarche.titre +
											  " (" +
											  sMarche.lieu.address
													.split(", ")
													.slice(0, -2)
													.join(", ") +
											  ") - " +
											  new Date(
													sMarche.date
											  ).toLocaleDateString(
													"fr-FR",
													dateOptions
											  ) +
											  " " +
											  sMarche.heure
										: "Veuillez sélectionner une séance ou autre."}
								</span>
								<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
									<SelectorIcon
										className="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</span>
							</Listbox.Button>

							<Transition
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
									{psychamarches.map((event) => (
										<Listbox.Option
											key={event._id}
											className={({ active }) =>
												classNames(
													active
														? "text-white bg-green-600"
														: "text-gray-900",
													"cursor-default select-none relative py-2 pl-3 pr-9"
												)
											}
											value={event}
										>
											{({ sMarche, active }) => (
												<>
													<span
														className={classNames(
															sMarche
																? "font-semibold"
																: "font-normal",
															"block truncate"
														)}
													>
														{"text" in event
															? event.text
															: event.titre +
															  " (" +
															  event.lieu.address
																	.split(", ")
																	.slice(
																		0,
																		-2
																	)
																	.join(
																		", "
																	) +
															  ") - " +
															  new Date(
																	event.date
															  ).toLocaleDateString(
																	"fr-FR",
																	dateOptions
															  ) +
															  " " +
															  event.heure}
													</span>

													{sMarche ? (
														<span
															className={classNames(
																active
																	? "text-white"
																	: "text-green-600",
																"absolute inset-y-0 right-0 flex items-center pr-4"
															)}
														>
															<CheckIcon
																className="h-5 w-5"
																aria-hidden="true"
															/>
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</Listbox>
				</div>
			)}
			{selected.id == "rdv" && services && (
				<div className="sm:col-span-2">
					<Listbox value={sService} onChange={setsService}>
						<Listbox.Label className="block text-sm font-medium text-gray-700">
							Service demandé
						</Listbox.Label>
						<div className="mt-1 relative">
							<Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm">
								<span className="block truncate">
									{sService
										? "text" in sService
											? sService.text
											: sService.titre +
											  " (" +
											  sService.type +
											  ")"
										: "Veuillez sélectionner un service ou autre."}
								</span>
								<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
									<SelectorIcon
										className="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</span>
							</Listbox.Button>

							<Transition
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
									{services.map((service) => (
										<Listbox.Option
											key={service._id}
											className={({ active }) =>
												classNames(
													active
														? "text-white bg-green-600"
														: "text-gray-900",
													"cursor-default select-none relative py-2 pl-3 pr-9"
												)
											}
											value={service}
										>
											{({ sService, active }) => (
												<>
													<span
														className={classNames(
															sService
																? "font-semibold"
																: "font-normal",
															"block truncate"
														)}
													>
														{"text" in service
															? service.text
															: service.titre +
															  " (" +
															  service.type +
															  ")"}
													</span>

													{sService ? (
														<span
															className={classNames(
																active
																	? "text-white"
																	: "text-green-600",
																"absolute inset-y-0 right-0 flex items-center pr-4"
															)}
														>
															<CheckIcon
																className="h-5 w-5"
																aria-hidden="true"
															/>
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</Listbox>
				</div>
			)}
			<div className="sm:col-span-2">
				<label
					htmlFor="subject"
					className="block text-sm font-medium text-warm-gray-900"
				>
					Sujet
				</label>
				<div className="mt-1">
					<input
						type="text"
						name="subject"
						id="subject"
                        required="required"
						onChange={(e) => {
							setSubject(e.target.value);
						}}
						className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-green-500 focus:border-green-500 border-warm-gray-300 rounded-md"
					/>
				</div>
			</div>
			<div className="sm:col-span-2">
				<div className="flex justify-between">
					<label
						htmlFor="message"
						className="block text-sm font-medium text-warm-gray-900"
					>
						Message
					</label>
					<span
						id="message-max"
						className="text-sm text-warm-gray-500"
					>
						Max. 500 caractères
					</span>
				</div>
				<div className="mt-1">
					<textarea
						id="message"
						name="message"
						rows={4}
                        required="required"
						onChange={(e) => {
							setMessage(e.target.value);
						}}
						className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-green-500 focus:border-green-500 border border-warm-gray-300 rounded-md"
						aria-describedby="message-max"
						defaultValue={""}
					/>
				</div>
			</div>
			<div className="sm:col-span-2 sm:flex sm:justify-end">
				<button
					type="submit"
					className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto"
				>
					Envoyer
				</button>
			</div>
		</form>
	);
}
