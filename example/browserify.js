var fs = require('fs');
var browserify = require('browserify');
//var watchify = require('watchify');

var ignore = [
  //*
  'express',
  'babel-cli',
  'babel-preset-es2015',
  'babel-preset-stage-0',
  'babel-preset-react',
  'browserify',
  'watchify'//*/
];

// Browserify client side app
var inFile = process.argv[2];
//var shouldWatch = process.argv[4] === '--watch';

var b = browserify(inFile/*, {
  cache: {},
  packageCache: {},
  plugin: shouldWatch? [watchify]: null
}*/);
ignore.forEach(function(module) {
  b.ignore(module);
});

// Write file
var outFile = process.argv[3];

var appJsWriteStream = fs.createWriteStream(outFile, { flags : 'w' });
var appJsBundle = b.bundle();
appJsBundle.on('end', function() {
  console.log(inFile, '->', outFile);
});

appJsBundle.pipe(appJsWriteStream);
