/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                //'background-login': "url('../assets/Asset/Map1/ScrollBG.png')",
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
};
