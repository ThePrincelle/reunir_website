import React from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { CalendarIcon, ClockIcon } from "@heroicons/react/solid";

import DOMPurify from "dompurify";

import { Link } from "react-router-dom";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
	iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
	iconUrl: require("leaflet/dist/images/marker-icon.png").default,
	shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
});

const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };

export default function Event(props) {
	return (
		<div
			key={props.event._id}
			className="flex flex-col rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg"
		>
			<div className="flex-shrink-0 object-cover max-h-18 h-18">
				<MapContainer
					center={[props.event.lieu.lat, props.event.lieu.lng]}
					zoom={16}
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
						position={[props.event.lieu.lat, props.event.lieu.lng]}
					>
						<Popup>
							<a
								href={`https://maps.google.com/?q=${props.event.lieu.lat},${props.event.lieu.lng}`}
								target="_blank"
							>
								Google Maps
							</a>
						</Popup>
					</Marker>
				</MapContainer>
			</div>
			<div className="flex-1 bg-white p-6 flex flex-col justify-between">
				<div className="flex-1 pb-5">
					<p className="text-xl font-semibold text-gray-900">
						{props.event.titre}
					</p>
					<a
						href={`https://maps.google.com/?q=${props.event.lieu.lat},${props.event.lieu.lng}`}
						className="text-sm font-medium text-justify pt-2 leading-3 text-green-600"
					>
						{props.event.lieu.address
							.split(", ")
							.slice(0, -2)
							.join(", ")}
					</a>
					<div
						className="mt-3 text-base text-gray-500 space-y-2"
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(props.event.description),
						}}
					></div>
				</div>
				{props.event.details && (
					<div>
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
						<div className="pt-1">
							<div className="pt-1 italic text-gray-500 text-sm">
								{props.event.details}
							</div>
						</div>
					</div>
				)}
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
				<div className="mt-3 flex items-center align-middle">
					<div className="flex-shrink-0">
						<span className="sr-only">
							{new Date(props.event.date).toLocaleDateString(
								"fr-FR",
								dateOptions
							)}
						</span>
					</div>
					<div className="space-y-2">
						<div className="flex flex-row align-middle items-center space-x-3">
							<CalendarIcon className="w-6 h-7" />
							<div>
								<p className="text-sm font-medium text-gray-900">
									{new Date(
										props.event.date
									).toLocaleDateString("fr-FR", dateOptions)}
								</p>
								<div className="flex space-x-1 text-sm text-gray-500">
									<span>{props.event.heure}</span>
								</div>
							</div>
						</div>
						<div className="flex flex-row align-middle items-center space-x-3">
							<ClockIcon className="w-6 h-7" />
							<div className="flex space-x-1 text-sm text-gray-500">
								<span> {props.event.duree}</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-row mt-4 align-center justify-between">
					<Link to="/contact">
						<button
							type="button"
							className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
						>
							Contact
						</button>
					</Link>
					<a
						href={`https://maps.google.com/?q=${props.event.lieu.lat},${props.event.lieu.lng}`}
						target="_blank"
						type="button"
						class="inline-flex ml-0 items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 space-x-1"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						<span className="text-sm font-medium pr-1">
							Google Maps
						</span>
					</a>
				</div>
			</div>
		</div>
	);
}
