// read font file
var Font = require('fonteditor-core').Font;
var fs = require('fs');
var outputDir = './fonts-combined';

createDir(outputDir);

function createDir(name) {
    var dir = './' + name;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}



var combinations = require('./fonts-combinations');
var fontsCombinations = combinations.get();
const fontOptions = {
    type: 'ttf', // support ttf,woff,eot,otf,svg
    // subset: [65, 66], // only read `a`, `b` glyf
    hinting: true, // save font hinting
    compound2simple: true, // transform ttf compound glyf to simple
    inflate: null, // inflate function for woff
    combinePath: false, // for svg path
};
console.log(fontsCombinations);

function updateItalic(italicFont) {
    italicFont.data['OS/2'].sFamilyClass = 0;
    italicFont.data['OS/2'].bFamilyType = 0;
    italicFont.data['OS/2'].bLetterform = 0;
    italicFont.data['OS/2'].achVendID= 'HT  ';
    italicFont.data['OS/2'].fsSelection= 129;
    italicFont.data['OS/2'].usMaxContext = 1;
    italicFont.data['OS/2'].ulCodePageRange1 = 536871327;

    return italicFont;
}

function updateFontData(font, newName) {
    var oldFontFamily = font.data.name.fontFamily;
    font.data.name.fontFamily = newName;
    font.data.name.fontSubFamily = newName;
    font.data.name.fullName = newName;
    font.data.name.uniqueSubFamily = '0.01 ' + newName;
    font.data.name.postScriptName = newName;

    return font;
}

fontsCombinations.forEach(function(comb){
    console.log(comb);
    let combinedFontName = comb.regular + '-' + comb.italic;
    createDir('./fonts-combined/' +  combinedFontName);

    var buffer = fs.readFileSync('FiraCode/distr/ttf/' + comb.regular + '.ttf');
    var italicBuffer = fs.readFileSync(comb.dir + comb.italic + '.ttf');
    var boldBuffer = fs.readFileSync('FiraCode/distr/ttf/' + comb.bold + '.ttf');
    var regularFont = Font.create(buffer, fontOptions );
    var italicFont = Font.create(italicBuffer, fontOptions);
    var boldFont = Font.create(boldBuffer, fontOptions);

    regularFont = updateFontData(regularFont, combinedFontName);
    italicFont = updateFontData(italicFont, combinedFontName + '-Italic');
    boldFont = updateFontData(boldFont, combinedFontName + '-Bold');

    italicFont = updateItalic(italicFont);

    fs.writeFileSync( 'fonts-combined/' + combinedFontName + '/' + combinedFontName + '.ttf', buffer);
    fs.writeFileSync('fonts-combined/' + combinedFontName + '/' + combinedFontName + '-Italic.ttf', italicBuffer);
    fs.writeFileSync('fonts-combined/' + combinedFontName + '/' + combinedFontName + '-Bold.ttf', boldBuffer);

});

