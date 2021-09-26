import axios from 'axios'

const BASE_URL = 'https://cms.re-unir.fr'

export function getSingleton(name) {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/api/singletons/get/${name}`)
            .then(function ({data}) {
                resolve(data);
            })
            .catch(function (error) {
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
                reject(error);
            });
    });
}