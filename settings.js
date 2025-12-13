import { $, getUser, navigateTo } from './utils.js';

export const initSettings = () => {
    // Only run on settings page
    if (!window.location.pathname.includes('settings.html')) return;

    const user = getUser();
    if (user) {
        const nameDisplay = $('.card .font-weight-600') || $('div[style*="font-weight: 600; font-size: 18px;"]');
        const phoneDisplay = $('.card .text-grey') || $('div[style*="font-size: 14px; color: var(--text-grey);"]');

        if (nameDisplay) nameDisplay.innerText = user.name;
        if (phoneDisplay) phoneDisplay.innerText = user.phone;
    }

    // Logout
    const logoutBtn = $('button[style*="color: #FF3B30"]'); // Targeting by style based on HTML... risky but quick for this task
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('shieldCall_user');
            navigateTo('login.html');
        });
    }
};
