# webpack 项目脚手架
> 去掉框架层，搭建基础 `webpack` 开发脚手架及项目结构。

## start

```
# 开发模式
$ npm start

# 预发布模式
$ npm test

# 生产模式
$ npm run build
```

## 修改记录

### 2018-7-20

 - 将 `webpack.config.js` 配置划分为 `base`(公共配置), `dev`(开发环境), `pre`(dev & prod), `prod`(生产环境) 模式。
 - 将项目结构划分为：
 ```
 -- component                   // 公共组件
    -- componentA               // 公共组件A
       -- index.js              // 公共组件A js
       -- style.less            // 公共组件A css
       -- template.html         // 公共组件A 模板
 -- service                     // 公共服务
    -- serviceA                 // 公共服务A
       -- index.js              // 公共服务A js
 -- module                      // 模块
    -- moduleA                  // 模块A
       -- component             // 模板A的组件
          -- componentA         // 组件A
             -- index.js        // 组件A js
             -- style.less      // 组件A css
             -- template.html   // 组件A 模板
       -- service               // 模块A的服务
          -- serviceA           // 服务A
             -- index.js        // 服务A js
       index.js                 // 模块A的主控制器
       style.less               // 模块A的主样式
       template.html            // 模块A的主模板
 ```
 - 引入 `optimize-css-assets-webpack-plugin` 压缩css文件
 - 引入 `uglifyjs-webpack-plugin` 压缩js文件
 - 引入 `webpack-merge` 合并webpack配置

## 配置环境说明

### 开发环境

 - 使用 `css-loader` 的 `options.sourceMap = true` 生成css路径易于调试
 - 使用 `devtool: 'cheap-source-map'` 生成webpack的原路径易于调试
 - 不使用代码压缩易于快速编译与调试