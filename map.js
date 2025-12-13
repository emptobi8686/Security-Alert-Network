import { $, $$ } from './utils.js';

export const initMap = () => {
    const mapContainer = $('.map-container') || $('.live-map');
    if (!mapContainer) return;

    console.log('Initializing Map...');

    // Simulate location updates if on live alert
    if (window.location.pathname.includes('live-alert.html')) {
        simulateLiveTracking();
    }
};

const simulateLiveTracking = () => {
    const statusText = $('.card span') || document.createElement('span'); // Fallback

    // Mock updating coordinates
    setInterval(() => {
        // Random small jitter
        const jitter = (Math.random() - 0.5) * 0.0001;
        console.log(`Updating location... offset: ${jitter}`);

        // In a real app we'd update a map marker here
        // For now, let's just flash the "Broadcasting Location" indicator if it exists
        const indicator = $('.animate-blink') || $('.card div[style*="background: #FF3B30"]'); // Try to find the red dot
        if (indicator) {
            indicator.style.opacity = (indicator.style.opacity === '0.5' ? '1' : '0.5');
        }
    }, 2000);
};
