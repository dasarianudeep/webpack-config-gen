module.exports = {
    test: '/\.css$/',
    use: [
        'style-loader',
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: `(loader) => [
                require('postcss-import')(),
                require('postcss-cssnext')(),
                require('autoprefixer')(),
                require('cssnano')()
            ]`
            }
        }
    ]
}
