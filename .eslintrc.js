module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "extends": "airbnb",
    "plugins": ["react-hooks"],
    "rules": {
    "react/jsx-filename-extension": [1, { extensions: [".js"] }], // 允许js文件使用jsx语法
    "react/prop-types": 1, // 开启PropTypes验证
    "react/forbid-prop-types": 0,
    "react/prefer-stateless-function": 1, // 建议使用函数式组件
    "linebreak-style": 0,
    "react/jsx-one-expression-per-line": 0,
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn", // 检查 effect 的依赖
    'import/no-unresolved': [1, { ignore: ['^@/'] }],
  }
}