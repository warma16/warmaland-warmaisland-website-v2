"use strict";
/*
Tencent is pleased to support the open source community by making vConsole available.

Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.

Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
http://opensource.org/licenses/MIT

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/
exports.__esModule = true;
exports.getStorage = exports.setStorage = exports.getObjName = exports.getObjAllKeys = exports.circularReplacer = exports.JSONStringify = exports.invisibleTextEncode = exports.htmlEncode = exports.isPlainObject = exports.getPrototypeName = exports.isWindow = exports.isElement = exports.isFunction = exports.isObject = exports.isSymbol = exports.isNull = exports.isUndefined = exports.isBoolean = exports.isArray = exports.isString = exports.isNumber = exports.getDate = void 0;
/**
 * Utility Functions
 */
/**
 * get formatted date by timestamp
 */
function getDate(time) {
    var d = time > 0 ? new Date(time) : new Date();
    var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate(), month = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1), year = d.getFullYear(), hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours(), minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes(), second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds(), millisecond = d.getMilliseconds() < 10 ? '0' + d.getMilliseconds() : d.getMilliseconds();
    if (millisecond < 100) {
        millisecond = '0' + millisecond;
    }
    return {
        time: (+d),
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        second: second,
        millisecond: millisecond
    };
}
exports.getDate = getDate;
/**
 * determines whether the passed value is a specific type
 * @param any value
 * @return boolean
 */
function isNumber(value) {
    return Object.prototype.toString.call(value) == '[object Number]';
}
exports.isNumber = isNumber;
function isString(value) {
    return Object.prototype.toString.call(value) == '[object String]';
}
exports.isString = isString;
function isArray(value) {
    return Object.prototype.toString.call(value) == '[object Array]';
}
exports.isArray = isArray;
function isBoolean(value) {
    return Object.prototype.toString.call(value) == '[object Boolean]';
}
exports.isBoolean = isBoolean;
function isUndefined(value) {
    return value === undefined;
}
exports.isUndefined = isUndefined;
function isNull(value) {
    return value === null;
}
exports.isNull = isNull;
function isSymbol(value) {
    return Object.prototype.toString.call(value) == '[object Symbol]';
}
exports.isSymbol = isSymbol;
function isObject(value) {
    return (Object.prototype.toString.call(value) == '[object Object]'
        ||
            // if it isn't a primitive value, then it is a common object
            (!isNumber(value) &&
                !isString(value) &&
                !isBoolean(value) &&
                !isArray(value) &&
                !isNull(value) &&
                !isFunction(value) &&
                !isUndefined(value) &&
                !isSymbol(value)));
}
exports.isObject = isObject;
function isFunction(value) {
    return Object.prototype.toString.call(value) == '[object Function]';
}
exports.isFunction = isFunction;
function isElement(value) {
    return (typeof HTMLElement === 'object' ? value instanceof HTMLElement : //DOM2
        value && typeof value === "object" && value !== null && value.nodeType === 1 && typeof value.nodeName === "string");
}
exports.isElement = isElement;
function isWindow(value) {
    var toString = Object.prototype.toString.call(value);
    return toString == '[object global]' || toString == '[object Window]' || toString == '[object DOMWindow]';
}
exports.isWindow = isWindow;
/**
 * Get the prototype name of an object
 */
function getPrototypeName(value) {
    return Object.prototype.toString.call(value).replace(/\[object (.*)\]/, '$1');
}
exports.getPrototypeName = getPrototypeName;
/**
 * check whether an object is plain (using {})
 * @param object obj
 * @return boolean
 */
function isPlainObject(obj) {
    var hasOwn = Object.prototype.hasOwnProperty;
    // Must be an Object.
    if (!obj || typeof obj !== 'object' || obj.nodeType || isWindow(obj)) {
        return false;
    }
    try {
        if (obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
            return false;
        }
    }
    catch (e) {
        return false;
    }
    var key;
    for (key in obj) { }
    return key === undefined || hasOwn.call(obj, key);
}
exports.isPlainObject = isPlainObject;
/**
 * HTML encode a string
 * @param string text
 * @return string
 */
function htmlEncode(text) {
    // return document.createElement('a').appendChild( document.createTextNode(text) ).parentNode.innerHTML;
    return String(text).replace(/[<>&" ]/g, function (c) {
        return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', ' ': '&nbsp;' }[c];
    });
}
exports.htmlEncode = htmlEncode;
/**
 * Change invisible characters to visible characters
 */
function invisibleTextEncode(text) {
    return String(text).replace(/[\n\t]/g, function (c) {
        return { '\n': '\\n', '\t': '\\t' }[c];
    });
}
exports.invisibleTextEncode = invisibleTextEncode;
/**
 * Simple JSON stringify, stringify top level key-value
 */
function JSONStringify(stringObject) {
    if (!isObject(stringObject) && !isArray(stringObject)) {
        return JSON.stringify(stringObject);
    }
    var prefix = '{', suffix = '}';
    if (isArray(stringObject)) {
        prefix = '[';
        suffix = ']';
    }
    var str = prefix;
    var keys = getObjAllKeys(stringObject);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = stringObject[key];
        try {
            // key
            if (!isArray(stringObject)) {
                if (isObject(key) || isArray(key) || isSymbol(key)) {
                    str += Object.prototype.toString.call(key);
                }
                else {
                    str += key;
                }
                str += ': ';
            }
            // value
            if (isArray(value)) {
                str += 'Array(' + value.length + ')';
            }
            else if (isObject(value) || isSymbol(value) || isFunction(value)) {
                str += Object.prototype.toString.call(value);
            }
            else {
                str += JSON.stringify(value);
            }
            if (i < keys.length - 1) {
                str += ', ';
            }
        }
        catch (e) {
            continue;
        }
    }
    str += suffix;
    return str;
}
exports.JSONStringify = JSONStringify;
function circularReplacer() {
    var seen = [];
    return function (key, value) {
        if (typeof (value) === 'object' && value !== null) {
            if (seen.indexOf(value) >= 0) {
                return '[Circular]';
            }
            seen.push(value);
        }
        return value;
    };
}
exports.circularReplacer = circularReplacer;
;
/**
 * get an object's all keys ignore whether they are not enumerable
 */
function getObjAllKeys(obj) {
    if (!isObject(obj) && !isArray(obj)) {
        return [];
    }
    // if (isArray(obj)) {
    //   const m = [];
    //   obj.forEach((_, index) => {
    //     m.push(index)
    //   });
    //   return m;
    // }
    // return Object.getOwnPropertyNames(obj).sort();
    var keys = [];
    for (var k in obj) {
        keys.push(k);
    }
    return keys.sort(function (a, b) {
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });
}
exports.getObjAllKeys = getObjAllKeys;
/**
 * get an object's prototype name
 */
function getObjName(obj) {
    return Object.prototype.toString.call(obj).replace('[object ', '').replace(']', '');
}
exports.getObjName = getObjName;
/**
 * localStorage methods
 */
function setStorage(key, value) {
    if (!window.localStorage) {
        return;
    }
    key = 'vConsole_' + key;
    localStorage.setItem(key, value);
}
exports.setStorage = setStorage;
function getStorage(key) {
    if (!window.localStorage) {
        return;
    }
    key = 'vConsole_' + key;
    return localStorage.getItem(key);
}
exports.getStorage = getStorage;
