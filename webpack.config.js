const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const cssPlugin = new MiniCssExtractPlugin({
    filename: "blip-components.css"
});

module.exports = function() {
    return {
        mode: "none",
        entry: {
            components: "index",
            events: "events",
            templates: "templates",
            EventEmitter: "shared/EventEmitter"
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
            libraryTarget: "commonjs2"
        },
        optimization: {
            minimizer: [new OptimizeCSSAssetsPlugin({})]
        },
        module: {
            noParse: /\.min\.js/,
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    exclude: /node_modules/
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                transpileOnly: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpe?g|gif|png|cur)$/i,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 8192,
                                name: "img/[name].[ext]?[hash]"
                            }
                        }
                    ],
                    exclude: {
                        test: path.resolve(__dirname, "src/assets/fonts")
                    }
                },
                {
                    test: /\.(jpe?g|woff|woff2|eot|ttf|gif|png|cur|svg)$/i,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 8192,
                                name: "fonts/[name].[ext]?[hash]"
                            }
                        }
                    ],
                    include: {
                        test: path.resolve(__dirname, "src/assets/fonts")
                    }
                },
                {
                    test: /.*(?<!-icon)\.svg$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 1024,
                                name: "assets/[name].[ext]?[hash]"
                            }
                        }
                    ],
                    include: {
                        test: path.resolve(__dirname, "src/"),
                        exclude: {
                            test: path.resolve(__dirname, "src/assets/fonts")
                        }
                    }
                },
                {
                    test: /.*-icon\.svg$/i,
                    use: [
                        {
                            loader: "raw-loader"
                        }
                    ],
                    include: {
                        test: path.resolve(__dirname, "src/"),
                        exclude: {
                            test: path.resolve(__dirname, "src/assets/fonts")
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: ["style-loader", "css-loader", "sass-loader"]
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                            options: {
                                exportAsEs6Default: true,
                                root: path.resolve(__dirname, "src"),
                                attrs: [":src", ":href", ":xlink:href"]
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: [".webpack.js", ".web.js", ".js", ".html", ".ts"],
            modules: [path.resolve(__dirname, "src"), "node_modules"],
            alias: {
                assets: path.resolve(__dirname, "src/assets")
            }
        },
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            watchContentBase: true,
            inline: true,
            compress: true
        },
        externals: {
            blipToolkit: "blip-toolkit",
            angular: "angular",
            moment: "moment",
            "angular-translate": "angular-translate",
            "angular-translate-storage-cookie":
                "angular-translate-storage-cookie",
            fecha: "fecha"
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.LoaderOptionsPlugin({
                debug: true
            }),
            new ForkTsCheckerWebpackPlugin({
                tslint: "./tslint.json",
                tsconfig: "./tsconfig.json",
                watch: "./src/**/*.ts",
                async: false
            }),
            cssPlugin
        ]
    };
};
