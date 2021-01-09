"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DateException extends Error {
    constructor() {
        super('Date is not valid');
    }
    static checkDate(date) {
        const reg = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
        return (!reg.test(date.toLowerCase().trim()));
    }
    static checkDateTime(date) {
        const reg = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        return (!reg.test(date.toLowerCase().trim()));
    }
}
exports.default = DateException;
