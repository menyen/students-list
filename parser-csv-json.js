var fs = require('fs');
var _ = require('lodash');
// Require `PhoneNumberFormat`.
const PNF = require('google-libphonenumber').PhoneNumberFormat;
 
// Get an instance of `PhoneNumberUtil`.
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
 
 

String.prototype.splitCSV = function (sep) {
    for (var foo = this.split(sep = sep || ","), x = foo.length - 1, tl; x >= 0; x--) {
        if (foo[x].replace(/"\s+$/, '"').charAt(foo[x].length - 1) == '"') {
            if ((tl = foo[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
                foo[x] = foo[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
            } else if (x) {
                foo.splice(x - 1, 2, [foo[x - 1], foo[x]].join(sep));
            } else foo = foo.shift().split(sep).concat(foo);
        } else foo[x].replace(/""/g, '"');
    } return foo;
}

fs.readFile('input.csv', 'utf8', function (err, data) {
    if (err) throw err;
    var lines = data.split('\n');
    var header = lines.shift().splitCSV();
    var result = [];
    lines.forEach(line => {
        var cells = line.splitCSV();
        var obj = {"fullname": "", "eid": "", "classes": [], "addresses": [], "invisible": false, "see_all": false};
        header.forEach((columnHeader, index) => {
            headerAndTags = _.words(columnHeader);
            if(headerAndTags.length > 1){
                var type = headerAndTags.shift();
                var addressValue = cells[index];
                
                var addressElement = {"type": type, "tags": headerAndTags, "address": addressValue};
                obj.addresses.push(addressElement);
            } else if(columnHeader == 'class') {
                obj.classes = obj.classes.concat(_.words(cells[index], /([A-Za-z0-9 ])+/g));
            } else if(columnHeader == 'invisible'){
                obj[columnHeader] = Boolean(cells[index]);
            } else if(columnHeader == 'see_all'){
                obj[columnHeader] = Boolean(cells[index] == 'yes');
            } else if(cells[index] != ''){
                obj[columnHeader] = cells[index];
            }
        });
        //console.log(element.splitCSV());
        result.push(obj);
    });
    console.log(JSON.stringify(result));
});