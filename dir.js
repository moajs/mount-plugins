var dirw = require('dirw');
var fs   = require('fs');
var path = 'plugins';

dirw.dir(path, function(dir_path, dir_name){
  if(dir_name == 'bin' || dir_name == '.bin'){
    return;
  }
  
  console.log(dir_path);
  console.log(dir_name);
  
  var _path = dir_path + '/app/routes'
  if (fs.existsSync(_path)) {
    console.log("  - " + _path);
  }
  
});