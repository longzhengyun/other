const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/main',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.vue$/, 
                loader: 'vue-loader'
            },
            {
                test: /\.js$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/
            },
            {
                test: /\.css$/, 
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|gif)$/, 
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.(html|tpl)$/, 
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                devServer: {
                    historyApiFallback: true,
                    hot: false,
                    inline: true,
                    progress: true
                },
                babel: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                },
            }
        })
    ],
    resolve: {
        extensions: ['*', '.js', '.vue'],
        alias: {
            'components': path.resolve(__dirname, './src/components')
        }
    },
    devtool: 'eval-source-map'
};