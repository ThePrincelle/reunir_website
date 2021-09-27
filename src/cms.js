import axios from 'axios'

const BASE_URL = 'https://cms.re-unir.fr'
const FORM_API_KEY = '314581d2946763fc110c31e14328ad'

export function getSingleton(name) {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/api/singletons/get/${name}`)
            .then(function ({data}) {
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
        axios.get(`${BASE_URL}/api/collections/get/${name}`)
            .then(function ({data}) {
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
        axios.post(`${BASE_URL}/api/forms/submit/${name}?token=${FORM_API_KEY}`, {form: data})
            .then(function ({entry}) {
                console.log(entry);
                resolve(entry);
            })
            .catch(function (error) {
                console.error(error);
                reject(error);
            });
    });
}
