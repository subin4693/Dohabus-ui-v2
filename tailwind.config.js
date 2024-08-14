/** @type {import('tailwindcss').Config} */
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
            colors: {
                // Custom colors
                "custom-blue": "#007bff",
                "custom-indigo": "#6610f2",
                "custom-purple": "#6f42c1",
                "custom-pink": "#e83e8c",
                "custom-red": "#dc3545",
                "custom-orange": "#fd7e14",
                "custom-yellow": "#ffc107",
                "custom-green": "#28a745",
                "custom-teal": "#20c997",
                "custom-cyan": "#17a2b8",
                "custom-white": "#fff",
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
