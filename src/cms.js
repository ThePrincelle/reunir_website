import axios from "axios";

const BASE_URL = "https://cms.re-unir.fr";
const FORM_API_KEY = "314581d2946763fc110c31e14328ad";
// const ASSETS_API_KEY = "fbf36043e1aef774506461b27f1cd1";

export function getSingleton(name) {
	return new Promise((resolve, reject) => {
		axios
			.get(`${BASE_URL}/api/singletons/get/${name}`)
			.then(function ({ data }) {
				resolve(data);
			})
			.catch(function (error) {
				console.error(error);
				reject(error);
			});
	});
}

export function getCollection(name) {
	return new Promise((resolve, reject) => {
		axios
			.get(`${BASE_URL}/api/collections/get/${name}`)
			.then(function ({ data }) {
				resolve(data);
			})
			.catch(function (error) {
				console.error(error);
				reject(error);
			});
	});
}

export function sendForm(name, data) {
	return new Promise((resolve, reject) => {
		axios
			.post(
				`${BASE_URL}/api/forms/submit/${name}?token=${FORM_API_KEY}`,
				{ form: data }
			)
			.then(function ({ entry }) {
				console.log(entry);
				resolve(entry);
			})
			.catch(function (error) {
				console.error(error);
				reject(error);
			});
	});
}

export function downloadAsset(entry) {
	// entry contains path and filename, download the file

	// If entry is a string, it's the path (with "/storage/uploads" prefix)
	if (typeof entry === "string") {
		// Open new tab with the file
		window.open(`${BASE_URL}${entry.path}`, "_blank");
	}

	let url = `${BASE_URL}/storage/uploads${entry.path}`;

	// Download file with axios
	axios({
		url: url,
		method: "GET",
		responseType: "blob" // important
	}).then((response) => {
		if (window.navigator && window.navigator.msSaveOrOpenBlob) {
			// IE variant
			window.navigator.msSaveOrOpenBlob(
				new Blob([response.data], {
					type: entry.mime,
				}),
				entry.title
			);
		} else {
			const url = window.URL.createObjectURL(
				new Blob([response.data], {
					type: entry.mime,
				})
			);
			const link = document.createElement("a");
			link.href = url;
            link.target = "_blank";
			link.setAttribute(
				"download",
				entry.title
			);
			document.body.appendChild(link);
			link.click();
		}
	});
}
