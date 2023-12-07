const defaultsDeep = require('lodash.defaultsdeep');
var path = require('path');
var webpack = require('webpack');

// Plugins
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var SidekickGenerateServiceWorkerPlugin = require('./src/playground/generate-service-worker-plugin');
// var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// PostCss
var autoprefixer = require('autoprefixer');
var postcssVars = require('postcss-simple-vars');
var postcssImport = require('postcss-import');

const STATIC_PATH = process.env.STATIC_PATH || '/static';

let root = process.env.ROOT || '';
if (root.length > 0 && !root.endsWith('/')) {
    throw new Error('If ROOT is defined, it must have a trailing slash.');
}

const htmlWebpackPluginCommon = {
    root: root,
    meta: JSON.parse(process.env.EXTRA_META || '{}')
};

const base = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: process.env.SOURCEMAP ? process.env.SOURCEMAP : process.env.NODE_ENV === 'production' ? false : 'cheap-module-source-map',
    devServer: {
        compress: true,
        contentBase: path.resolve(__dirname, 'build'),
        host: '0.0.0.0',
        port: process.env.PORT || 8601,
        historyApiFallback: {
            // Code to make 'ROUTING_STYLE=wildcard' operate as intended.
            rewrites: [
                {from: /^\/\d+\/?$/, to: '/index.html'},
                {from: /^\/\d+\/fullscreen\/?$/, to: '/fullscreen.html'},
                {from: /^\/\d+\/editor\/?$/, to: '/editor.html'},
                {from: /^\/\d+\/embed\/?$/, to: '/embed.html'},
                {from: /^\/addons\/?$/, to: '/addons.html'}
            ]
        }
        // ,
        // host: '0.0.0.0',
        // port: process.env.PORT || 8601,
    },
    output: {
        library: 'GUI',
        filename: process.env.NODE_ENV === 'production' ? 'js/[name].js' : 'js/[name].js',
        chunkFilename: process.env.NODE_ENV === 'production' ? 'js/[name].js' : 'js/[name].js',
        // filename: process.env.NODE_ENV === 'production' ? 'js/[name].[contenthash].js' : 'js/[name].js',
        // chunkFilename: process.env.NODE_ENV === 'production' ? 'js/[name].[contenthash].js' : 'js/[name].js',
        publicPath: root
    },
    resolve: {
        symlinks: false,
        alias: {
            'text-encoding$': path.resolve(__dirname, 'src/lib/sidekick-text-encoder'),
            'scratch-render-fonts$': path.resolve(__dirname, 'src/lib/sidekick-scratch-render-fonts')
        }
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: [
                path.resolve(__dirname, 'src'),
                /node_modules[\\/]scratch-[^\\/]+[\\/]src/,
                /node_modules[\\/]pify/,
                /node_modules[\\/]@vernier[\\/]godirect/
            ],
            options: {
                // In order to not catch config in lower dependencies:
                // Set 'babelrc' to false.
                babelrc: false,
                plugins: [
                    // '@babel/plugin-syntax-dynamic-import',
                    // '@babel/plugin-transform-async-to-generator',
                    // '@babel/plugin-proposal-object-rest-spread',
                    ['react-intl', {
                        messagesDir: './translations/messages/'
                    }]],
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        },
        {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    camelCase: true
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: function () {
                        return [
                            postcssImport,
                            postcssVars,
                            autoprefixer
                        ];
                    }
                }
            }]
        },
        {
            test: /\.node$/,
            loader: 'file-loader',
            // include: path.resolve(__dirname, 'src')
            // options: {
            //     outputPath: 'static/',
            //     // Emit file from the context directory into the output directory;
            //     // retaining the full directory structure:
            //     // (https://v4.webpack.js.org/loaders/file-loader/)
            //     // name: "[path][name].[ext]",
            //     name: '[name].[ext]'
            // }
            options: {
                outputPath: 'static/',
                publicPath: `${STATIC_PATH}/`
            }
        }]
    },
    // optimization: {
    //     minimizer: [
    //         new UglifyJsPlugin({
    //             include: /\.min\.js$/
    //         })
    //     ]
    // },
    plugins: []
};

// const htmlWebpackPluginCommon = {
//     root: root,
//     meta: JSON.parse(process.env.EXTRA_META || '{}')
// };

if (!process.env.CI) {
    base.plugins.push(new webpack.ProgressPlugin());
}

