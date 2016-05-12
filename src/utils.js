/** Test if a variable is a function
 * @param { * } variable to test
 */
function isFunction(value) {
    return typeof value === "function";
}

/** Test if a variable is initalized.
 * @param { * } variable to test
 * @see {@link isEmpty} for check if a variable is empty.
 * @see {@link isNull} for check if a variable is void.
 */
function isInitialized(value) {
    return typeof value !== "undefined";
}

/** Test if a variable is void
 * @param { * } variable to test
 * @see {@link isEmpty} for check if a variable is empty.
 * @see {@link isInitialized} for check if a variable is initialized.
 */
function isNull(obj) {
    return typeof obj === typeof "undefined" || obj === null;
}

/** Test if a variable is a number
 * @param { * } variable to test
 */
function isNumber(obj) {
    return !isEmpty(obj) && (typeof obj === 'number' || !isNaN(obj) || obj instanceof Number);
}

/**
 * Test if a variable is empty. Object without properties or empty array are empty.
 * @param { * } variable to test
 * @see {@link isInitialized} for check if a variable is initialized.
 * @see {@link isNull} for check if a variable is void.
 */
function isEmpty(obj) {
    if (typeof obj == 'boolean' || typeof obj == 'function' || typeof obj == 'number' || obj instanceof Number) return false;
    if (typeof obj == 'undefined' || obj === null) return true;
    if (typeof obj.length != 'undefined') return obj.length == 0;

    var count = 0;
    for (var i in obj) if (hasValue(obj, i)) return false;
    return true;
}

/** Test if a variable is an object
 * @param { * } variable to test
 */
function isObject(obj) {
    // Must be an Object.
    // Because of IE, we also have to check the presence of the constructor property.
    // Make sure that DOM nodes and window objects don't pass through, as well
    if (typeof obj !== "object") return false;

    // Not own constructor property must be Object
    if (obj.constructor &&
        !core.hasValue(obj, 'constructor') &&
        !core.hasValue(obj.constructor.prototype, 'isPrototypeOf')) {
        return false;
    }

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    var key;
    for (key in obj) { }

    return key === undefined || core.hasProperty(obj, key);
}

/** Test if a variable is a string
 * @param { * } variable to test
 */
function isString(obj) {
    return typeof obj === 'string' || obj instanceof String || (obj && obj['toString'] && obj.toString() === obj);
}

function hasValue(obj, prop) {
    // Check if object is empty
    if (typeof obj == typeof undefined || obj == null) return false;

    // If no property provided, object has value, since is not null or undefined.
    if (arguments.length == 1) return true;

    // If property provided, check if has correct type.
    if (!isString(prop) && !isNumber(prop)) throw new Error('Invalid parameter.');

    var props = core.isNumber(prop) ? [prop] : prop.replace('[', '.').replace(']', '').split('.');

    for (var i = 0, result = obj, len = props.length; i < len; i++) {
        if (!isInitialized(result[props[i]])) return false;
        result = result[props[i]];
    }

    return true;
}

exports = {
    isFunction: isFunction,
    isEmpty: isEmpty
};