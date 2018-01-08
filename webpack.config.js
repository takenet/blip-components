const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssPlugin = new ExtractTextPlugin('blip-components.css');

module.exports = {
    entry: [ 'webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080', __dirname + '/index.js' ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'blip-components.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                }],
                exclude: /node_modules/
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'ts-loader' }
                ]
            },
            {
                test: /\.scss$/,
                use: cssPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        { loader: 'resolve-url-loader' },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: false, /* Disabled due to a bug in saas: https://github.com/sass/libsass/issues/2312 */
                                root: path.resolve(__dirname, './')
                            }
                        }
                    ]
                }),
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: false,
                        exportAsEs6Default: true
                    }
                }],
            }
        ]
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js', '.html', '.ts'],
        modules: [
            'node_modules'
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true
    },
    node: {
        hot: true,
        inline: true,
        progress: true,
        colors: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        cssPlugin
    ]
};