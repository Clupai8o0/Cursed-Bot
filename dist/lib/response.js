"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function response(success, message, data) {
    return {
        success,
        message,
        data: data || null,
    };
}
exports.default = response;
