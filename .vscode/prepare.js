var root = process.argv[2];
var fs = require('fs');
var content = "";

root = root.substring(0,root.length-1);

var _config = fs.readFileSync(root+'/targets.json');
var config = JSON.parse(_config);

console.log("generating build.hxml");

content += fs.readFileSync(root+'/hxml/_build.hxml').toString();
content += "\r\n";
config.forEach(function(element) {
    content += fs.readFileSync(root+'/hxml/'+element+'.hxml').toString();
    content += "\r\n";
});

fs.writeFile(root+'/build.hxml', content, function(err) {
    if (err) throw err;
    console.log("finished.");
});
