'use strict';

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const CompressionPlugin = require("compression-webpack-plugin")

const config = {
    mode: 'development',
    entry: path.join(__dirname, "src", "scripts/app.js"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "js/bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "src"),
        hot: false,
        inline: true,
        noInfo: false,
        port: 3000,
        proxy: {
            "/api": "http://localhost:8080"
        }
    },
    resolve: {
        alias: {
            styles: path.resolve(__dirname, "./src/styles/"),
            scripts: path.resolve(__dirname, "./src/scripts/"),
            images: path.resolve(__dirname, "./src/images/"),
            vue: 'vue/dist/vue.common.js',
        },
        extensions: ['.js', '.vue', '.json', '.scss', '.css'],
    },
    module: {
        rules: []
    },
    plugins: []
};

// babel
config.module.rules.push({
    test: /\.js$/,
    loader: "babel-loader",
    exclude: "/node_modules/",
});

// vue
config.module.rules.push({
    test: /\.vue$/,
    loader: "vue-loader",
});

// fonts
config.module.rules.push({
    test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
    loader: 'file-loader',
    options: {
        publicPath: '../',
        name: 'fonts/[name].[ext]',
    }
});

// images
config.module.rules.push({
    test: /\.(png|jpg|gif|jpeg)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: 'img/[name].[ext]',
                useRelativePath: false,
                outputPath: "",
                publicPath: "../"
            }
        }
    ]
});

// html
config.module.rules.push({
    exclude: /node_modules/,
    include: /src\/*.html/,
    loader: "raw-loader",
    test: /\.html$/
});

// sass
config.module.rules.push({
    test: /\.(sa|sc|c)ss$/,
    use: [
        MiniCssExtractPlugin.loader,
        //"style-loader",
        "css-loader",
        "sass-loader",
    ],
});

// 
config.plugins.push(
    new MiniCssExtractPlugin({
        filename: "css/bundle.css",
    })
);

// html
config.plugins.push(
    new htmlWebpackPlugin({
        template: "./src/index.html",
        //inject: "body",
        minify: false,
        xhtml: true
    })
);

// vue
config.plugins.push(
    new VueLoaderPlugin()
);

// js compression
config.plugins.push(
    new CompressionPlugin({
        test: /\.(js|css)/,
        asset: '[path].gz[query]',
        algorithm: 'gzip'
    })
);

module.exports = config;