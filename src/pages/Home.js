import React from "react";

import { Link } from "react-router-dom";

import Intro from "../sections/home/Intro"

export default function Home(props) {
	return (
		<div>
			<main className="lg:relative">
				<div className="mx-auto max-w-7xl w-full pt-16 pb-25 text-center lg:py-48 lg:text-left">
					<div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
						<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
							<span className="block xl:inline">
                                <span className="text-blue-700">Ré-Unir</span>
							    <span>,</span>
                            </span>{' '}
                            <span className="block xl:inline"></span>
							<span className="block xl:inline">
                                <span>un espace de</span>{' '}
                                <span className="text-blue-600">parole</span>
							    <span>.</span>
                            </span>
						</h1>
						<p className="mt-6 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-10 md:max-w-3xl font-semibold">
							Audrey Bauerlé
						</p>
                        <p className="mt-2 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-2 md:max-w-3xl">Psychanalyste (Membre FEDEPSY)</p>
						<div className="mt-10 mb-6 sm:flex sm:justify-center lg:justify-start">
							<div className="rounded-md shadow">
								<Link
									to="/services"
									className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
								>
									Services
								</Link>
							</div>
							<div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
								<Link
									to="/psychamarche"
									className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
								>
									Psychamarche
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
					<img
						className="absolute inset-0 w-full h-full object-cover"
						src="https://source.unsplash.com/random/?nature+psy+day+calm+talk+morning+walk+day&auto=format&fit=crop&w=2102&q=80"
						alt=""
					/>
				</div>
			</main>

            <Intro/>
		</div>
	);
}
