/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#2C3333",
                secondary: "#A8A4CE",
                light: "#DFF6FF"
            },
            screens: {
                "3xsmall": "320px",
                "2xsmall": "400px",
                xsmall: "512px",
                small: "1024px",
                medium: "1280px",
                large: "1440px",
                xlarge: "1680px",
                "2xlarge": "1920px"
            }
        }
    },
    plugins: []
};
