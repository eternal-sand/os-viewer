const createWebpackCfg = require('./create.webpack.config');
module.exports = createWebpackCfg({
  projectAbsolutePath : __dirname,
  needAnalyzer = false, // 是否需要分析包
  isProduction = false, // 是否生产环境
  tinifyApiKey = '' //svg 压缩ApiKey
});
