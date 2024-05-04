const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { clean } = require('gh-pages');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode:'development',
    entry: {
        main:'./scripts/script.js'
    }, 
    output: { 
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/icons/[hash][ext][query]',
        clean: true
    },
    devServer: {
        port: 4200,
        hot: isProd
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true,
            minify: isProd
        }), 
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'assets/img/brands', to: 'assets/img/brands'},
                {from: 'assets/img/hero', to: 'assets/img/hero'},
                {from: 'assets/img/devices', to: 'assets/img/devices'}
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 
                        'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                        MiniCssExtractPlugin.loader, 
                                'css-loader', 
                                'resolve-url-loader',
                                    {
                                        loader: 'sass-loader',
                                        options: {
                                            sourceMap: true
                                        }
                                    }
                ]
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            }
        ]
    }
}