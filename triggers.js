import { $, navigateTo, wait } from './utils.js';

export const initTriggers = () => {
    // Shake Setup logic
    if (window.location.pathname.includes('setup-shake.html')) {
        const testBtn = $('.btn-secondary'); // "Test Mode Active" button or similar

        // Simulate shake event for testing
        // usage: window.dispatchEvent(new Event('devicemotion')) (mock)
        // or just click the button to simulate "Shake detected"
        if (testBtn) {
            testBtn.addEventListener('click', () => {
                alert('Shake Detected! (Simulation)');
                // In real app, we'd enable the sensor
            });
        }

        const slider = $('input[type="range"]');
        if (slider) {
            slider.addEventListener('change', (e) => {
                console.log('Shake sensitivity set to:', e.target.value);
                // Save to localStorage if we had a settings object
                localStorage.setItem('shieldCall_shakeSensitivity', e.target.value);
            });
        }
    }

    // Alert Countdown Logic
    if (window.location.pathname.includes('alert-countdown.html')) {
        let count = 5;
        const countDisplay = $('.countdown-circle');
        const cancelBtn = $('.btn-secondary');

        let timer = setInterval(() => {
            count--;
            if (countDisplay) countDisplay.innerText = count;

            if (count <= 0) {
                clearInterval(timer);
                navigateTo('live-alert.html');
            }
        }, 1000);

        if (cancelBtn) {
            cancelBtn.addEventListener('click', (e) => {
                e.preventDefault();
                clearInterval(timer);
                navigateTo('home.html');
            });
        }
    }

    // Live Alert Logic
    if (window.location.pathname.includes('live-alert.html')) {
        const stopBtn = $('.btn-secondary'); // "I am Safe"
        if (stopBtn) {
            stopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('Are you sure you want to stop the alert?')) {
                    navigateTo('home.html');
                }
            });
        }
    }
};
