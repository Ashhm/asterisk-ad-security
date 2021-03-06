var webapck = require('webpack');

module.exports = {
    entry:['babel-polyfill', './src/index.js'],
    output: {
        path: __dirname + '/public/build',
        publicPath: "/build",
        filename: "bundle.js"
    },
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: true
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!autoprefixer-loader!less-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.jsx$/,
                loader: "react-hot-loader!babel-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 25000,
                },
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};