var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/main.jsx',
    output: { path: __dirname + '/../www/js/dist/', filename: 'bundle.js' },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    }
};