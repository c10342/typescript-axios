const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const PostcssCssnext = require('postcss-cssnext')


module.exports = {
    mode: 'development',
    devtool: "cheap-module-eval-source-map",
    entry: {
        main: ['webpack-hot-middleware/client', path.join(__dirname, './test.ts')]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js'
    },
    resolve: {
        // 包含在数组里面的后缀名可以不写
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: "ts-loader",
        },
        {
            test: /\.html$/,
            exclude: /node_modules/,
            loader: "html-loader",
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        indet: 'postcss',
                        plugins: [
                            PostcssCssnext(),
                        ]
                    }
                }
            ]
        },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.html')
        }),
        new CleanWebpackPlugin(), //打包前清除dist目录
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}