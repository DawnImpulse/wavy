var fs = require('fs');
var path = require('path');
var root;

var dirname = process.env.INIT_CWD.replace(/\\/g, '/');
if(dirname.lastIndexOf('/node_modules/') !== -1)
  root = path.resolve(dirname.slice(0, dirname.lastIndexOf('/node_modules/')));
else
  root = dirname;
  
var link = root + '/node_modules/~';
try {
  var existingReal = path.resolve(fs.realpathSync(link));
} catch (e) {
  fs.symlinkSync(root, link, 'junction');
  process.exit(0);
}
if (existingReal && existingReal !== root) {
  throw new Error(link + ' is already being used')
}
