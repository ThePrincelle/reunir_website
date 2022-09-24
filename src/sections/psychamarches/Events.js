import React, { useState, useEffect } from "react";

import DOMPurify from "dompurify";

import { Link } from "react-router-dom";

import { getCollection } from '../../cms' 

import Event from "../../components/Event";

export default function Events(props) {
    let [events, setEvents] = useState([]);

	useEffect(() => {
		getCollection("events")
			.then((data) => {
				// Filter event that are older than today
				let today = new Date();
				let events = data.entries.filter((event) => {
					let eventDate = new Date(event.date);
					return eventDate >= today || event.recurrence;
				});
				setEvents(events);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<div className="py-16 pt-0 mt-16 xl:py-36 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
			<div className="max-w-max lg:max-w-7xl mx-auto">
				<div className="relative z-10 mb-8 md:mb-2 md:px-6">
					<div className="text-base max-w-prose lg:max-w-none">
						<h2 className="leading-6 text-green-600 font-semibold tracking-wide uppercase" id="events">
							Évènements
						</h2>
						<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
							Planification des séances
						</p>
					</div>
				</div>
				<div className="relative">
					<svg
						className="hidden md:block absolute top-0 right-0 -mt-20 -mr-20"
						width={404}
						height={384}
						fill="none"
						viewBox="0 0 404 384"
						aria-hidden="true"
					>
						<defs>
							<pattern
								id="95e8f2de-6d30-4b7e-8159-f791729db21b"
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
							fill="url(#95e8f2de-6d30-4b7e-8159-f791729db21b)"
						/>
					</svg>
					<svg
						className="hidden md:block absolute bottom-0 left-0 -mb-20 -ml-20"
						width={404}
						height={384}
						fill="none"
						viewBox="0 0 404 384"
						aria-hidden="true"
					>
						<defs>
							<pattern
								id="7a00fe67-0343-4a3c-8e81-c145097a3ce0"
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
							fill="url(#7a00fe67-0343-4a3c-8e81-c145097a3ce0)"
						/>
					</svg>
					<div className="relative md:bg-white md:p-6">
						<div className="lg:grid lg:grid-cols-2 lg:gap-6">
							<div
								className="prose prose-yellow prose-lg text-gray-500 lg:max-w-none"
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(
										props.content.seances
									),
								}}
							></div>
							{/* <div className="mt-6 text-gray-500 lg:mt-0">
                                <div className="text-xl leading-8 font-bold tracking-tight text-gray-900 sm:text-2xl sm:pt-0 pt-4">Prochains évènements</div>
								{events.filter(item => item.published == true).length == 0 ? (
									<div className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center align-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
										<span className="m-auto block text-sm font-medium text-gray-900">
											Aucun évènement pour le moment
										</span>
									</div>
								) : (
									<div className="mt-8 max-w-lg mx-auto grid gap-3 lg:grid-cols-2 lg:max-w-none">
										{events.map(
											(event) =>
												event.published && (
													<Event key={event._id} event={event} />
												)
										)}
									</div>
								)}
							</div> */}
						</div>
						<div className="mt-20 inline-flex space-x-6">
							<Link
								to="/contact"
								className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
							>
								Contact
							</Link>
							<Link
								to="/services"
								className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
							>
								Voir les autres services
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
