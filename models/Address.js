const _ = require('lodash');

// Require `PhoneNumberFormat`.
const PNF = require('google-libphonenumber').PhoneNumberFormat;
 
// Get an instance of `PhoneNumberUtil`.
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

/** 
 * This Address class stores miscellaneous information like email, phone, address etc
 * This class also holds some validations regarding phone and email
*/
class Address {
    constructor(type, tags, address) {
        this._type = type;
        this._tags = tags;
        if(this._type == 'phone') {
            try{
                const number = phoneUtil.parseAndKeepRawInput(address, 'BR');
                if(phoneUtil.isValidNumber(number)){
                    this._address = phoneUtil.format(number, PNF.E164).replace('+', '');
                } else {
                    this._address = '';    
                }
            } catch(err) {
                this._address = '';
            }
        } else {
            var pattern = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/g; 
            this._address = _.words(address, pattern);
        }
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

    isValid() {
        if(this._address == '') return false;
        return true;
    }
}

module.exports = () => {
    return Address;
}