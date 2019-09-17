const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const merge = require('webpack-merge');
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';
const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin({
      template: path.join(__dirname, './template.html')
    })
];
const devServer = {
    port: '8001',
    host: '0.0.0.0',
    overlay: {
        errors: true
    },
    hot: true,
    // open: true
    historyApiFallback: {
      index: '/index.html'
    }
};
let config;

if (isDev) {
    config = merge(baseConfig, {
        devtool: "#cheap-module-eval-source-map",
        module: {
            rules: [{
                test: /\.styl/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    // {
                    //     loader: 'css-loader',
                    //     // options: {
                    //     //     modules: true,
                    //     //     localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
                    //     // }
                    //     options: {
                    //         modules: true,
                    //         camelCase: true
                    //         // localIdentName: '[local]_[hash:base64:8]'
                    //     }
                    // },
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
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            // new webpack.NoEmitOnErrorsPlugin()
        ])
    });
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../client/index.js'),
            // vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [{
                test: /\.styl/,
                use: ExtractPlugin.extract({
                    fallback: 'vue-style-loader',
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
        plugins: defaultPlugins.concat([
            new ExtractPlugin('styles.[hash:8].css')
        ]),
        optimization: {
            splitChunks: {
                chunks: 'all'
            },
            // runtime缓存单独打包
            runtimeChunk: true
            // 设置跳过编译时报错
            // noEmitOnErrors: true,
            // 环境变量
            // nodeEnv: 'production'
        }
    })
}

module.exports = config;
