require('dotenv').config({ path: './.env' });
const path = require('path');
const { DefinePlugin } = require('webpack');

module.exports = {
  entry: {
    'demo-1': './demo/demo-1.ts',
    'demo-2': './demo/demo-2.ts',
    'demo-3': './demo/demo-3.ts'
  },
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      SIP_PASSWORD: JSON.stringify(process.env.SIP_PASSWORD),
      SENTRY_DSN: JSON.stringify(process.env.SENTRY_DSN)
    })
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    extensionAlias: {
      '.js': ['.ts', '.js'],
      '.mjs': ['.mts', '.mjs'],
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
};
