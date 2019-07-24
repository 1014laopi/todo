const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isDev = process.env.NODE_ENV === 'development';
const ExtractPlugin = require('extract-text-webpack-plugin');

const config = {
    target: 'web',
    entry: path.join(__dirname, './src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-aaa.[ext]'
                        }
                    }
                ]
            },
        ]
    }
}

if (isDev) {
    config.module.rules.push(
        {
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
        },
    );
    config.devtool = "#cheap-module-eval-source-map";
    config.devServer = {
        port: '8001',
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        hot: true
        // open: true
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    config.entry = {
        app: path.join(__dirname, './src/index.js'),
        vendor: ['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js',
    config.module.rules.push(
        {
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
        },
    ),
    config.plugins.push(
        new ExtractPlugin('styles.[hash:8].css'),
        new webaock
    ),
    config.optimization = {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2,
                    // 最小多少字节，文件太小，为了测试，这个参数设置为0，这个值默认30000
                    minSize:0
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
}

module.exports = config;