// Webpack Plugins.
const { SourceMapDevToolPlugin } = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
    mode: 'development',

    devtool: 'eval-source-map',

    devServer: {
        historyApiFallback: true,
        port: 3000,
        open: false,
        hot: true
    },

    plugins: [
        new SourceMapDevToolPlugin({ filename: '[file].map[query]' }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: '../stats/dev-report.html'
        })
    ],

    optimization: { minimize: false }
}
