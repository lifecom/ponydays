path = require('path');
fs = require('fs');
webpack = require('webpack');
ExtractTextPlugin = require('extract-text-webpack-plugin');

isProduction = process.env.NODE_ENV == 'production';

vendors = [
    'babel-polyfill',
    './js/jquery',
    './js/jquery.file.js',
    './js/jquery.jqmodal.js',
    './js/jquery.notifier.js',
    './js/jquery.markitup.js',
    './js/jquery.serialize.js',
    './js/jquery.poshytip.js',
    './js/jquery.Jcrop.js',
    'jquery-form',
    './css/bootstrap/assets/javascripts/bootstrap',
    'jquery-ui-bundle',
];

let contextPath = path.join(__dirname, 'frontend');
let config = {
    context: contextPath,
    cache: true,

    entry: {
        main: './js/index',
        vendor: vendors,
        light: './css/light.scss',
        dark: './css/dark.scss',
    },
    output: {
        path: path.join(__dirname, 'static', '[hash]'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                },
                compact: true
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css!autoprefixer-loader?browsers=last 15 versions!resolve-url-loader!sass")
            },
            {
                test: /\.css$/,
                loader: "style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?name=img-[sha512:hash:base64:7].[ext]'
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss'],
        modulesDirectories: ['node_modules', 'js'],
        root: [
            process.env.NODE_PATH,
            path.resolve(contextPath)
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.DedupePlugin(),
        function() {
            this.plugin('done', function(stats) {
                fs.writeFileSync(
                    path.join(__dirname, 'config', 'frontend.ver'),
                    stats.hash
                );
            });
        }
    ],
    resolveLoader: {
        root: process.env.NODE_PATH
    }
};

if (isProduction) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}
module.exports = config;
