const htmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
  entry: "./src/index",
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-react",
                  {
                    pragma: "createElement",
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "public/index.html",
    })
  ],
  devServer: {
    port: 8000
  }
};