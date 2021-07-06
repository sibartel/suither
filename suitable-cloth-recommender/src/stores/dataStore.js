import { writable } from 'svelte/store';

export const dataStore = writable(
    {
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
) 
