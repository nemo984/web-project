/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                lightgreen: "#D0FFDF",
                shirt: "#D3D3D3",
            },
        },
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#1B6C8D",

                    secondary: "#FFFFFF",

                    accent: "#8d3f1b",

                    neutral: "#3D4451",

                    "base-100": "#FFFFFF",

                    info: "#3ABFF8",

                    success: "#36D399",

                    warning: "#FBBD23",

                    error: "#F87272",
                },
            },
        ],
    },
    plugins: [require("daisyui")],
};
