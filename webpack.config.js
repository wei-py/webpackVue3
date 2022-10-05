const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  // 入口
  entry: './src/main.js',
  // 输入文件
  output: {
    clean: true,
    path:  __dirname + '/dist',
    filename: '[name].[contenthash].js'
  },
  // 模式
  mode: 'development',
  // 开启服务
  devServer: {
    static: './dist',
    port: 9000
  },
  resolve: {
    alias: {
      // '@utils': path.resolve(__dirname, './utils')
      '@': path.resolve(__dirname)
    }
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack-vue3',
      template: './public/index.html'
    }),
    // new VueLoaderPlugin()
  ],
  // loader
  module: {
    rules: [
      {
        test: /\.m?js/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // {
      //   test: /\.vue/,
      //   loader: 'vue-loader',
      //   options: {
      //     reactivityTransform: true
      //   }
      // },
      {
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							dev: true
						},
						emitCss: false,
						hotReload: true
					}
				}
			},
      {
        test: /\.s[ac]ss/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}