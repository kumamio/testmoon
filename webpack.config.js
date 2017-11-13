const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: {
  	app: './src/index.js',
  },
  devServer: {
     contentBase: './dist',
     hot: true
  },
  output: {
    filename: './js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.(scss|css)/,
        loader: ExtractPlugin.extract('style',['css!sass'], {
          //替换css文件中的图片路劲,但 url-loader优先级更高，与输出图片文件的位置无关
          //css中涉及到的图片output到本地目录的路径由url-loader的name或output决定
          publicPath: '../'
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url?limit=1000&name=./img/[name].[ext]'
      }
    ]
  },
  plugins: [
  new CleanWebpackPlugin(['dist']),
	new HtmlWebpackPlugin({
	  title: 'Output Management',
    template: 'index.html'
	}),
	new webpack.NamedModulesPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new UglifyJSPlugin(),
	new ExtractPlugin('css/[name].bundle.css')
  ]
};