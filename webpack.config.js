const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssPlugin = new ExtractTextPlugin('blip-components.css');

module.exports = {
    entry: [ 'webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080', __dirname + '/src/index' ],
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
                test: /\.(jpe?g|gif|png|cur)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'img/[name].[ext]?[hash]',
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: cssPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'resolve-url-loader' },
                    ],
                }),
            },
            {
                test: /^((?!\.module).)*scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.module.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]__[hash:base64:5]',
                        },
                    },
                    'sass-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: cssPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'resolve-url-loader' },
                    ],
                }),
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
            path.resolve(__dirname, 'src'),
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
        new ForkTsCheckerWebpackPlugin({
            tslint: './tslint.json',
            tsconfig: './tsconfig.json',
            watch: './src/**/*.ts',
            async: false,
        }),
        cssPlugin
    ]
};
