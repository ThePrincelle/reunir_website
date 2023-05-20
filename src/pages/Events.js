import React, { useState, useEffect } from "react";

import DOMPurify from "dompurify";

import { Link } from "react-router-dom";

import { getCollection, downloadAsset } from "../cms";

import ImageModal from "../components/ImageModal";

import {
  BookOpenIcon,
  ChevronRightIcon,
  ChatIcon,
  MapIcon,
  CalendarIcon,
  ZoomInIcon,
  LocationMarkerIcon,
  DocumentDownloadIcon,
} from "@heroicons/react/outline";

import { DownloadIcon, HashtagIcon, StarIcon } from "@heroicons/react/solid";

import { handleEvents } from "../utils/transform";

export default function Events(props) {
  let [events, setEvents] = useState([]);
  let [imageModal, setImageModal] = useState(false);

  let [wantedImageAlt, setWantedImageAlt] = useState("");
  let [wantedImagePath, setWantedImagePath] = useState("");

  let links = [
    {
      name: "Services",
      href: "/services",
      description: "Consultez l'ensemble des services que propose Ré-Unir",
      icon: BookOpenIcon,
    },
    {
      name: "Psychamarche",
      href: "/psychamarche",
      description: "Découvrez la Psychamarche, une activité innovante !",
      icon: MapIcon,
    },
    {
      name: "Contact",
      href: "/contact",
      description: "Contactez-moi pour toute demande d'information",
      icon: ChatIcon,
    },
  ];

  let closeImageModal = () => {
    setTimeout(() => {
      setImageModal(false);
    }, 250);
  };

  let openImageModal = (alt, path) => {
    setWantedImageAlt(alt);
    setWantedImagePath(path);
    setImageModal(true);
  };

  let downloadForm = (event) => {
    downloadAsset(event.form);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    props.loader(true);
    getCollection("Evenements")
      .then((data) => {
        let entries = handleEvents(data.entries, true);

        // Filter out events that are not published
        entries = entries.filter((entry) => entry.published === true);

        // Set pinned events first
        entries.sort((a, b) => {
          if (a.pinned === true && b.pinned === false) return -1;
          if (a.pinned === false && b.pinned === true) return 1;
          return 0;
        });

        setEvents(entries);

        props.loader(false);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {events.length > 0 && (
        <div className="bg-white py-12 md:py-24 lg:py-30">
          <div className="mx-auto max-w-7xl gap-y-20 gap-x-8 px-6 lg:px-8">
            <div className="mx-auto max-w-7xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Évènements
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 prose prose-yellow">
                Ré-Unir organise régulièrement des évènements divers et variés.
                <br />
                Vous pouvez retrouver ici la liste de tous les évènements à
                venir.
                <br />
                <br />
                Pour découvrir plus d'évènements, consultez : <br />
                <a
                  href="https://www.facebook.com/re.unirpro67/events"
                  alt="Page Évènements sur Facebook"
                >
                  la page "Évènements" sur le mur Facebook de Ré-Unir
                </a>
                .
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 border-b border-gray-900/ space-y-5">
            {events.map((event) => (
              <div
                key={event._id}
                className={
                  "overflow-hidden bg-gray-50 lg:rounded-lg group transition-all border-t-2 border-b-2 lg:border-2" +
                  (event.pinned
                    ? " border-yellow-500 shadow-md"
                    : " border-gray-600 shadow-md")
                }
              >
                <div className="px-4 py-5 sm:p-6 flex flex-wrap justify-between items-center">
                  <div className="self-start">
                    <div className="border-l-2 pl-2">
                      <div
                        className={
                          "flex items-center justify-start content-center" +
                          (event.pinned ? " mb-1" : "")
                        }
                      >
                        <StarIcon
                          className={
                            "inline-block w-7 h-7 text-yellow-500 mr-1" +
                            (event.pinned ? "" : " hidden")
                          }
                        />
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {event.title}
                        </h3>
                      </div>
                      {event.special && (
                        <span
                          className={
                            "flex items-center mt-1" +
                            (event.pinned ? " ml-1" : "")
                          }
                        >
                          <CalendarIcon
                            className="inline-block w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-1 text-sm text-gray-500">
                            {event.seances[0].humanReadableDate} à{" "}
                            {event.seances[0].prettyTime} (
                            {event.seances[0].humanReadableTime})
                          </span>
                        </span>
                      )}
                      <span
                        className={
                          "flex items-center mt-1" +
                          (event.pinned ? " ml-1" : "") +
                          (event.localisation_text ? "" : " hidden")
                        }
                      >
                        <LocationMarkerIcon
                          className="inline-block w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-1 text-sm text-gray-500">
                          {event.localisation_text}
                        </span>
                      </span>
                      <div className="space-x-1 mt-1.5">
                        {event.tags &&
                          event.tags.length > 0 &&
                          event.tags.map((tag, idx) => {
                            return (
                              <span
                                key={idx}
                                className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800"
                              >
                                <HashtagIcon
                                  className="-ml-1 mr-1 h-4 w-4 text-green-600"
                                  aria-hidden="true"
                                />
                                {tag}
                              </span>
                            );
                          })}
                      </div>
                    </div>
                    <div
                      className="prose prose-yellow mt-4 text-sm"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(event.description),
                      }}
                    />
                  </div>
                  <div className="mx-auto align-center mt-4 lg:mx-0 lg:mt-0">
                    {event.image && "path" in event.image && (
                      <div className="relative">
                        <img
                          className="w-full rounded-lg shadow-md"
                          src={
                            "https://cms.re-unir.fr/api/cockpit/image?token=fbf36043e1aef774506461b27f1cd1&m=bestFit&w=250&h=550&f[brighten]=10&o=true&src=" +
                            event.image.path
                          }
                          alt={event.alt_image}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            openImageModal(event.alt_image, event.image.path);
                          }}
                          className="absolute bottom-0 right-0 rounded-full bg-green-600 p-2 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-2 mr-2 transition-all duration-300 ease-in-out"
                        >
                          <ZoomInIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    )}
                    {event.form && (
                      <button
                        type="button"
                        onClick={(e) => downloadForm(event)}
                        className={
                          "inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 w-full justify-center" +
                          (event.image && "path" in event.image ? " mt-4" : "")
                        }
                      >
                        <DocumentDownloadIcon
                          className="-ml-1 mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Télécharger le formulaire d'inscription
                      </button>
                    )}
                  </div>
                </div>
                {event.other_docs_description &&
                  event.other_docs &&
                  event.other_docs.length > 0 && (
                    <div>
                      <div className="relative mx-4 sm:mx-6 mb-3">
                        <div
                          className="absolute inset-0 flex items-center"
                          aria-hidden="true"
                        >
                          <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-start">
                          <span className="bg-gray-50 pr-3 text-base font-semibold leading-6 text-gray-900">
                            {event.other_docs_description}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mx-4 sm:mx-6 mb-5">
                        {event.other_docs.map((doc, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => downloadAsset(doc.value.file)}
                            className="relative flex items-center space-x-3 rounded-lg border border-blue-300 bg-blue-50 hover:bg-white transition-all px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:border-blue-400"
                          >
                            <div className="min-w-0 flex-1">
                              <span
                                className="absolute inset-0"
                                aria-hidden="true"
                              />
                              <p className="text-sm font-medium text-gray-900">
                                {doc.value.description}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <DownloadIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                {!event.special && (
                  <div className="relative mx-4 sm:mx-6 mb-3">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-start">
                      <span className="bg-gray-50 pr-3 text-base font-semibold leading-6 text-gray-900">
                        {event.seances.length > 1
                          ? "Prochaines séances"
                          : "Prochaine séance"}
                      </span>
                    </div>
                  </div>
                )}
                {!event.special && (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 mx-4 sm:mx-6 mb-5">
                    {event.seances.map((seance) => (
                      <div
                        key={seance.id}
                        className="relative flex items-center sm:space-x-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-200 transition-colors px-4 py-4 sm:px-6 sm:py-5 shadow-sm focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:border-gray-400"
                      >
                        <div className="flex-shrink-0">
                          <span className="bg-green-600 h-8 w-8 rounded-full items-center justify-center ring-1 ring-white hidden sm:flex">
                            <CalendarIcon
                              className="h-5 w-5 text-white"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          <p className="text-sm font-medium text-gray-900">
                            {seance.humanReadableDate}{" "}
                            <br className="sm:hidden" />à {seance.prettyTime}
                          </p>
                          <p className="truncate text-sm text-gray-500">
                            {seance.humanReadableTime}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {events.length === 0 && (
        <main className="mx-auto w-full max-w-7xl px-6 pt-10 pb-16 sm:pb-24 lg:px-8">
          <div className="mx-auto mt-20 max-w-2xl text-center sm:mt-24">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Aucun évènement pour le moment...
            </h1>
            <p className="mt-4 text-base leading-7 prose prose-yellow text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
              Tentez de revenir plus tard ou consultez
              <br />
              <a
                href="https://www.facebook.com/re.unirpro67/events"
                alt="Page Évènements sur Facebook"
              >
                la page "Évènements" sur le mur Facebook de Ré-Unir
              </a>
              .
            </p>
          </div>
          <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
            <h2 className="sr-only">Consultez d'autres pages du site</h2>
            <ul className="-mt-6 divide-y divide-gray-900/5 border-b border-gray-900/5">
              {links.map((link, linkIdx) => (
                <li
                  key={linkIdx}
                  className="relative flex gap-x-6 py-6 group transition-all"
                >
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-sm group-hover:shadow-lg ring-1 ring-green-600 group-hover:ring-green-700 transition-all">
                    <link.icon
                      className="h-6 w-6 group-hover:h-8 group-hover:w-8 text-green-600 group-hover:text-green-700 transition-all"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-auto">
                    <h3 className="text-sm font-semibold leading-6 text-gray-900 group-hover:text-black transition-all">
                      <Link to={link.href}>
                        <span className="absolute inset-0" aria-hidden="true" />
                        {link.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {link.description}
                    </p>
                  </div>
                  <div className="flex-none self-center">
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-400 group-hover:text-gray-700 transition-all"
                      aria-hidden="true"
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex justify-center">
              <Link
                to="/"
                className="text-sm font-semibold leading-6 text-green-600 hover:text-green-500"
              >
                <span aria-hidden="true" className="pr-3">
                  &larr;
                </span>
                Revenir à l'accueil
              </Link>
            </div>
          </div>
        </main>
      )}
      {imageModal && (
        <ImageModal
          closeImageModal={closeImageModal}
          wantedImagePath={wantedImagePath}
          wantedImageAlt={wantedImageAlt}
        />
      )}
    </div>
  );
}
