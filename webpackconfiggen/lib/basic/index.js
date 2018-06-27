modul.exports = {
    entry: 'src/app.js',
    output: {
        path: __dirname+'/static',
        filename: '[name].[chunkhash:8].js'
    }
}
