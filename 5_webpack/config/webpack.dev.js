/*
    1.该文件是webpack的配置文件，所有的webpack的任务，用到的loader、plugins都要配置在这里
    2.该文件要符合CJS模块化规范（webpack是基于node运行的）
*/

// 引入Node中一个内置的path模块，专门用于解决路径问题
const { resolve } = require('path');

// 引入html-webpack-plugin ，用于加工html文件。注意安装的插件版本。过高会报错
var HtmlWebpackPlugin = require('html-webpack-plugin')

// css相关loader配置
const baseCssLoader = ['style-loader', 'css-loader']
// 使用CJS的模块化规定，暴露一个对象，该对象就是webpack的详细配置对象(规则)
module.exports = {
    mode: 'development',    // 工作模式 "developement"开发模式不注重细节，所以build中只有一个app.js，而css直接嵌入app.js中，而不是再创建一个css文件夹
    entry: './src/js/app.js',  // 入口
    // entry: { peiqi: './src/js/app.js' },  // 入口
    output: {   // 出口(输出)
        path: resolve(__dirname, 'build'),  // 输出文件的路径
        filename: 'js/app.js'  // 输出文件的名字,webpack5里面可以写成'/js/app.js'
    },
    // module.rules中配置一个一个的loader
    module: {
        rules: [
            // 配置解析css
            {
                test: /\.css$/, // 匹配规则，该loader要处理的文件
                use: [
                    // { loader: 'style-loader' },
                    // {loader:'css-loader',options:{}},
                    // 后指定的loader先干活


                    // 'style-loader', // 创建style标签，将js中的样式资源插入进行，添加到head中生效
                    // 'css-loader' //将css文件变成commonjs模块加载js中，里面内容是样式字符串

                    ...baseCssLoader
                ],
            },
            // 配置解析less
            {
                test: /\.less$/,
                use: [
                    // 'style-loader', // 创建style标签，将js中的样式资源插入进行，添加到head中生效
                    // 'css-loader', //将css文件变成commonjs模块加载js中，里面内容是样式字符串
                    ...baseCssLoader,
                    'less-loader'   // 将less
                ]
            },
            // 配置解析字体文件
            {
                // 排除哪些文件
                exclude: /\.(html|less|css|png|jpg|bmp|js|gif|json)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'media', //在output的path下添加路径。此处不加'/'。则生成文件的导入路径会自动修改。不需要添加publicPath:'/build'
                        name: '[hash:5].[ext]' //配置生成图片的名字+后缀。[hash:5]生成5位哈希值，[ext]原来为什么后缀名，现在仍然叫什么后缀名
                    }
                }
                ]
            },
            // 配置解析样式中的图片
            {
                test: /\.(png|jpg|gif|bmp)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        outputPath: 'imgs', //在output的path下添加路径。此处不加'/'。则生成文件的导入路径会自动修改。不需要添加publicPath:'/build'
                        // publicPath: '/5_webpack/build/imgs' // 配置图片引入时前缀路径
                        name: '[hash:5].[ext]', //配置生成图片的名字+后缀。[hash:5]生成5位哈希值，[ext]原来为什么后缀名，现在仍然叫什么后缀名
                        limit: 8 * 1024     // 图片大小，小于8KB时，将图片转为base64编码
                    }
                }
                ]
            },
            // 配置解析html中的图片
            {
                test: /\.(html)$/,
                use: [
                    'html-loader'
                ]
            }
        ],
    },
    // plugins中专门用于配置插件，插件必须经过实例化这一环节
    plugins: [
        // 实例化HtmlWebpackPlugin。
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    devServer: {
        port: 5000,//开启服务器的端口号
        open: true,// 自动打开浏览器
        hot: true   // 开启模块热更新
    }
};