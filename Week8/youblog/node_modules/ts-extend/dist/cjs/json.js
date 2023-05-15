"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExJSONReplace = void 0;
function ExJSONReplace(key, value) {
    // console.warn("ExJSONReplace", key.length, "key:", key, "value:", value)
    if (key.length === 0) {
        return value;
    }
    switch (typeof (value)) {
        case "string":
        case "number":
        case "boolean":
            return value;
        case "object":
            if (Array.isArray(value)) {
                return value;
            }
            else if (value instanceof URL) {
                return value.href;
            }
            else if (value instanceof Date) {
                return value.toISOString();
            }
            else if (Object.keys(value).length !== 0) {
                return value;
            }
            return undefined;
        default:
            return undefined;
    }
}
exports.ExJSONReplace = ExJSONReplace;
//# sourceMappingURL=json.js.map