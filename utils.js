/**
 * ShieldCall Utilities
 */

// Helper to select elements
export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

// Navigation helper
export const navigateTo = (url) => {
    window.location.href = url;
};

// Simulate delay
export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get User from Storage
export const getUser = () => {
    return JSON.parse(localStorage.getItem('shieldCall_user'));
};

// Set User to Storage
export const setUser = (user) => {
    localStorage.setItem('shieldCall_user', JSON.stringify(user));
};

// Check if logged in
export const requireAuth = () => {
    const user = getUser();
    const isAuthPage = ['/login.html', '/signup.html', '/otp.html', '/index.html'].some(path => window.location.pathname.endsWith(path));

    if (!user && !isAuthPage) {
        // If on local file system, pathname might include full path.
        // Simple check: if not user and we are not on auth page, go to login.
        // We need to be careful with file:// protocol paths.
        if (!window.location.href.includes('login.html') &&
            !window.location.href.includes('signup.html') &&
            !window.location.href.includes('otp.html') &&
            !window.location.href.endsWith('ShieldCall/index.html') &&
            !window.location.href.endsWith('/ShieldCall/')) {
            navigateTo('login.html');
        }
    }
};
