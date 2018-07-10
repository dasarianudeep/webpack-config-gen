module.exports = {
    test: '/\.html$/',
    exclude: '/node_modules/',
    use: ['babel-loader', 'polymer-webpack-loader']
}
