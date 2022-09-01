const fs = require('fs')
const url = '00/01/02/03/04'
fs.mkdirSync(url, { recursive: true }, (err) => {
    console.log(err);
})
fs.writeFileSync('./dff.js', 'const user = {name:"mohammad"};', { encoding: 'utf-8' })
fs.appendFileSync('./dff.js', '\nconst user2 = {name:"ali"};', { encoding: 'utf-8' })
// fs.unlinkSync('./dff.js')
console.log(
    fs.existsSync('./dff.js')
);
fs.copyFileSync('./index.js', './0.txt')
fs.readFile('./6b8ff54a016cab7b2000f4b9f940facd2dfce4f3.txt', (err, chunk) => {
    fs.writeFileSync('./xsdsd.mp3', chunk)
})
if (fs.existsSync('./oldFile.txt')
) {
    fs.rename('oldFile.txt', 'newFile.txt', (err) => {
        if (err) throw err;
        console.log('Rename complete!');
    });

}else{
    fs.rename('newFile.txt', 'oldFile.txt', (err) => {
        if (err) throw err;
        console.log('Rename complete!');
    });
}