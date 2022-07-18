// Webpack Plugins.
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const { merge } = require('webpack-merge')

const WEBPACK_COMMON = require('./webpack.config.common.js')
const WEBPACK_DEV = require('./webpack.config.dev.js')
const WEBPACK_PROD = require('./webpack.config.prod.js')

module.exports = (env, argv) => {
    return new SpeedMeasurePlugin().wrap(
        merge(
            WEBPACK_COMMON,
            (
                {
                    production: () => WEBPACK_PROD,
                    development: () => WEBPACK_DEV
                }[argv.mode] ??
                (() => {
                    throw new Error(`No matching configuration for '${argv.mode}' was found!`)
                })
            )()
        )
    )
}
