import React from "react";

import { Link } from "react-router-dom";

import { BookOpenIcon, CalendarIcon, MapIcon } from "@heroicons/react/outline";

import Intro from "../sections/home/Intro";

export default function Home(props) {
	return (
		<div>
			<div className="relative bg-green-900">
				<div className="absolute inset-0">
					<img
						className="w-full h-full object-cover"
						src="https://source.unsplash.com/random/2500x1200/?nature+forest+psy+day+calm+talk+morning+walk+day&auto=format&fit=crop&w=1920&q=60"
						alt=""
					/>
					<div
						className="absolute inset-0 bg-white-900 mix-blend-multiply"
						aria-hidden="true"
					/>
				</div>
				<div className="relative max-w-6xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
				<div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16 bg-white bg-opacity-90 pt-8 pb-2 rounded-xl">
						<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
							<span className="block xl:inline">
                                <span className="text-green-700">Ré-Unir</span>
							    <span>,</span>
                            </span>{' '}
                            <span className="block xl:inline"></span>
							<span className="block xl:inline">
                                <span>un espace dédié à la</span>{' '}
                                <span className="text-green-600">parole</span>
							    <span>.</span>
                            </span>
						</h1>
						<p className="mt-6 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-10 md:max-w-3xl font-semibold">
							Audrey Bauerlé
						</p>
                        <p className="mt-2 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-2 md:max-w-3xl">Psychanalyste</p>
						<div className="mt-8 mb-6 sm:space-x-3 sm:block flex flex-col space-y-2">
							<Link
								to="/services"
								className="inline-flex items-center gap-x-2 rounded-md bg-green-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-md hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all-ease-in-out duration-300 text-center"
							>
								<BookOpenIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
								Services
							</Link>
							<Link
								to="/psychamarche"
								className="inline-flex items-center gap-x-2 rounded-md bg-green-50 py-2.5 px-3.5 text-sm font-semibold text-green-600 shadow-md hover:bg-green-100  transition-all-ease-in-out duration-300 text-center"
							>
								<MapIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
								Psychamarche
							</Link>
							<Link
								to="/evenements"
								className="inline-flex items-center gap-x-2 rounded-md bg-green-50 py-2.5 px-3.5 text-sm font-semibold text-green-600 shadow-md hover:bg-green-100  transition-all-ease-in-out duration-300 text-center"
							>
								<CalendarIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
								Événements
							</Link>
						</div>
					</div>
				</div>
			</div>

			<Intro loader={props.loader} />
		</div>
	);
}
