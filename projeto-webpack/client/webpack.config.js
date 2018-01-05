
const path = require('path'); //Helper para resolver paths
const babiliPlugin = require('babili-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let plugins = [];

plugins.push(new HtmlWebpackPlugin({
    hash: true, //inclui um hash no nome do arquivo para evitar o cashe
    minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true
    },
    filename: 'index.html',
    template: __dirname + "/main.html"
}));

plugins.push(new extractTextPlugin('styles.css'));
/**
 * Este plugin disponibiliza módulos no escopo global do webpack, ficando disponível para todos os módulos.
 */
plugins.push(new webpack.ProvidePlugin({
    '$': 'jquery/dist/jquery.js',
    'jQuery': 'jquery/dist/jquery.js'
}));

/**
 * Este plugin separa o meu código das bibliotecas, juntando-as em um bundle separado.
 */
plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js'
}));

let SERVICE_URL = JSON.stringify('http://localhost:3000');

if (process.env.NODE_ENV == 'production') {
    /**
     * Este plugin optimiza a geração dos módulos, fazendo com que eles carregem mais rápido.
     */
    SERVICE_URL = JSON.stringify('http://endereco-da-sua-api');
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
    plugins.push(new babiliPlugin());
    /* Este plugin processa os arquivos css e usa o CSSNano para minificar o CSS */
    plugins.push(new optimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            discardComments: {
                removeAll: true
            }
        },
        canPrint: true
    }));
}
// Definir valores a serem distribuidos por toda a aplicacao
plugins.push(new webpack.DefinePlugin({
    SERVICE_URL: SERVICE_URL
}))

module.exports = {
    entry: {
        app: './app-src/app.js', // Primeiro módulo que será carregado pela aplicação
        /* Restante da configuração do CommonsChunkPlugin. Note que o atributo vendor tem o mesmo valor definido no name.  */
        vendor: ['jquery', 'bootstrap', 'reflect-metadata'] 
    }, 
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist') // __dorname especifica o diretório atual do módulo (relativo ao webpack.config.js)
        // Depois do html-webpack-plugin não precisamos mais disso.
        //publicPath: 'dist' //configurtação para o webpack-dev-server. Como ele cria o bundle.js em memória na raiz do projeto 
                           //esta configuração garante que ele criará dentro da pasta dist, conforme configurado no meu index.html
    },
    module: {
        rules: [{ 
            /* 
                Processar todos os arquivos que terminam com .js com o módulo babel-loader, ignorando a pasta node_modules. Este modulo carrega as definições
                contidas no arquivo .babelrc
            */
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.css$/,
            use: extractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }, { 
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
            loader: 'url-loader?limit=10000&mimetype=application/font-woff' 
        }, { 
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
            loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
        }, { 
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
            loader: 'file-loader' 
        }, { 
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml' 
        } 
    ]
    },
    plugins
};