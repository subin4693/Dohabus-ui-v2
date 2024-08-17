/** @type {import('tailwindcss').Config} */
// @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Inter:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
        "./app/**/*.{js,jsx}",
        "./src/**/*.{js,jsx}",
    ],
    prefix: "",
    theme: {
        extend: {
            // fontFamily: {
            //     custom: ['"font-family: "Roboto", sans-serif"'],
            // },
            colors: {
                // Custom colors
                "custom-blue": "#007bff",
                "custom-indigo": "#6610f2",
                "custom-purple": "#6f42c1",
                "custom-pink": "#e83e8c",
                "custom-red": "#dc3545",
                "custom-orange": "#fd7e14",
                "custom-yellow": "#FED92E",
                "custom-green": "#28a745",
                "custom-teal": "#20c997",
                "custom-cyan": "#17a2b8",
                "custom-white": "#fff",
                "custom-yellow-light": "rgba(255, 193, 7, 0.5)",
                gray: {
                    DEFAULT: "#6c757d",
                    dark: "#343a40",
                },
                primary: "#007bff",
                secondary: "#6c757d",
                success: "#28a745",
                info: "#17a2b8",
                warning: "#ffc107",
                danger: "#dc3545",
                light: "#f8f9fa",
                dark: "#343a40",
            },
            screens: {
                xs: "0px",
                sm: "576px",
                md: "768px",
                lg: "992px",
                xl: "1200px",
            },
        },
    },
    plugins: [],
};
