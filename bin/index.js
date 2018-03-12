#! /usr/bin/env node

if(!process.argv[2]) {
    console.log("\n------------------------------------------------------");
    console.log("ERROR: Please specify an input file. i.e. document.txt");
    console.log("------------------------------------------------------\n");
    return -1;
}

if(!process.argv[3]) {
    console.log("\n--------------------------------------------------");
    console.log("ERROR: Please specify an output file. i.e. out.txt");
    console.log("--------------------------------------------------\n");
    return -1;
}

if(!process.argv[4]) {
    console.log("\n--------------------------------------------------");
    console.log("No delimiter specified - using default newline '\\n'");
    console.log("--------------------------------------------------\n");
}

var path = require('path');
var fs = require('fs');
var regexp = /([@])\w+/g;
var in_file = path.join(__dirname, process.argv[2]);
var out_file = path.join(__dirname, process.argv[3]);
var delimiter = (process.argv[4] != null) ? process.argv[4] : "\n";
var twitter_data = [];

fs.readFile(in_file, (err, data) => {
    if(!err) {
        twitter_data =  data.toString().match(regexp);
        twitter_data.forEach((value,index) =>{
            twitter_data[index] = value + delimiter;
            twitter_data[index] = twitter_data[index].trim(',');
        });
        console.log("writing results to: " + out_file);
        fs.writeFile(out_file, twitter_data);
    } else {
        console.log("error: " + err);
    }
});
