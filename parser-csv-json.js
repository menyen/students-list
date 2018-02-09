const fs = require('fs');
const _ = require('lodash');

const Student = require('./models/Student')();
const Address = require('./models/Address')();
const StudentList = require('./models/StudentList')();

/**
 * Function slipts rows from a CSV file into cells
 * returns an array
 * @param {*} sep 
 */
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

// Reading input
fs.readFile('input.csv', 'utf8', function (err, data) {
    if (err) throw err;
    let lines = data.split('\n');
    let header = lines.shift().splitCSV();
    let result = new StudentList();
    lines.forEach(line => {
        let fields = line.splitCSV();
        let student = new Student();

        //iterate over the header fields because they do not present the risk of being empty
        header.forEach((fieldHeader, index) => {
            let tags = _.words(fieldHeader, /[^, ]+/g);
            if (tags.length > 1) { // => this condition treats Address types
                let type = tags.shift();
                if (type == 'email') { // if there is more than 1 email in a field, breaks it and create an address for each one
                    let emails = _.words(fields[index], /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/g);
                    emails.forEach(email => {
                        Reflect.set(student, 'addresses', new Address(type, tags, email));
                    });
                } else { // adds phone
                    let addressElement = new Address(type, tags, fields[index]);
                    if (addressElement.isValid()) Reflect.set(student, 'addresses', new Address(type, tags, fields[index]));
                }
            } else if (fieldHeader == 'class') { // => since Student object stores 'classes' as plural, it won't find 'class'
                Reflect.set(student, 'classes', fields[index]);
            } else { // => everything else falls here
                Reflect.set(student, fieldHeader, fields[index]);
            }
        });
        result.add(student);
    });

    // writing output
    fs.writeFile('output.json', JSON.stringify(result.list, null, 4), (err) => {  
        if (err) throw err;
    });
});