import path from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import baseConfig from './webpack.config.base';

export default webpackMerge(baseConfig, {
    devtool: 'source-map',
    module: {
        rules: [{
        /**
         * eslint代码规范校验
         */
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            include: path.join(__dirname, 'src'),
            exclude: path.join(__dirname, 'src/components/companyInfo/companyInfo/relateInfo/map'), // 可以不用定义这个字段的属性值，eslint会自动忽略node_modules和bower_
            use: [{
                loader: 'eslint-loader',
                options: {
                    configFile: '.eslintrc.prod.json'
                }
            }]
        }]
    },
    plugins: [
        new webpack.DefinePlugin({               // 配置全局变量
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: false
        }),
        new webpack.optimize.UglifyJsPlugin({    // 压缩混淆js文件
            sourceMap: true,
            comments: false
        })
    ]
});
