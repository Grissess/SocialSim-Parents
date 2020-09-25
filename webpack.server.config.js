const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {

    // Choose between development and production mode
    const   SERVER_PATH = (argv.mode === 'production') ?
            './src/server/server-prod.js' :
            './src/server/server-dev.js'

    return ({
        // Server entry point.
        entry: {
            server: SERVER_PATH
        },
        // Server build.
        output: {
            path: path.join(__dirname, 'dist'),
            publicPath: '/',
            filename: '[name].js'
        },
        // Targeting to node.
        target: 'node',

        node: {
            // Need this when working with express
            __dirname: false,
            __filename: false
        },
        // Need this to avoid working with express
        externals: [ nodeExternals() ],

        module: {
            rules: [
                {
                    // Transpiles ES6-8 into ES5
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        }
    });
}