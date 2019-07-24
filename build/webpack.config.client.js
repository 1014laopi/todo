const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const merge = require('webpack-merge');
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';
const devServer = {
    port: '8001',
    host: '0.0.0.0',
    overlay: {
        errors: true
    },
    hot: true
    // open: true
};
let config;

if (isDev) {
    config = merge(baseConfig, {
        devtool: "#cheap-module-eval-source-map",
        module: {
            rules: [{
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            }]
        },
        devServer,
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ]
    });
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../src/index.js'),
            vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [{
                test: /\.styl/,
                use: ExtractPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'stylus-loader'
                    ]
                })
            }]
        },
        plugins: [
            new ExtractPlugin('styles.[hash:8].css')
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        name: "vendor",
                        chunks: "initial",
                        minChunks: 2,
                        // 最小多少字节，文件太小，为了测试，这个参数设置为0，这个值默认30000
                        minSize: 0
                    }
                }
            },
            // runtime缓存单独打包
            runtimeChunk: {
                name: 'runtime'
            },
            // 设置跳过编译时报错
            // noEmitOnErrors: true,
            // 环境变量
            // nodeEnv: 'production'
        }
    })
}

module.exports = config;