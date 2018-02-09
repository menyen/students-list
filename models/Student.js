class Student {
    constructor(fields) {
        this._fullname = '';
        this._eid = '';
        this._classes = [];
        this._addresses = '';
        this._invisible = false;
        this._see_all = false;
    }

    set fullname(fullname) {
        this._fullname = fullname;
    }

    set eid(eid) {
        this._eid = eid;
    }

    set classes(classes) {
        this._classes = this._classes.concat(_.words(classes, /([A-Za-z0-9 ])+/g)).map(str => str.trim());;
    }

    set addresses(addresses) {
        this._addresses = addresses;
    }

    set invisible(invisible) {
        this._invisible = invisible ? Boolean(invisible) : false;;
    }

    set see_all(see_all) {
        this._see_all = see_all ? Boolean(see_all == 'yes') : false;
    }

    get fullname() {
        return this._fullname;
    }

    get eid() {
        return this._eid;
    }

    get classes() {
        return this._classes;
    }

    get addresses() {
        return this._addresses;
    }

    get invisible() {
        return this._invisible;
    }

    get see_all() {
        return this._see_all;
    }
}