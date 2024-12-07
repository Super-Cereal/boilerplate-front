/* eslint-disable */

const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

// Режим для разработки – максимальная скорость сборки, низкая производительность приложения.
// Режим для продакшена – медленная сборка, высокая производительность приложения.
const mode = isProduction ? "production" : "development";
const target = isProduction ? "browserslist" : "web";

const plugins = [
  // Данный html будет использован как шаблон
  new HtmlWebpackPlugin({ template: "./src/index.html" }),

  // Формат имени css-файла
  new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
];

if (!isProduction) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

const rules = [
  {
    test: /\.(jsx?|tsx?)$/,
    exclude: /(node_modules)/,
    use: {
      loader: "babel-loader",
      options: {
        cacheDirectory: true, // Использование кэша для избежания рекомпиляции при каждом запуске
      },
    },
  },
  {
    test: /\.(scss|css)$/,
    use: [
      isProduction ? MiniCssExtractPlugin.loader : "style-loader",
      {
        loader: "css-loader",
        options: {
          modules: {
            namedExport: false,
            exportLocalsConvention: "as-is",
            localIdentName: "[name]__[local]--[hash:base64:5]",
          },
        },
      },
      "sass-loader",
    ],
  },
  {
    test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
    type: isProduction ? "asset" : "asset/resource", // В продакшен режиме
    // изображения размером до 8кб будут инлайнится в код
    // В режиме разработки все изображения будут помещаться в dist/assets
  },
  {
    test: /\.(woff2?|eot|ttf|otf)$/i,
    type: "asset/resource",
  },
  {
    test: /\.(html)$/,
    use: ["html-loader"],
  },
];

module.exports = {
  mode,
  target,

  entry: "./src/index.tsx",
  output: {
    assetModuleFilename: "assets/[hash][ext][query]", // Все ассеты будут складываться в dist/assets
    path: path.join(__dirname, "dist"), // Директория, в которой будет размещаться итоговый бандл
    filename: "index.js",
    clean: true, // Очищает директорию dist перед обновлением бандла
    publicPath: "/",
  },

  devtool: "source-map",
  devServer: {
    open: true,
    hot: true, // Включает автоматическую перезагрузку страницы при изменениях
    historyApiFallback: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    extensions: [".jsx", ".ts", ".tsx", "..."],
  },

  plugins,
  module: { rules },
};
