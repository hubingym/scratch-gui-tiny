# scratch-gui-tiny
最近有弄明白scratch-gui的需要，没什么比亲自实现一遍来的效果好，我将从零打造scratch gui代码，并且将步骤记录下来，方便大家学习

为了理清scratch-gui的关键代码，我要将redux相关的代码去掉，我只关注如何实现的，不关注性能提升



### 第一步：

```bash
git clone https://github.com/hubingym/react-mini-framework
```

将文件夹重命名为scratch-gui-tiny

安装依赖: react-intl和scratch依赖

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

