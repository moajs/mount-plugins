var fs     = require('fs');
var requireDirectory = require('require-directory');
// var routes = requireDirectory(module, './routes');

var stack = [];
/**
 * Mount routes with directory.
 *
 * Examples:
 *
 *     // mount routes in app.js
 *     require('./config/routes')(app);
 *
 * @param {Object} app
 * @param {Object} routes
 * @param {String} pre
 * @return 
 * @api public
 */
function mount(app) {
  var r = arguments[1];
  var pre = arguments[2] || '';
  
  // console.log(r);
  
  for (var k in r) {
    var file = '/' + pre + '' + k + '.js';
    // console.log(r[k] + 'mount route ' + file + " ");
    var path = '';
    if(typeof r[k] == 'object') {
      // console.log('this is a obj');
      mount(app, r[k], pre + k + '/');
    }else if(k === 'index') {
      path = '/'+ pre;
      _use(app, file, path, r[k]);
    }else {
      path = '/' + pre + '' + k;
      _use(app, file, path, r[k]);
    }
  }
}

function _use(app, file, path, handler) {
  // console.log('path = ' + path)
  // console.dir(handler)
  // console.log(handler.stack)
  app.use(path, handler);
  
  _track_routes(file, path, handler.stack);
}

function _track_routes(file, path, handle) {
  for(var i in handle){
    var _route = handle[i].route;
    // console.log(_route);
    // console.log(_route.stack);
    // console.log(_route.methods);
    var params = _route.stack.params;
    
    for(var j in _route.methods){
      if(_route.path == '/'){
        _cache_to_stack(file, path, j);
      }else{
        _cache_to_stack(file, path + _route.path, j);
      }
    }
  }
}

function _cache_to_stack(file, path, method) {
  // console.log(file+ ' ' +method + ' ' + path)
  stack.push({
    file    : file,
    method  : method,
    path    : path
  });
}

function _dump(routes_folder_path) {
  var Table = require('cli-table');
  var table = new Table({ head: ["File", "Method", "Path"] });

  // console.log(stack)
  console.log('\n******************************************************');
  console.log('\t\tMoaJS Plugins Mount 【' + routes_folder_path + '】');
  console.log('******************************************************\n');
  
  for (var k in stack) {
    var obj = stack[k];
    // console.log(obj.file + obj.method + obj.path)
    table.push(
        [routes_folder_path + obj.file, obj.method, obj.path]
    );
  }

  console.log(table.toString());
}

/**
 * Mount routes with directory.
 *
 * Examples:
 *
 *     // mount routes in app.js
 *     mount(app, 'plugins2', true);
 *
 * @param {Object} app
 * @param {String} routes_folder_path
 * @param {Boolean} is_debug
 * @return 
 * @api public
 */
function mount_with_folder(app, routes_folder_path) {
  stack = [];// empty when enter
  
  var r         = arguments[1] || './plugins';
  var is_debug  = arguments[2] || false;
  
  console.log('mount plugins_folder_path = ' + r)
  
  mount_plugins(app, r, is_debug);
}

var dirw = require('dirw');
var fs   = require('fs');
var path = 'plugins';

function mount_plugins (app, routes_folder_path, is_debug) {
  stack = [];// empty when enter

  dirw.dir(routes_folder_path, function(dir_path, dir_name){
    if(dir_name == 'bin' || dir_name == '.bin'){
      return;
    }
  
    // console.log(dir_path);
    // console.log(dir_name);
  
    var _path = dir_path + '/app/routes'
    if (fs.existsSync(_path)) {
      // console.log("  - " + _path);
      
      // console.log('mount plugins_folder_path = ' + _path)
      var routes = requireDirectory(module, _path);
  
      // console.log(routes);
      mount(app, routes, dir_name+ '/') ;
  
      if(is_debug){
        _dump (dir_name);
      }    
      // console.log('exist')
    }else{
      console.log('not exist')
    }
  
  });
}

module.exports = mount_with_folder;