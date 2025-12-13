import { $, navigateTo, setUser, getUser, wait } from './utils.js';

export const initAuth = () => {
    // Signup Logic
    const signupForm = $('#signupLink'); // We might need to wrap inputs in a form or just attach to button
    const signupBtn = $('a[href="onboarding-location.html"]'); // Start targeting the "Sign Up" button in signup.html

    if (window.location.pathname.includes('signup.html')) {
        const btn = $('.btn-primary');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const name = $('input[placeholder="Full Name"]').value;
                const phone = $('input[placeholder="Phone Number"]').value;
                const password = $('input[placeholder="Create Password"]').value;

                if (!name || !phone || !password) {
                    alert('Please fill in all fields');
                    return;
                }

                // Create mock user
                const user = {
                    name,
                    phone,
                    emergencyContacts: [],
                    triggers: { shake: false, power: false, tap: false },
                    token: 'mock-token-' + Date.now()
                };

                setUser(user);
                // Go to Onboarding
                navigateTo('onboarding-location.html');
            });
        }
    }

    // Login Logic
    if (window.location.pathname.includes('login.html')) {
        const btn = $('.btn-primary');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const phone = $('input[type="tel"]').value;
                // Mock Login - accept any "valid" looking input or check stored
                // Ideally check against stored, but for "first run" experience we might just let them in or require signup 
                // Let's check if a user is stored with that number, if not prompt signup? 
                // For simplicity: If user exists in localStorage, check phone. (Mock)

                const storedUser = getUser();
                if (storedUser && storedUser.phone === phone) {
                    navigateTo('home.html'); // Skip onboarding on login
                } else {
                    // Just allow "demo" login creating a temp user if none exists
                    if (!storedUser) {
                        alert('No account found. Please Sign Up first.');
                        return;
                    }
                    alert('Invalid Credentials (Mock: Use the phone number you signed up with)');
                }
            });
        }
    }

    // OTP Logic
    if (window.location.pathname.includes('otp.html')) {
        const btn = $('.btn-primary');
        const input = $('.input-field');

        if (input) {
            input.addEventListener('input', (e) => {
                if (e.target.value.length === 4) {
                    btn.click();
                }
            });
        }

        if (btn) {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                btn.innerText = 'Verifying...';
                await wait(1000);
                // Determine destination based on flow? 
                // Hardcode: go to onboarding if new, home if returning?
                // For now, follow the href but do it via JS
                navigateTo('onboarding-location.html');
            });
        }
    }
};
