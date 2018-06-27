module.exports = {
    test: /\.css$/,
    use: {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: ```(loader) => [
                require('postcss-import')(),
                require('postcss-cssnext')(),
                require('autoprefixer')(),
                require('cssnano')()
            ]```
        }
    }
}
