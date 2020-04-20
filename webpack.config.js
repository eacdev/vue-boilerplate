const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

let config = {
    entry: './client/src/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist",
        filename: "main.js"
    },
    resolve: {
        extensions: ['.js', '.ts', '.vue']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-typescript'],
                plugins: [
                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                    ['@babel/plugin-proposal-class-properties', { loose: true }],
                    ['@babel/plugin-transform-runtime', { regenerator: true }],
                    ['@babel/plugin-transform-typescript'],
                ],
            },
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader", 'postcss-loader']
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
};

module.exports = config;

