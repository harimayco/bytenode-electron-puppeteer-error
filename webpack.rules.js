module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  },
  {
    test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
    use: 'url-loader',
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'image/svg+xml',
      },
    },
  },
  {
    // regex for the files that are problematic
    test: /node_modules\/puppeteer-extra\/dist\/index\.esm\.js/,
    loader: 'string-replace-loader',
    options: {
      // match a require function call where the argument isn't a string
      // also capture the first character of the args so we can ignore it later
      search: 'require[(]([^\'"])',
      // replace the 'require(' with a '__non_webpack_require__(', meaning it will require the files at runtime
      // $1 grabs the first capture group from the regex, the one character we matched and don't want to lose
      replace: '__non_webpack_require__($1',
      flags: 'g'
    }
  }
];
