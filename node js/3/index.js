const path = require('path')

console.log(__dirname);
console.log(__filename);
console.log(path.basename(__dirname));
console.log(path.basename(__filename));
console.log(path.extname(__dirname));
console.log(path.extname(__filename));
console.log(path.parse(__dirname));
console.log(path.parse(__filename));
const fileDetail = {
    root: 'C:\\',
    dir: 'C:\\Users\\Asus\\Desktop\\node js\\3',
    base: 'index.js',
    ext: '.js',
    name: 'index'
  }
console.log(path.format(fileDetail));
console.log(path.join('test','mmd','ali','s'));
