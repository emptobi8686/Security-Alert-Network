import { requireAuth } from './utils.js';
import { initAuth } from './auth.js';
import { initMap } from './map.js';
import { initTriggers } from './triggers.js';
import { initSettings } from './settings.js';

// Global Init
document.addEventListener('DOMContentLoaded', () => {
    // console.log('ShieldCall App Initialized');

    // Auth Check on protected routes
    requireAuth();

    // Initialize Modules
    initAuth();
    initMap();
    initTriggers();
    initSettings();
});
