const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = ({
  projectAbsolutePath = __dirname, //根目录
  needAnalyzer = false, // 是否需要分析包
  isProduction = false, // 是否生产环境
  tinifyApiKey = '' //svg 压缩ApiKey
}) => {
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: '[name].[chunkhash:8].bundle.js',
      path: path.resolve(projectAbsolutePath, 'public'),
      publicPath: '/'
    },
    resolve: {
      alias: {
        config: path.resolve(projectAbsolutePath, './src/config'),
        components: path.resolve(projectAbsolutePath, './src/components'),
        utils: path.resolve(projectAbsolutePath, './src/utils'),
        icons: path.resolve(projectAbsolutePath, './src/assets/icons'),
        img: path.resolve(projectAbsolutePath, './src/assets/img')
      },
      extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.tsx']
    },
    plugins: [
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }), //删除删上次打包
      new ManifestPlugin(), //生成打包输出的json信息
      new HtmlWebpackPlugin({
        title: 'os-viewer' // html 文件管理
      }),
      new MiniCssExtractPlugin({
        filename: isProduction
          ? '[name].[chunkhash:8].css'
          : '[name].[hash:8].css'
      }),
      ...(isProduction ? [new OptimizeCssAssetsPlugin()] : []),
      ...(needAnalyzer ? [new BundleAnalyzerPlugin()] : [])
    ],
    module: {
      rules: [
        /**
         * 添加对 CSS 的支持
         */
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        },
        /**
         * 需要 Babel 编译的 JS
         */
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-export-default-from',
              [
                'import',
                {
                  libraryName: 'antd',
                  libraryDirectory: 'es',
                  style: true
                }
              ]
            ]
          },
          include: [
            // 应用源码目录
            path.resolve(projectAbsolutePath, './src'),
            path.resolve(projectAbsolutePath, './demo')
          ]
        },
        {
          test: /\.(tsx|ts)?$/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-export-default-from',
              [
                'import',
                {
                  libraryName: 'antd',
                  libraryDirectory: 'es',
                  style: true
                }
              ]
            ]
          }
        },
        /**
         * svg压缩
         */
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 100000
              }
            },
            {
              loader: 'svgo-loader',
              options: {
                plugins: [{ removeViewBox: false }]
              }
            }
          ]
        },
        /**
         * 图片压缩
         */
        {
          test: /\.(png|jpe?g)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 100000
              }
            },
            ...(tinifyApiKey
              ? [
                  {
                    loader: 'webpack-tinypng-loader',
                    options: {
                      apikey: tinifyApiKey
                    }
                  }
                ]
              : [])
          ]
        },
        /**
         * 其他静态资源
         */
        {
          test: /\.(woff|woff2|eot|ttf|gif)$/,
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        },

        /**
         * 支持模块化引入html文件
         */
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader'
          }
        },
        /**
         * 支持模块化引入csv文件
         */
        {
          test: /\.(csv|tsv)$/,
          use: ['csv-loader']
        },
        /**
         * 需要下载的静态资源(txt, xlsx)，直接引用路径
         * 因为 Edge 浏览器不能下载base64编码文件
         */
        {
          test: /\.(txt|xlsx|xls)$/,
          loader: 'file-loader',
          options: {
            outputPath: 'assets'
          }
        },
        /**
         * 支持模块化引入xml文件
         */
        {
          test: /\.xml$/,
          use: ['xml-loader']
        }
      ]
    }
  };
};
