module.exports = {
    publicPath: "/",
    lintOnSave: false,
    configureWebpack: {
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 20000,
            },
        },
    },

    chainWebpack(webpackConfig) {
        // webpackConfig.optimization.splitChunks(false).minimize(false);
        webpackConfig.plugin("html").tap((args) => {
            const [options] = args;
            options.isDev =
                process.env.NODE_ENV === "development" ||
                process.env.NODE_ENV === "test";
            return args;
        });
    },
};