// Webpack Plugins.
const CompressionPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
    mode: 'production',

    plugins: [
        new CompressionPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: '../stats/prod-report.html'
        })
    ],

    // TODO: Evaluate which minimizer is best. See: https://github.com/privatenumber/minification-benchmarks
    optimization: { minimize: true }
}
