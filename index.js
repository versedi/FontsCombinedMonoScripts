// read font file
var Font = require('fonteditor-core').Font;
var fs = require('fs');
var buffer = fs.readFileSync('FiraCode/distr/ttf/FiraCode-Medium.ttf');
var scriptsBuffer = fs.readFileSync('fonts/ofl/acme/Acme-Regular.ttf');
// read font data
var font = Font.create(buffer, {
    type: 'ttf', // support ttf,woff,eot,otf,svg
    // subset: [65, 66], // only read `a`, `b` glyf
    hinting: true, // save font hinting
    compound2simple: true, // transform ttf compound glyf to simple
    inflate: null, // inflate function for woff
    combinePath: false, // for svg path
});

var italicScriptsFont = Font.create(scriptsBuffer, {
    type: 'ttf', // support ttf,woff,eot,otf,svg
    // subset: [65, 66], // only read `a`, `b` glyf
    hinting: true, // save font hinting
    compound2simple: true, // transform ttf compound glyf to simple
    inflate: null, // inflate function for woff
    combinePath: false, // for svg path
})
var fontObject = font.get();
var italicScriptsFontObject = font.get();
// console.log(Object.keys(fontObject));
/* => [ 'version',
  'numTables',
  'searchRenge',
  'entrySelector',
  'rengeShift',
  'head',
  'maxp',
  'glyf',
  'cmap',
  'name',
  'hhea',
  'post',
  'OS/2',
  'fpgm',
  'cvt',
  'prep'
]
*/

font.data.name.fontFamily = 'TEST';
font.data.name.fontSubFamily = 'TEST';
font.data.name.fullName = 'TEST';
font.data.name.uniqueSubFamily = '1.207;CTDB;TEST';
font.data.name.postScriptName = 'TEST';


italicScriptsFont.data.name.fontFamily = 'TEST';
italicScriptsFont.data.name.fontSubFamily = 'TEST';
italicScriptsFont.data.name.fullName = 'TEST-Italic';
italicScriptsFont.data.name.uniqueSubFamily = '1.207;CTDB;TEST-Italic';
italicScriptsFont.data.name.postScriptName = 'TEST-Italic';


var buffer = font.write({
    type: 'ttf', // support ttf,woff,eot,otf,svg
    hinting: true, // save font hinting
    deflate: null, // deflate function for woff
});

//
italicScriptsFont.data['OS/2'].sFamilyClass = 0;
italicScriptsFont.data['OS/2'].bFamilyType = 0;
italicScriptsFont.data['OS/2'].bLetterform = 0;
italicScriptsFont.data['OS/2'].achVendID= 'HT  ';
italicScriptsFont.data['OS/2'].fsSelection= 129;
italicScriptsFont.data['OS/2'].usMaxContext = 1;
italicScriptsFont.data['OS/2'].ulCodePageRange1 = 536871327;
var scriptsBuffer = italicScriptsFont.write({
    type: 'ttf', // support ttf,woff,eot,otf,svg
    hinting: true, // save font hinting
    deflate: null, // deflate function for woff
});


console.log(italicScriptsFont.data['OS/2']);

fs.writeFileSync('tests/results/test.ttf', buffer);
fs.writeFileSync('tests/results/test-italic.ttf', scriptsBuffer);


