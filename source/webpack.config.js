const path = require('path')

module.exports = {
    entry: "./index.js",
    output: {
        path: path.join(__dirname, "..", "static"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};