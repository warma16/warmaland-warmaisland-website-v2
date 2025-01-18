module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: "./",
    // 输出文件目录
  outputDir: "./dist",
    // 静态资源存放的文件夹(相对于ouputDir)
  assetsDir: "assets",
    // eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)
  lintOnSave: false,
    // 我用的only，打包后小些
    // compiler: false,//有
  productionSourceMap: false,
  pluginOptions: {
    // ...
    pwa: {
        iconPaths: {
            favicon32: './favicon.ico',
            favicon16: './favicon.ico',
            appleTouchIcon: './favicon.ico',
            maskIcon: './favicon.ico',
            msTileImage: './favicon.ico'
        }
    },
},
  
}
