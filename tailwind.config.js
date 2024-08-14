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
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            transitionProperty: {
                bg: "background-color",
            },
            colors: {
                yellow: "hsl(var(--color-yellow))",
                black: "hsl(var(--color-black))",
                orange: "hsl(var(--color-orange))",
                blue: "hsl(var(--color-blue))",
                gray: "hsl(var(--color-gray))",
                red: "hsl(var(--color-red))",
                green: "hsl(var(--color-green))",
                purple: "hsl(var(--color-purple))",
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
                rubik: ["Rubik", "sans-serif"],
                "custom-sans": ["Helvetica", "Arial", "sans-serif"],
            },
            fontSize: {
                title: "2.5rem",
                subtitle: "1.75rem",
                paragraph: "1rem",
                small: "0.875rem",
            },
        },
    },
    plugins: [],
};
