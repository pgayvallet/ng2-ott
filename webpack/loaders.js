'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.ts = {
    test: /\.ts$/,
    use: '@ngtools/webpack',
};

exports.ts_JiT = {
    test: /\.ts$/,
    loaders: [
        'awesome-typescript-loader',
        'angular2-template-loader',
        'angular2-router-loader',
    ],
};

exports.html = {
    test: /\.html$/,
    use: 'raw-loader',
};

exports.sass = {
    test: /\.scss$/,
    include: /src/,
    use: [
        { loader: "style-loader" },
        { loader: "css-loader" },
        { loader: "sass-loader" }
    ],
    exclude: /node_modules/,
};


/*
exports.componentCss = {
    test: /\.css$/,
    include: /src\/app/,
    use: [
        'to-string-loader',
        'css-loader?-minimize',
        'postcss-loader',
    ],
    exclude: /node_modules/,
};

exports.globalCss = {
    test: /\.css$/,
    include: [
        /node_modules/,
        /src\/styles/,
    ],
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            'css-loader',
            'postcss-loader',
        ],
    }),
};
*/

exports.file = {
    test: /\.(png|jpe?g|gif|svg|ico|woff|woff2|ttf|eot)(\?.*)?$/,
    use: 'file-loader',
};