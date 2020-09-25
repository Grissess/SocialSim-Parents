const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Define entry point.
    entry: {
        main: './src/index.js'
    },
    // Define webpack built.
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    // Development mode
    mode: 'development',
    // Targeting to frontend
    target: 'web',
    
    devtool: '#source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                // Loads javascript into html template
                // Entry point is set below
                test: /\.html$/,
                use: [{ 
                    loader: 'html-loader',
                    // options: { minimize: true }
                }]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [ 'file-loader' ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/html/index.html',
            filename: './index.html',
            excludeChunks: ['server']
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}