module.exports = {
    enforce: 'pre',
    test: '/\.js$/',
    exclude: '/node_modules/',
    use: 'jshint-loader'
}
