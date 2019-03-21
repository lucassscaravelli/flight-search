const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const devMode = argv.mode === 'development' || argv.mode === undefined;

  return {
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.jsx?/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            // se não tiver em modo de desenvolvimento vai quebrar os erros de lint
            emitWarning: devMode,
          },
        },
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
          resolve: { extensions: ['.js', '.jsx'] },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    ],
    output: {
      filename: '[hash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      publicPath: '/',
      historyApiFallback: true,
    },
  };
};
