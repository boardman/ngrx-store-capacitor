const helpers = require('./config/helpers');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'eval-cheap-module-source-map',

  resolve: {
    extensions: ['.ts', '.js']
  },

  entry: helpers.root('index.ts'),

  output: {
    path: helpers.root('bundles'),
    publicPath: '/',
    filename: 'ngrx-store-capacitor.umd.js',
    libraryTarget: 'umd',
    library: 'ngrx-store-capacitor'
  },

  // require those dependencies but don't bundle them
  externals: [/^\@angular\//, /^rxjs\//],
  target: 'node',

  module: {
    rules: [
        {
            test: /\.tsx?$/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        // set to true to speed up builds if you use a separate type-check step
                        transpileOnly: false
                    }
                }
            ],
            exclude: /node_modules/
        }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      /@angular(\\|\/)core(\\|\/)esm5/,
      helpers.root('./src')
    ),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslintLoader: {
          emitErrors: true,
          failOnHint: true
        }
      }
    }),
    new CleanWebpackPlugin(['bundles'], {
      root: helpers.root(),
      verbose: false,
      dry: false
    })
  ]
};
