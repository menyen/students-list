const fs = require('fs');
const _ = require('lodash');

const Student = require('./models/Student')();
const Address = require('./models/Address')();
const StudentList = require('./models/StudentList')();

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
    let lines = data.split('\n');
    let header = lines.shift().splitCSV();
    let result = new StudentList();
    lines.forEach(line => {
        let fields = line.splitCSV();
        let student = new Student();
        header.forEach((fieldHeader, index) => {
            let tags = _.words(fieldHeader, /[^, ]+/g);
            if (tags.length > 1) {
                let type = tags.shift();
                if (type == 'email') {
                    let emails = _.words(fields[index], /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/g);
                    emails.forEach(email => {
                        let addressElement = new Address(type, tags, email);
                        Reflect.set(student, 'addresses', addressElement);
                    });
                } else {
                    let addressElement = new Address(type, tags, fields[index]);
                    if (addressElement.isValid()) Reflect.set(student, 'addresses', addressElement);
                }
            } else if (fieldHeader == 'class') {
                Reflect.set(student, 'classes', fields[index]);
            } else {
                Reflect.set(student, fieldHeader, fields[index]);
            }
        });
        result.add(student);
    });

    fs.writeFile('output.json', JSON.stringify(result.list, null, 4), (err) => {  
        if (err) throw err;
    });
});