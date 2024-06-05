"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseCookie(cookie) {
    if (!cookie) {
        return {};
    }
    let cookies = cookie.split(";");
    let cookiez = cookies.reduce((acc, cur) => {
        return Object.assign(Object.assign({}, acc), { [cur.split("=")[0].trim()]: cur.split("=")[1].trim() });
    }, {});
    return cookiez;
}
exports.default = parseCookie;
