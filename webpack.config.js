const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin      = require('html-webpack-plugin');
const CopyWebpackPlugin      = require('copy-webpack-plugin');
const { SourceMapDevToolPlugin } = require('webpack');

module.exports = {
  mode: "none",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
    publicPath: '/' // Fixes "cannot GET <page>" issues; see https://ui.dev/react-router-cannot-get-url-refresh.
  },
  resolve: {
    alias: {
      react: path.join(__dirname, "node_modules", "react")
    },
    modules: [
      path.join(__dirname, "src"),
      "node_modules"
    ],
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env", {
                  targets: {
                    node: "current",
                    esmodules: true
                  }
                }
              ],
              "@babel/preset-typescript",
              [
                "@babel/preset-react", {
                  runtime: "automatic"
                }
              ]
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-runtime",
              "@babel/plugin-syntax-dynamic-import"
            ]
          }
        }
      }, {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }, {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      /*
			{
				test : /\.html$/,
				use  : [
					{ loader : 'html-loader' },
					// Necessary? { loader : 'markup-inline-loader' }
				]
			},
			*/
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  // Fixes "cannot GET <page>" issues; see https://ui.dev/react-router-cannot-get-url-refresh.
  devServer: { historyApiFallback: { rewrites: [{ from: /./, to: '/index.html' }] } },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: true,
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from        : 'public',
          to          : 'build',
          globOptions : { ignore: ['index.html'] }
        }
      ]
    }),
    new SourceMapDevToolPlugin({ filename: "[file].map[query]" })
  ]
};
