import path from 'path';
import webpack from 'webpack';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const STATIC_PATH = 'static';
const extractMTUI = new ExtractTextPlugin(`${STATIC_PATH}/css/[contenthash].mtui.css`);
const extractStyle = new ExtractTextPlugin(`${STATIC_PATH}/css/[contenthash].style.css`);

export default {
    entry: {
        main: './src/index.jsx',             // 主网站入口
        vendor: ['react', 'react-dom', 'react-router', 'babel-polyfill']
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'build'),
        filename: `${STATIC_PATH}/js/[chunkhash].[name].js`
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, 'src'),
            exclude: path.join(__dirname, 'src/fonts'),
            use: ['babel-loader']
        /**
         * mtui组件的css,scss抽离为独立文件mtui.css
         */
        }, {
            test: /\.(css|scss)$/,
            include: path.join(__dirname, 'node_modules'),
            use: extractMTUI.extract(['css-loader', 'postcss-loader', 'sass-loader'])
        /**
         * 主项目的css合并到style.css
         */
        }, {
            test: /\.(css|scss)$/,
            include: path.join(__dirname, 'src'),
            use: extractStyle.extract(['css-loader', 'postcss-loader', 'sass-loader'])
        /**
         * 字体加载器
         */
        },
        /**
         * 处理json
         */
        // {
        //     test: /\.json$/,
        //     include: [
        //         path.join(__dirname, 'src')
        //     ],
        //     use: [{
        //         loader: 'json-loader'               
        //     }]
        // },
        {
            test: /\.(woff|eot|ttf|js|svg)$/,
            include: path.join(__dirname, 'src/fonts'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10,
                    name: `${STATIC_PATH}/fonts/[hash].[ext]`
                }
            }]
        /**
         * 图片加载器
         */
        }, {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            include: path.join(__dirname, 'src/images'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10,
                    name: `${STATIC_PATH}/images/[hash].[ext]`
                }
            }]          
        }, {
            test: /\.ico$/,
            include: path.join(__dirname, 'src/images'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10,
                    name: `${STATIC_PATH}/images/[name].[ext]`
                }
            }]        
        }]
    },
    plugins: [
        extractMTUI,
        extractStyle,
        new CleanWebpackPlugin(['build']),              // 清除编译目录
        // 提取主页面和魔盒页面共享的公共模块
        new webpack.optimize.CommonsChunkPlugin('vendor'),
        // 主页面入口index.html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/src/data',
                to: `${STATIC_PATH}/data/`,
                toType: 'dir'
            },
            {
                from: __dirname + '/src/libs',
                to: `${STATIC_PATH}/libs`,
                toType: 'dir'
            }
        ]),
        new webpack.LoaderOptionsPlugin({
            minimize: true,                             // 压缩loader读取的文件
            options: {
                postcss: function () {
                    return [precss, autoprefixer];
                }
            }
        })
    ]
};