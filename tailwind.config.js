module.exports = {
  content: [
    "./src/html/**/*.html",
    "./src/app/**/*.js",
    "./src/assets/js/**/*.js",
    "./src/core/**/*.js",
    "./node_modules/@keenthemes/ktui/**/*.js"
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