# mount-plugins

mount-plugins = auto mount express plugins with plugins_folder_path

[![gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]

## Install

    npm install --save mount-plugins

## Usages


```
var express = require('express')
var app = express()

var mount = require('mount-plugins');

// simple
// mount(app);

// with path
// mount(app, 'plugins');

// with path & api dump
// mount(app, 'plugins2', true);


// with path & pre & api dump
mount(app, 'plugins2','app/routes', true);

// start server
app.listen(23018)
```

![](doc/1.png)

## TODO

- [ ] 增加生命周期

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


## 版本历史

- v1.0.0 初始化版本

## 欢迎fork和反馈

- write by `i5ting` shiren1118@126.com

如有建议或意见，请在issue提问或邮件

## License

this repo is released under the [MIT
License](http://www.opensource.org/licenses/MIT).


[npm-image]: https://img.shields.io/npm/v/mount-plugins.svg?style=flat-square
[npm-url]: https://npmjs.org/package/mount-plugins
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/i5ting/mount-plugins?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge