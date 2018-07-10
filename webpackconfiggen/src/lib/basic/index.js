module.exports = {
    mode: "development",
    entry: 'src/index.js',
    output: {
        path: "__dirname+'/static'",
        filename: '[name].[chunkhash:8].js'
    }
}
