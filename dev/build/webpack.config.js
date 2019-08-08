const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')


module.exports = {
    mode: 'production',
    devtool: "cheap-module-eval-source-map",
    entry: {
        main: path.join(__dirname, './test.ts')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js',
    },
    resolve: {
        // 包含在数组里面的后缀名可以不写
        extensions: ['.ts'],
    },
    module: {
        rules: [{
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "ts-loader",
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.html')
        }),
        new CleanWebpackPlugin(), //打包前清除dist目录
    ]
}