module.exports = [
    // to run editor examples
    defaultsDeep({}, base, {
        entry: {
            // 'lib.min': ['react', 'react-dom'],
            // 'gui': './src/playground/index.jsx',
            // 'blocksonly': './src/playground/blocks-only.jsx',
            // 'compatibilitytesting': './src/playground/compatibility-testing.jsx',
            // 'player': './src/playground/player.jsx'
            'addon-settings': './src/playground/addon-settings.jsx',
            'credits': './src/playground/credits/credits.jsx',
            'editor': './src/playground/editor.jsx',
            'embed': './src/playground/embed.jsx',
            'fullscreen': './src/playground/fullscreen.jsx',
            'player': './src/playground/player.jsx'
            // ,
            // 'credits': './src/playground/credits/credits.jsx'
        },
        output: {
            path: path.resolve(__dirname, 'build')
            // filename: '[name].js'
        },
        module: {
            rules: base.module.rules.concat([
                {
                    test: /\.(svg|png|wav|mp3|gif|jpg|otf|ttf)$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'static/assets/'
                    }
                }
            ])
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                minChunks: 2,
                minSize: 50000,
                maxInitialRequests: 5
                // name: 'lib.min'
            }
            // ,
            // runtimeChunk: {
            //     name: 'lib.min'
            // }
        },
        plugins: base.plugins.concat([
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"',
                'process.env.DEBUG': Boolean(process.env.DEBUG),
                // 'process.env.GA_ID': '"' + (process.env.GA_ID || 'UA-000000-01') + '"'
                'process.env.ANNOUNCEMENT': JSON.stringify(process.env.ANNOUNCEMENT || ''),
                // !!! Is 'ENABLE_SERVICE_WORKER' still needed (/ remove it)? ???
                'process.env.ENABLE_SERVICE_WORKER': JSON.stringify(process.env.ENABLE_SERVICE_WORKER || ''),
                'process.env.ROOT': JSON.stringify(root),
                'process.env.ROUTING_STYLE': JSON.stringify(process.env.ROUTING_STYLE || 'filehash')
            }),
            new HtmlWebpackPlugin({
                // chunks: ['lib.min', 'gui'],
                chunks: ['editor'],
                template: 'src/playground/index.ejs',
                filename: 'editor.html',
                title: 'Scratch 3.0 GUI',
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                // chunks: ['lib.min', 'blocksonly'],
                chunks: ['player'],
                template: 'src/playground/index.ejs',
                filename: 'index.html',
                title: 'Scratch 3.0 GUI: Player',
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                // chunks: ['lib.min', 'compatibilitytesting'],
                chunks: ['fullscreen'],
                template: 'src/playground/index.ejs',
                filename: 'fullscreen.html',
                title: 'Scratch 3.0 GUI: Fullscreen',
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                // chunks: ['lib.min', 'player'],
                chunks: ['embed'],
                template: 'src/playground/index.ejs',
                filename: 'embed.html',
                title: 'Scratch 3.0 GUI: Embedded',
                noTheme: true,
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                // chunks: ['lib.min', 'player'],
                chunks: ['addon-settings'],
                template: 'src/playground/simple.ejs',
                filename: 'addons.html',
                title: 'Scratch 3.0 GUI: Settings Addons',
                ...htmlWebpackPluginCommon
            }),
            new HtmlWebpackPlugin({
                // chunks: ['lib.min', 'player'],
                chunks: ['credits'],
                template: 'src/playground/simple.ejs',
                filename: 'credits.html',
                title: 'Scratch 3.0 GUI: Credits',
                noSplash: true,
                ...htmlWebpackPluginCommon
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'static',
                        // !!! ???
                        // to: 'static'
                        to: ''
                    }
                ]
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'node_modules/scratch-blocks/media',
                        to: 'static/blocks-media'
                    }
                ]
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'extensions/**',
                        to: 'static',
                        context: 'src/examples'
                    }
                ]
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'node_modules/scratch-vm/src/',
                        // !!! ???
                        // to: 'static'
                        to: ''
                    }
                ]
            }),
            // new CopyWebpackPlugin({
            //     patterns: [
            //         {
            //             from: 'extension-worker.{js,js.map}',
            //             context: 'node_modules/scratch-vm/dist/web',
            //             // ???
            //             noErrorOnMissing: true
            //         }
            //     ]
            // })
            new SidekickGenerateServiceWorkerPlugin()
        ])
    })
].concat(
    process.env.NODE_ENV === 'production' || process.env.BUILD_MODE === 'dist' ? (
        // export as library
        defaultsDeep({}, base, {
            target: 'web',
            entry: {
                'scratch-gui': './src/index.js'
            },
            output: {
                libraryTarget: 'umd',
                path: path.resolve('dist'),
                // publicPath: `${STATIC_PATH}/`,
                filename: 'js/[name].js',
                chunkFilename: 'js/[name].js'
                // ,
            },
            externals: {
                'react': 'react',
                'react-dom': 'react-dom'
            },
            module: {
                rules: base.module.rules.concat([
                    {
                        test: /\.(svg|png|wav|mp3|gif|jpg|otf|ttf)$/,
                        loader: 'file-loader',
                        options: {
                            outputPath: 'static/assets/',
                            publicPath: `${STATIC_PATH}/assets/`
                        }
                    }
                ])
            },
            plugins: base.plugins.concat([
                new CopyWebpackPlugin({
                    patterns: [
                        {
                            from: 'node_modules/scratch-blocks/media',
                            to: 'static/blocks-media'
                        }
                    ]
                }),
                // new CopyWebpackPlugin({
                //     patterns: [
                //         {
                //             from: 'extension-worker.{js,js.map}',
                //             context: 'node_modules/scratch-vm/dist/web',
                //             // ???
                //             noErrorOnMissing: true
                //         }
                //     ]
                // }),
                // Include library JSON files for scratch-desktop to use for downloading
                new CopyWebpackPlugin({
                    patterns: [
                        {
                            from: 'src/lib/libraries/*.json',
                            to: 'libraries',
                            flatten: true
                        }
                    ]
                })
                // ,
                // // Include gpiolib.node file for the gpio extension's functionality.
                // new CopyWebpackPlugin({
                //     patterns: [
                //         {
                //             from: 'node_modules/scratch-vm/dist/static',
                //             to: 'static'
                //             // ,
                //             // flatten: true
                //         }
                //     ]
                // })
            ])
        })) : []
);
