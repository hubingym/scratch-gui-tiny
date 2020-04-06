# scratch-gui-tiny
最近有弄明白scratch-gui的需要，没什么比亲自实现一遍来的效果好，我将从零打造scratch gui代码，并且将步骤记录下来，方便大家学习

为了让大家弄明白scratch-gui的关键代码，我要将redux相关的代码去掉，我只关注如何实现的，不关注性能提升



### 第一步：初始化代码

克隆最基本的代码

```bash
git clone https://github.com/hubingym/react-mini-framework scratch-gui-tiny
```

安装react依赖:

```javascript
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-intl": "2.9.0",
    "react-responsive": "^8.0.3",
```

安装scratch依赖

```javascript
    "scratch-audio": "0.1.0-prerelease.20190925183642",
    "scratch-blocks": "0.1.0-prerelease.1585138708",
    "scratch-l10n": "3.8.20200325112845",
    "scratch-paint": "0.2.0-prerelease.20200213174123",
    "scratch-render": "0.1.0-prerelease.20200228152431",
    "scratch-storage": "1.3.2",
    "scratch-svg-renderer": "0.2.0-prerelease.20200205003400",
    "scratch-vm": "0.2.0-prerelease.20200319175700",
```



### 第二步：基本布局

1) 首先实现menu-bar，那么得先引入IntlProvider，且需要实现最基本的gui.jsx

我遇到的问题，导入css时，无法得到样式的camelCase引入，实在搞不定customize-cra，只好react-scripts eject

2) 左边的Tabs

3) 右上的stage

用到了vm，先定义vm

4) 右下的target-pane



### 第三步：实现多国语言

language-selector

### 第四步：加载空项目

先理清projectState

加载画面: loader

加载项目