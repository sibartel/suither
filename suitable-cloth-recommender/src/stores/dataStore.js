import { writable } from 'svelte/store';

export const dataStore = writable(
    {
        name: 'example',
        heat_self_assesment: 0.0,
        outfit_today: 'no clothes', 
        outfit_picture: 'noclothes.png',
        activity: 'Basic',
        hours_to_spent: '5',
        activity_level: 100,
        reviews: []       
    }
) 
