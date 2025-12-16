module.exports = {
  plugins: [
    require("postcss-import")({
      path: ['src/assets/css', 'node_modules']
    }),
    require("@tailwindcss/postcss"),
    require("autoprefixer"),
  ],
};