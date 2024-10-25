/* eslint-disable */

const isProduction = process.env.NODE_ENV === "production";

const plugins = [];

// React hot reloading необходим только в режиме разработки
if (!isProduction) {
  plugins.push("react-refresh/babel");
}

module.exports = {
  // Добавляем в babel пресет для работы с React и typescript
  presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
  plugins,
};
