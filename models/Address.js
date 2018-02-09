class Address {
    contructor() {
        this._type = "";
        this._tags = [];
        this.address = "";
    }

    set type(type) {
        this._type = type;
    }

    set tags(tags) {
        this._tags = tags;
    }

    set address(address) {
        this._address = address;
    }

    get type() {
        return this._type;
    }

    get tags() {
        return this._tags;
    }

    get address() {
        return this._address;
    }
}