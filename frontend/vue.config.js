module.exports = {
  // Publicação de produção
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  
  // Configurações diversas
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL || 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },

  // Configurações para o Webpack
  configureWebpack: {
    performance: {
      hints: false
    }
  },

  // Otimizações para produção
  chainWebpack: config => {
    config.optimization.minimizer('terser').tap(args => {
      const { terserOptions } = args[0];
      terserOptions.compress.drop_console = true;
      return args;
    });
  }
} 