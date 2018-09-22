---
title: This is a test page
seti: default
date: 2018-09-21 14:23:00
---
# Welcome 欢迎

中文测试，您好世界！
林贝大法好
Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

> This is from hexo

## Letax 测试

$$
\begin{aligned}
f_Y(y) & = f_X[h(y)]|h'(y)| \\[2ex]
& = f_X[h(y)]h'(y) \\[2ex]
& = \frac{1}{\theta}e^{-\frac{x}{\theta}}[\frac{dx}{dy}(-\frac{\theta}{ln(1-y)})] \\[2ex]
& = \frac{1}{\theta}e^{-\frac{-\frac{\theta}{ln(1-y)}}{\theta}}\frac{\theta}{1-y} \\[2ex]
& = \frac{1}{\theta}e^{ln(1-y)}\frac{\theta}{1-y} \\[2ex]
& = \frac{1-y}{\theta}\frac{\theta}{1-y} \\[2ex]
& = 1
\end{aligned}
$$

## Quick Start

### Create a new post

```javascript
 let container = document.querySelector('.article');
      this.ps = new PerfectScrollbar(container);
      container.addEventListener('ps-scroll-y', this.onScroll);

      PubSub.subscribe(ANCHOR_SCROLL, (msg, data) => {
        let target = [].slice.call(document.querySelectorAll('.header-anchor')).find((item) => {
          return item.hash === '#' + encodeURIComponent(data);
        });
        if (target) {
          container.scrollTop = Math.max(
            document.body.scrollTop,
            target.parentElement.offsetTop - 10
          );
        }
      });

      this.renderComment();
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

### test for images

![sadasda](~@img/favicon.jpg)

More info: [Deployment](https://hexo.io/docs/deployment.html)
