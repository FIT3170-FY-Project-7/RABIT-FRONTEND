// Webpack Plugins.
const { DefinePlugin, BannerPlugin, ProgressPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// This import is required for the CSV parser.
const Buffer = require('buffer/').Buffer // eslint-disable-line

// Path library.
const path = require('path')

// Webpack configuration.
const PACKAGE_JSON_PATH = path.resolve(__dirname, 'package.json')
const PACKAGE_JSON = require(PACKAGE_JSON_PATH) // The package.json file.

// License banner.
const fs = require('fs')
const { optimization } = require('./webpack.config.dev')
const LICENSE_BANNER = require('remove-markdown')(fs.readFileSync(path.resolve(__dirname, 'LICENSE.md'), 'utf8'))

// Module configuration.
const INLINE_LIMIT = 10000 // 10 kb limit for inlining asset data.

module.exports = {
    resolve: {
        roots: [__dirname, path.resolve(__dirname, 'src')],
        alias: { react: path.resolve(__dirname, 'node_modules', 'react') },
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        fallback: {
            stream: require.resolve('stream-browserify'),
            buffer: require.resolve('buffer/') // This is required for the CSV parser.
        }
    },
    entry: './src/index.tsx',

    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].[chunkhash].chunk.js',
        filename: '[name].[fullhash].bundle.js',
        clean: true
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        node: 'current',
                                        esmodules: true
                                    }
                                }
                            ],
                            '@babel/preset-typescript',
                            ['@babel/preset-react', { runtime: 'automatic' }]
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-syntax-dynamic-import'
                        ]
                    }
                }
            },
            { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            //{ test : /\.html$/, use : ['html-loader' /* 'markup-inline-loader' */                         ] },
            {
                test: /\.svg$/i,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            name: '[name].[contenthash].[ext]',
                            limit: INLINE_LIMIT, // If size < INLINE_LIMIT, add escaped image URL to CSS.
                            outputPath: 'images' // If size > INLINE_LIMIT, move SVG file to public/images via file-loader.
                        }
                    }
                ]
            },
            {
                test: /\.(png|gif|jpe?g|webp)(\?[a-z0-9]+)?$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[contenthash].[ext]',
                            limit: INLINE_LIMIT, // If size < INLINE_LIMIT, inline base64-encoding of the image.
                            outputPath: 'images' // If size > INLINE_LIMIT, move image to public/images via file-loader.
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[contenthash].[ext]',
                            limit: INLINE_LIMIT, // If size < INLINE_LIMIT, inline base64-encoding of the font.
                            outputPath: 'fonts' // If size > INLINE_LIMIT, move font to public/fonts via file-loader.
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new DefinePlugin({
            RABIT_VERSION: JSON.stringify(PACKAGE_JSON.version)
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                    to: 'public',
                    globOptions: { ignore: ['index.html'] }
                }
            ]
        }),
        new BannerPlugin(
            LICENSE_BANNER +
                '\nfullhash  | [fullhash]' +
                '\nchunkhash | [chunkhash]' +
                '\nname      | [name]' +
                '\nbase      | [base]' +
                '\nquery     | [query]' +
                '\nfile      | [file]'
        ),
        new ProgressPlugin((percent, msg, ...args) =>
            console.log(`${(percent * 100).toFixed(2).padEnd(7)}% | ${msg.padEnd(8)} | ${args.join(' :: ')}`)
        ),
        new HtmlWebpackPlugin({
            // The index.html file is used as a template here, which is why we ignore it in CopyWebpackPlugin.
            template: './public/index.html',
            // The output file name.
            filename: 'index.html',
            // Metadata to be passed to the template's placeholder strings.
            meta: {
                author: PACKAGE_JSON.author,
                keywords: PACKAGE_JSON.keywords.join(','),
                description: PACKAGE_JSON.description
            }
        })
    ],

    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxSize: 244000
            /*
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    enforce: true,
                    maxSize: 50000
                }
            }
            */
        }
    }
}
