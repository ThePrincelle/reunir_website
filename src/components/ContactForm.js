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

	useEffect(() => {
		console.log(sService);
	}, [sService]);

	useEffect(() => {
		console.log(sMarche);
	}, [sMarche]);

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
					  (sMarche.recurrence
							? (sMarche.recurrence + " à")
							: new Date(sMarche.date).toLocaleDateString(
									"fr-FR",
									dateOptions
							  )) +
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
			type="POST"
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
				<label
					htmlFor="object"
					className="block text-sm font-medium text-gray-700"
				>
					Objet du message
				</label>
				<select
					id="object"
					name="object"
					onChange={(e) =>
						setSelected(
							objects.filter((o) => o.id === e.target.value)[0]
						)
					}
					className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
					defaultValue={selected}
				>
					{objects.map((object) => (
						<option key={object.id} value={object.id}>
							{object.name}
						</option>
					))}
				</select>
			</div>
			{selected.id == "psychamarche" && psychamarches && (
				<div className="sm:col-span-2">
					<label
						htmlFor="seance"
						className="block text-sm font-medium text-gray-700"
					>
						Séance de psychamarche
					</label>
					<select
						id="seance"
						name="seance"
						onChange={(e) => {
							setsMarche(
								psychamarches.filter(
									(o) => o._id === e.target.value
								)[0]
							);
						}}
						className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
					>
						<option hidden disabled selected value>
							{" "}
							-- Sélectionner un évènement ou autre --{" "}
						</option>
						{psychamarches.map((event) => (
							<option key={event._id} value={event._id}>
								{"text" in event
									? event.text
									: event.titre +
									  " (" +
									  event.lieu.address
											.split(", ")
											.slice(0, -2)
											.join(", ") +
									  ") - " +
									  (event.recurrence
											? (event.recurrence + " à")
											: new Date(
													event.date
											  ).toLocaleDateString(
													"fr-FR",
													dateOptions
											  )) +
									  " " +
									  event.heure}
							</option>
						))}
					</select>
				</div>
			)}
			{selected.id == "rdv" && services && (
				<div className="sm:col-span-2">
					<label
						htmlFor="service"
						className="block text-sm font-medium text-gray-700"
					>
						Service demandé
					</label>
					<select
						id="service"
						name="service"
						onChange={(e) => {
							setsService(
								services.filter(
									(o) => o._id === e.target.value
								)[0]
							);
						}}
						className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
					>
						<option hidden disabled selected value>
							{" "}
							-- Sélectionner un service ou autre --{" "}
						</option>
						{services.map((service) => (
							<option key={service._id} value={service._id}>
								{"text" in service
									? service.text
									: service.titre + " (" + service.type + ")"}
							</option>
						))}
					</select>
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
					className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-coolgray-500 hover:bg-coolgray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto"
				>
					Envoyer
				</button>
			</div>
		</form>
	);
}
