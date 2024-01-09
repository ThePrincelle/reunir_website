import React, { useState, useEffect } from "react";

import {
	MailIcon,
	LocationMarkerIcon,
	PhoneIcon,
} from "@heroicons/react/outline";

import { Link } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { getSingleton, getCollection } from "../cms";

import ContactForm from "../components/ContactForm";
import MessageStatus from "../components/MessageStatus";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
	iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
	iconUrl: require("leaflet/dist/images/marker-icon.png").default,
	shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
});


export default function Contact(props) {
	let [urlInstagram, setInstagramUrl] = useState("");
	let [urlFacebook, setFacebookUrl] = useState("");
	let [urlLinkedin, setLinkedinUrl] = useState("");
	let [email, setEmail] = useState("");
	let [phone, setPhone] = useState("");
	let [cabinets, setCabinets] = useState([]);

	let [messageStatus, setMessageStatus] = useState(null);

	useEffect(() => {
		window.scrollTo(0, 0);
		props.loader(true);
		getSingleton("contact")
			.then((data) => {
				setInstagramUrl(data.instagram);
				setFacebookUrl(data.facebook);
				setLinkedinUrl(data.linkedin);
				setPhone(data.telephone);
				setEmail(data.email);
				props.loader(false);
			})
			.catch((err) => console.error(err));
		getCollection("cabinets")
			.then((data) => {
				setCabinets(data.entries.filter((cabinet) => cabinet.published));
			})
			.catch((err) => console.error(err));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let closeStatus = () => {
		setTimeout(() => {
			setMessageStatus(null);
		}, 250);
	};

	return (
		<div className="min-h-screen bg-white">
			<main className="overflow-hidden">
				{/* Header */}
				<div className="bg-warm-gray-50">
					<div className="py-24 lg:py-32">
						<div className="relative z-10 max-w-7xl mx-auto pl-4 pr-8 sm:px-6 lg:px-8">
							<h1 className="text-4xl font-extrabold tracking-tight text-warm-gray-900 sm:text-5xl lg:text-6xl">
								Contact
							</h1>
							<p className="mt-6 text-xl text-warm-gray-500 max-w-3xl">
								Via ce formulaire, vous pouvez prendre contact
								avec moi pour tout besoin de renseignements
								complémentaires.
							</p>
						</div>
					</div>
				</div>

				{/* Contact section */}
				<section
					className="relative bg-white"
					aria-labelledby="contact-heading"
				>
					<div
						className="absolute w-full h-1/2 bg-warm-gray-50"
						aria-hidden="true"
					/>
					{/* Decorative dot pattern */}
					<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<svg
							className="absolute z-0 top-0 right-0 transform -translate-y-16 translate-x-1/2 sm:translate-x-1/4 md:-translate-y-24 lg:-translate-y-72"
							width={404}
							height={384}
							fill="none"
							viewBox="0 0 404 384"
							aria-hidden="true"
						>
							<defs>
								<pattern
									id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
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
										className="text-warm-gray-200"
										fill="currentColor"
									/>
								</pattern>
							</defs>
							<rect
								width={404}
								height={384}
								fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
							/>
						</svg>
					</div>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="relative bg-white shadow-xl">
							<h2 id="contact-heading" className="sr-only">
								Me contacter
							</h2>

							<div className="grid grid-cols-1 lg:grid-cols-3">
								{/* Contact information */}
								<div className="relative overflow-hidden py-10 px-5 bg-gradient-to-b from-coolgray-500 to-coolgray-600 sm:px-10 xl:p-12">
									{/* Decorative angle backgrounds */}
									<div
										className="absolute inset-0 pointer-events-none sm:hidden"
										aria-hidden="true"
									>
										<svg
											className="absolute inset-0 w-full h-full"
											width={343}
											height={388}
											viewBox="0 0 343 388"
											fill="none"
											preserveAspectRatio="xMidYMid slice"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
												fill="url(#linear1)"
												fillOpacity=".1"
											/>
											<defs>
												<linearGradient
													id="linear1"
													x1="254.553"
													y1="107.554"
													x2="961.66"
													y2="814.66"
													gradientUnits="userSpaceOnUse"
												>
													<stop stopColor="#fff" />
													<stop
														offset={1}
														stopColor="#fff"
														stopOpacity={0}
													/>
												</linearGradient>
											</defs>
										</svg>
									</div>
									<div
										className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none sm:block lg:hidden"
										aria-hidden="true"
									>
										<svg
											className="absolute inset-0 w-full h-full"
											width={359}
											height={339}
											viewBox="0 0 359 339"
											fill="none"
											preserveAspectRatio="xMidYMid slice"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
												fill="url(#linear2)"
												fillOpacity=".1"
											/>
											<defs>
												<linearGradient
													id="linear2"
													x1="192.553"
													y1="28.553"
													x2="899.66"
													y2="735.66"
													gradientUnits="userSpaceOnUse"
												>
													<stop stopColor="#fff" />
													<stop
														offset={1}
														stopColor="#fff"
														stopOpacity={0}
													/>
												</linearGradient>
											</defs>
										</svg>
									</div>
									<div
										className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none lg:block"
										aria-hidden="true"
									>
										<svg
											className="absolute inset-0 w-full h-full"
											width={160}
											height={678}
											viewBox="0 0 160 678"
											fill="none"
											preserveAspectRatio="xMidYMid slice"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
												fill="url(#linear3)"
												fillOpacity=".1"
											/>
											<defs>
												<linearGradient
													id="linear3"
													x1="192.553"
													y1="325.553"
													x2="899.66"
													y2="1032.66"
													gradientUnits="userSpaceOnUse"
												>
													<stop stopColor="#fff" />
													<stop
														offset={1}
														stopColor="#fff"
														stopOpacity={0}
													/>
												</linearGradient>
											</defs>
										</svg>
									</div>
									<h3 className="text-lg font-medium text-white">
										Informations de contact
									</h3>
									<h4 className="text-md pt-2 text-white">
										(<abbr title="Entreprise Individuelle">EI</abbr>) Audrey Bauerlé
									</h4>
									<dl className="mt-8 space-y-6">
										<dt>
											<span className="sr-only">
												Téléphone
											</span>
										</dt>
										<dd className="flex text-base text-coolgray-50">
											<PhoneIcon
												className="flex-shrink-0 w-6 h-6 text-coolgray-200"
												aria-hidden="true"
											/>
											<span className="ml-3">
												<a
													href={`tel:${phone.replace(
														/\s/g,
														""
													)}`}
													target="_blank" rel="noreferrer"
													className="hover:text-gray-200 transition-colors"
												>
													{phone}
												</a>
											</span>
										</dd>
										<dt>
											<span className="sr-only">
												Email
											</span>
										</dt>
										<dd className="flex text-base text-coolgray-50">
											<MailIcon
												className="flex-shrink-0 w-6 h-6 text-coolgray-200"
												aria-hidden="true"
											/>
											<span className="ml-3">
												<a
													href={`mailto:${email}`}
													target="_blank" rel="noreferrer"
													className="hover:text-gray-200 transition-colors"
												>
													{email}
												</a>
											</span>
										</dd>
										
									</dl>
									<ul
										className="mt-8 flex space-x-12 items-center"
									>
										<li>
											<a
												className="text-coolgray-200 hover:text-coolgray-100 transition-colors"
												href={urlFacebook}
											>
												<span className="sr-only">
													Facebook
												</span>
												<svg
													className="w-7 h-7"
													aria-hidden="true"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														fillRule="evenodd"
														d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
														clipRule="evenodd"
													/>
												</svg>
											</a>
										</li>
										<li>
											<a
												className="text-coolgray-200 hover:text-coolgray-100 transition-colors"
												href={urlInstagram}
											>
												<span className="sr-only">
													Instagram
												</span>
												<svg
													fill="currentColor"
													viewBox="0 0 24 24"
													className="w-7 h-7"
													aria-hidden="true"
												>
													<path
														fillRule="evenodd"
														d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
														clipRule="evenodd"
													/>
												</svg>
											</a>
										</li>
										<li>
											<a
												className="text-coolgray-200 hover:text-coolgray-100 transition-colors"
												href={urlLinkedin}
											>
												<span className="sr-only">
													LinkedIn
												</span>
												<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"	className="h-6 w-6"	aria-hidden="true">
													<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
												</svg>
											</a>
										</li>
									</ul>
								</div>

								{/* Contact form */}
								<div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
									<h3 className="text-lg font-medium text-warm-gray-900">
										M'envoyer un message
									</h3>
									<div className="w-full text-xs text-gray-400 pt-1 flex flex-col">
										<span>Les données transmises via ce formulaire sont transmises via un canal sécurisé, ne sont transmises à aucun tiers et ne seront utilisées qu’à des fins de réponses.</span>
										<span>Pour en savoir plus sur la gestion des données sur ce site, consultez la page : <Link to="/legal" className="text-yellow-500 hover:text-yellow-600 hover:underline">Mentions Légales</Link>.</span>
									</div>
									<ContactForm
										setMessageStatus={setMessageStatus}
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Contact grid */}
				<section aria-labelledby="offices-heading">
					<div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
						<h2
							id="offices-heading"
							className="text-3xl font-extrabold text-warm-gray-900"
						>
							Cabinets
						</h2>
						<p className="mt-6 text-lg text-warm-gray-500 max-w-3xl">
							Vous trouverez ici les emplacements et horaires d’ouverture de mes permanences en cabinets ainsi que les moyens d’accès à ces derniers.
						</p>

						{cabinets.map((cabinet, idx) => (<div key={idx}>

						<h3 className="mt-10 text-2xl font-bold text-warm-gray-900">
							{cabinet.name}
						</h3>

						{cabinet.description && <p className="mt-4 mb-6 text-md text-warm-gray-500 max-w-3xl">
							{cabinet.description}
						</p>}

						<div className="mt-5 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:auto-cols-max">
							<ul
								className="divide-y divide-gray-200"
							>
								{cabinet.horaires.map((horaire, idx) => (
									<li
										key={idx}
										className="py-4 flex text-base hover:bg-gray-50 transition-colors"
									>
										<p className="font-medium text-gray-900 pl-4">
											{horaire.value.jour}
										</p>
										<p className="text-gray-500 ml-auto pr-4">
											{horaire.value.horaires}
										</p>
									</li>
								))}
							</ul>
								<div>
									<MapContainer
										style={{ height: "20rem" }}
										center={[cabinet.location.lat, cabinet.location.lng]}
										zoom={18}
										scrollWheelZoom={"center"}
										dragging={false}
										zoomControl={true}
										boxZoom={false}
										doubleClickZoom={false}
									>
										<TileLayer
											attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
											url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
										/>
										<Marker
											position={[
												cabinet.location.lat,
												cabinet.location.lng,
											]}
										>
											<Popup>
												<a
													href={`https://maps.google.com/?q=${cabinet.location.lat},${cabinet.location.lng}`}
													target="_blank" rel="noreferrer"
												>
													Google Maps
												</a>
											</Popup>
										</Marker>
									</MapContainer>
									<figcaption className="mt-3 flex text-sm text-gray-500">
										<LocationMarkerIcon
											className="flex-none w-5 h-5 text-gray-400"
											aria-hidden="true"
										/>
										<span className="ml-2">
											<a
												href={`https://maps.google.com/?q=${cabinet.location.lat},${cabinet.location.lng}`}
												target="_blank" rel="noreferrer"
												className="hover:text-gray-800 transition-colors"
											>
												{cabinet.address}
											</a>
											<br />
											{cabinet.address_details}
										</span>
									</figcaption>
								</div>
						</div>

						</div>))}
					</div>
				</section>
			</main>
			{messageStatus && (
				<MessageStatus
					status={messageStatus}
					closeStatus={closeStatus}
				/>
			)}
		</div>
	);
}
