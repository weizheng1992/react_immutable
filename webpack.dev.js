const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack =require('webpack')
module.exports = merge(common,{
    mode: 'development',
    devtool:'cheap-module-eval-source-map',
    cache: true, 
    devServer:{
        contentBase: path.resolve(__dirname, "./dist"),
        compress: true,
        port: 9009,
        hot:true,
        host: "0.0.0.0",
        overlay:{
            errors:true, 
        },
        proxy: {
            "/species": {
                // target: "http://10.90.22.162:9009",
                target: "http://species.ehealcare.com",
                // target: "http://10.90.50.108:9009",
                secure: false,
                changeOrigin: true,
                'pathRewrite':{'^/species':"/species"}
            }
        },
        disableHostCheck:true

    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        })
    ]
})