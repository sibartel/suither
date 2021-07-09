import { writable } from 'svelte/store';

const key = 'data_store'

let stored_data = {
    theme: 'system',
    self_assessed_sensation_deviation: 0.0,
    current_cloth_set: null,
    recommender_settings: {
        relevant_hours: 5,
        activity: 60,
        category: null,
        ignore_rain: true
    },
    reviews: []       
}

if (typeof localStorage !== 'undefined' && localStorage.getItem(key))
    stored_data = {
        ...stored_data,
        ...JSON.parse(localStorage.getItem(key))
    }

export const dataStore = writable(stored_data)

if (typeof localStorage !== 'undefined')
    dataStore.subscribe(data => localStorage.setItem(key, JSON.stringify(data)))
