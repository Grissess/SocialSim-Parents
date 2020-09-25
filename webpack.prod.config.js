const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// To modify css and js files
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const optimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
    // Targeting to frontend
    target: 'web',
    
    devtool: '#source-map',

    optimization: {
        /*
        minimizer: [
            new uglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new optimizeCssAssetsPlugin({})
        ]*/
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                // Loads javascript into html template
                // Entry point is set below
                test: /\.html$/,
                use: [{ 
                    loader: 'html-loader',
                    options: { minimize: true }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{ loader: 'file-loader' }]
            },
            {
                // Loads css into a file 
                // Rules are set in miniCssExtractPlugin
                test: /\.css$/,
                use: [ miniCssExtractPlugin.loader, 'css-loader' ]
            }
        ]
    },
    plugins: [

        new htmlWebpackPlugin({
            template: './src/html/index.html',
            filename: './index.html',
        }),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            L: 'leaflet'
        }),

        new miniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
}