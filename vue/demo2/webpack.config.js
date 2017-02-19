var Webpack = require('webpack');
module.exports = {
    entry: ['./entry.js'],
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test:/\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: [
        new Webpack.BannerPlugin('Jary:打包文件头部注释')
    ]
};