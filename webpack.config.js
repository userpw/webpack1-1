var path = require('path');  
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // clean-webpack-plugin是一个清除文件的插件。在每次打包后，磁盘空间会存有打包后的资源，在再次打包的时候，我们需要先把本地已有的打包后的资源清空，来减少它们对磁盘空间的占用
// var CopyPlugin = require("copy-webpack-plugin"); // 我们在目录'…src/img/''下放了一张图片，执行npx webpack后观察。我们发现该图片被复制到'…dist/image/'下了
module.exports = {
  entry: './a.js',
  devtool: 'source-map', // 便于源码调试断点
  // entry: ['core-js/stable', 'regenerator-runtime/runtime', './a.js'], // 数组形式的入口  它表示的含义是数组最后一个文件是资源的入口文件，数组其余文件会预先构建到入口文件。
  // entry: {
  //   app: ['core-js/stable', 'regenerator-runtime/runtime', './a.js'],
  //   vendor: './vendor'
  // },
  context: path.resolve(__dirname, './src'), // 没有设置context 表示当前的根目录
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: "/dist/",
    // filename: '[name][hash:8].js' // hash表示特定的动态值 8 表示取hash值前八位  [hash]是根据全部参与打包的文件计算出来的，[chunkhash]是根据当前打包的chunk计算出来的，[contenthash]是CSS文件的
    filename: 'bundle.js',
  },
  devServer: {
    // index: 'index.html',
    // contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true, //Hot module replacement
    port: 8080,
    writeToDisk:true, // 这个选项！！！！
    open: 'chrome' //open in chrome
  },
  module: {
    rules: [{
      // test: /\.css$/,
      use: ['style-loader', 'css-loader', 'less-loader'],  // 处理逻辑从后向前
      resource: {  // 与外面写是等效的
        test: /\.less$/,
        exclude: /node_modules/
      },
      issuer: {  // 如果想指定只有src目录下的JS引用的CSS可以被相应的loader处理，那么可以配置issuer
        test: /\.js$/,
        include: /src/
      }
      // include: /src/,  // 表示只对该匹配到的进行使用loader处理
      // exclude: /node_modules/ // 表示排除
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use:
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, // 通过增加cacheDirectory:true项，开启缓存，在初次打包后再次打包，如果JS文件未发生变化，可以直接使用初次打包后的缓存文件，避免了二次转码，有效提高打包速度
            presets: ['@babel/preset-env']
          }
        }
    },
    // {
    //   test: /\.js$/,  // 表示在所有js文件模块执行之前先执行该loader
    //   use: ['eslint-loader'],
    //   enforce: 'pre',
    //   exclude: /node_modules/,
    // },
    {
      test: /\.jpg$/,
      use: 'file-loader'
    },
    // {
    //   test: /\.(jpg|png)$/,  // 使用base64编码后，引入图片地址是"data:image/jpg;base64,iVBORw0KGgoA…"这种格式的，这样就不用去请求存储在服务器上的图片了，而是使用图片资源的base64编码。
    //   use: {
    //     loader: 'url-loader',
    //     options: {
    //       limit: 1024 * 8,
    //     }
    //   }
    // }
  ]
  },
  plugins:[
    new CleanWebpackPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     { from: path.resolve(__dirname, 'src/img/'), to: path.resolve(__dirname, 'dist/image/') },
    //   ],
    // })
  ],
  mode: 'none'
};