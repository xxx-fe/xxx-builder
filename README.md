# xxx-builder

## 安装
```shell
npm i
npm i gulp -g
```

## 开发模式
```shell
npm run dev
```

## 构建模式
```shell
npm run build
```

## config.json 配置
```js
{
    "path":{//目录
        "src": "src",//源码目录
        "debug": "debug",//调试代码目录
        "dist": "dist" //生产代码目录
    },
    "appJsPath":"app", //业务js目录  相对于源码目录
    "htmlViews": "../html", //模板输出目录
    "mapPath": "../html/map" //map 文件输出
}
```
