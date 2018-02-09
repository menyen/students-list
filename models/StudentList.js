class StudentList {
    constructor() {
        this._list = [];
    }

    get list() {
        return this._list;
    }

    add(student) {
        let index = this._indexOf(student);
        if(index > -1) {
            this._list[index].classes.push(...student.classes);
            this._list[index].addresses.push(...student.addresses);
            if(this._list[index].invisible == false) this._list[index].invisible = student.invisible;
            if(this._list[index].see_all == false) this._list[index].see_all = student.see_all;
        } else {
            this._list.push(student);
        }
    }

    _indexOf(student) {
        var index = -1;
        this._list.forEach((element, i) => {
            if(element.eid == student.eid) index = i;
        });
        return index;
    }
}

module.exports = () => {
    return StudentList;
}