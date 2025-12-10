module.exports = {
  content: [
    "./src/html/**/*.html",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/assets/js/**/*.{js,ts}",
    "./src/core/**/*.{js,ts}",
    "./node_modules/@keenthemes/ktui/**/*.{js,ts}"
  ],
  theme: {
        extend: {
            colors: {
                primary: "#3E97FF",
                success: "#50CD89",
                danger: "#F1416C",
                warning: "#FFC700",
                info: "#7239EA",
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
    ],
};