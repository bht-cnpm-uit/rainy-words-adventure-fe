/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                //'background-login': "url('./Assets/Asset/Map1/ScrollBG.png')",
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
            },
            animation: {
                wiggle: 'wiggle 1s ease-in-out infinite',
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
};
