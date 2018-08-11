const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
    mode: 'development',
    entry: [
        "./src/scripts/app.js"
    ],
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "js/bundle.js"
    },
    devServer: {
        port: process.env.PORT || 3000,
        publicPath: '/',
        contentBase: path.resolve(__dirname, "./build"),
        watchContentBase: true,
        compress: true,
    },
    resolve: {
        alias: {
            styles: path.resolve(__dirname, "./src/styles/"),
            scripts: path.resolve(__dirname, "./src/scripts/"),
            images: path.resolve(__dirname, "./src/images/"),
        }
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


module.exports = config;