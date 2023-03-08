/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
    theme: {
        extend: {
            screens: {
                mobile: '500px',
                tablet: '900px',
            },
            fontSize: {
                // lg: ['16px', '28px'],
                // xl: ['22px', 1],
                '5xl': ['44px', '50px'],
                '6xl': ['55px', '60px'],
            },
            fontFamily: {
                // helve: ['Helvetica Neue', 'serif'],
                // helveBold: ['Helvetica Neue Bold', 'serif'],
                inter: ['Inter', 'serif'],
            },
            colors: {
                gray: {
                    DEFAULT: '#F7F7F7',
                    500: '#333333',
                },
                cyan: {
                    500: '#29C2E2',
                },
                blue: {
                    500: '#2D4EF5',
                    opacity: '#2D4EF520',
                },
                black: {
                    DEFAULT: '#000000',
                    100: '#101010',
                },
                purple: {
                    DEFAULT: '#6e18a9',
                    100: '#A937F7',
                    400: '#451C7C',
                    500: '#0d0016',
                },
                gold: {
                    DEFAULT: '#6e18a9',
                    100: '#FEC900',
                    400: '#FF9E24',
                    500: '#0d0016',
                },
            },
        },
    },
    plugins: [require('tw-elements/dist/plugin')],
};
