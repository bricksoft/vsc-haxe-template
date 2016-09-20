var root = process.argv[2];
var fs = require('fs');
var content = "";

root = root.replace(/\s*$/,"");

var _config = fs.readFileSync(root+'/targets.json');
var config = JSON.parse(_config);

console.log("generating build.hxml");

content += fs.readFileSync(root+'/hxml/_build.hxml').toString();
content += "\r\n";
var hasNext = false;
for(var i = 0; i < config.length; i++){
    var t =  fs.readFileSync(root+'/hxml/'+config[i]+'.hxml').toString();
    if(t){
        content += t;
        if(config[i+1]){
            content += "\r\n--next\r\n";
        }
    }
}

fs.writeFile(root+'/build.hxml', content, function(err) {
    if (err) throw err;
    console.log("build.hxml generated successfully.");
});
