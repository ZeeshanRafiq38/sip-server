/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                primaryHover: "var(--primaryHover)",
                secondary: "var(--secondary)",
                gray: "var(--gray)",
                pure: "var(--pure)",
            },
            fontFamily: {
                custom: ["Poppins", "sans-serif"],
            },
        },
    },
    plugins: [],
};
