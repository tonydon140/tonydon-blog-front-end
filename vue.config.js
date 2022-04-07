const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/bingImg': {
                // 请求的后端服务器地址
                target: 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1',
                // 路径重写，将 '/api' 换为空格
                pathRewrite: {
                    '^/bingImg': ''
                }
            }
        }
    }
})
