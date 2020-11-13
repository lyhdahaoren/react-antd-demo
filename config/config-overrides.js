const {
  override,
  addWebpackPlugin,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addDecoratorsLegacy,
  overrideDevServer,
  addBabelPlugins,
  useEslintRc,
  addWebpackModuleRule,
} = require("customize-cra");

const path = require("path");

// 进度条美化
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

// 打包文件分析工具
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

// dev serve
const devServerConfig = (config) => {
  return {
    ...config,
    proxy: {
      "/api": {
        target: "http://b.dev.example.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  };
};

// 生产环境删除console
let babelPlugins = [];
const { NODE_ENV } = process.env;
switch (NODE_ENV) {
  case "production":
    babelPlugins.push([
      "transform-remove-console",
      { exclude: ["error", "warn"] },
    ]);
    break;
  case "development":
    break;
  default:
    break;
}

module.exports = {
  webpack: override(
    // moduleRule
    addWebpackModuleRule({
      test: /\.svg$/,
      loader: "svg-sprite-loader",
      include: path.resolve(__dirname, "../src/assets/icon"), // 只处理指定svg的文件(所有使用的svg文件放到该文件夹下)
      options: {
        symbolId: "icon-[name]" // symbolId和use使用的名称对应      <use xlinkHref={"#icon-" + iconClass} />
      },
    }),
    // 装饰器
    addDecoratorsLegacy(),
    // 增加webpack插件
    addWebpackPlugin(
      new ProgressBarPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: "disabled", // 不启动展示打包报告的http服务器
        generateStatsFile: true, // 是否生成stats.json文件
      })
    ),
    // 默认路径设置
    addWebpackAlias({
      "@": path.resolve(__dirname, "../src"),
    }),
    // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true, // 自动打包相关的样式 默认为 style:"css"
    }),
    // 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
      },
    }),
    // 添加babel-plugins
    addBabelPlugins(...babelPlugins),
    // 设置eslint
    useEslintRc()
  ),
  devServer: overrideDevServer(devServerConfig),
};
