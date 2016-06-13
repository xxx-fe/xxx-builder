/*
 *@description webpack map构建插件
*/

const merge = require('lodash.merge');
const Path  = require('path');


/*
 *@description 获取文件类型
*/
function getFileType(file){
    return Path.extname(file);
}

class MapWebpackPlugin{
    constructor(options){
        this.options = merge({}, {
          path: '.',
          filename: 'webpack-map.json'
        }, options);
    }

    apply(compiler){
        //
        var _self = this;

        compiler.plugin('after-emit', function (compilation, callback) {
            var options = compiler.options;
            var stats = compilation.getStats().toJson({
                hash: true,
                publicPath: true,
                assets: true,
                chunks: false,
                modules: false,
                source: false,
                errorDetails: false,
                timings: false
            });
            var sPath = stats.publicPath ;
            var assetsByChunkName = stats.assetsByChunkName;
            var assetsArr = stats.assets;
            var hash = stats.hash;
            var mapJson = {
                js: {},
                css: {},
                other: {}
            };

            assetsArr.map((item)=>{
                var _name = item.name;
                var _nameObj = Path.parse(_name);
                var _ext = _nameObj.ext;
                var _type = 'other';

                if(/.*\.[a-z\d]+$/.test(_name)){
                    _name =  _nameObj.name.split('.')[0]+_ext;
                }


                if(_ext==='.js' || _ext === '.css'){
                    //
                    _type = _ext.replace('.','');
                }

                //过滤map 文件
                if(_ext != '.map'){
                    mapJson[_type][_name] = item.name;
                }

                //console.log(_nameObj);
            });

            // Object.keys(assetsByChunkName).map((item)=>{
            //     var obj = assetsByChunkName[item];
            //     console.log(obj,item);
            // });



            //var asset
            //console.log(stats.chunks);
            //console.log(assetsByChunkName);
            //console.log(stats.assets);

            console.log(mapJson);

            callback();
        });

    }
}
module.exports = MapWebpackPlugin;
