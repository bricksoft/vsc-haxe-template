var exec = require('child_process').execFile;
var args = process.argv;

var run =function(runnable){
    try {
        exec(runnable, function(err, data) {
            var exitcode = 0;
            if(err == null){
                console.log("Program successfully ran.");
                console.log(data == null || data == 0? "exit code: 0": "returned: "+data);
            } else {
                exitcode = -1;
                console.log("Program did NOT successfully run.");
                console.log(data == null || data == 0? "exit code: 0\r\n"+data: "error: "+data);
            }
            process.exit(exitcode);
        });  
    }
    catch(err){
        console.log("an unexpected error occured.")
        console.log("type: Exception");
        console.log("details: "+err.message);
        process.exit(-1);
   }
}
var prepare = function(runnable){
    var os = require('os').platform();
    switch (os){
        case 'win32': break;

        default:
        console.log("Non-Windows OS ("+os+") detected.");
        if (runnable.endsWith(".exe")){
            console.log("Trying to run through mono.");
            runnable = "mono "+runnable;
        }
        break;
    }
    return runnable;
}
if (args.length > 2){
    if(args.length >3){
        console.log(args[3]);
        process.exit(-1);
    } else {
        run(prepare(args[2]));
    }
} else {
    console.log("no arguments given! can not run executable!");
    process.exit(-1);
}