"use strict";
/**
 * @packageDocumentation
 * @module @taquito/utils
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytes2Char = exports.char2Bytes = exports.buf2hex = exports.mic2arr = exports.mergebuf = exports.hex2buf = exports.encodeKeyHash = exports.encodeKey = exports.encodePubKey = exports.b58decode = exports.b58cdecode = exports.b58cencode = exports.encodeOpHash = exports.encodeExpr = exports.prefixLength = exports.Prefix = exports.prefix = exports.VERSION = void 0;
/*
 * Some code in this file is originally from sotez and eztz
 * Copyright (c) 2018 Andrew Kishino
 * Copyright (c) 2017 Stephen Andrews
 */
var buffer_1 = require("buffer");
var constants_1 = require("./constants");
var blakejs_1 = require("blakejs");
var bs58check_1 = require("bs58check");
__exportStar(require("./validators"), exports);
var version_1 = require("./version");
Object.defineProperty(exports, "VERSION", { enumerable: true, get: function () { return version_1.VERSION; } });
var constants_2 = require("./constants");
Object.defineProperty(exports, "prefix", { enumerable: true, get: function () { return constants_2.prefix; } });
Object.defineProperty(exports, "Prefix", { enumerable: true, get: function () { return constants_2.Prefix; } });
Object.defineProperty(exports, "prefixLength", { enumerable: true, get: function () { return constants_2.prefixLength; } });
/**
 *
 * @description Hash a string using the BLAKE2b algorithm, base58 encode the hash obtained and appends the prefix 'expr' to it
 *
 * @param value Value in hex
 */
function encodeExpr(value) {
    var blakeHash = blakejs_1.default.blake2b(exports.hex2buf(value), undefined, 32);
    return b58cencode(blakeHash, constants_1.prefix['expr']);
}
exports.encodeExpr = encodeExpr;
/**
 *
 * @description Return the operation hash of a signed operation
 * @param value Value in hex of a signed operation
 */
function encodeOpHash(value) {
    var blakeHash = blakejs_1.default.blake2b(exports.hex2buf(value), undefined, 32);
    return b58cencode(blakeHash, constants_1.prefix.o);
}
exports.encodeOpHash = encodeOpHash;
/**
 *
 * @description Base58 encode a string or a Uint8Array and append a prefix to it
 *
 * @param value Value to base58 encode
 * @param prefix prefix to append to the encoded string
 */
function b58cencode(value, prefix) {
    var payloadAr = typeof value === 'string' ? Uint8Array.from(buffer_1.Buffer.from(value, 'hex')) : value;
    var n = new Uint8Array(prefix.length + payloadAr.length);
    n.set(prefix);
    n.set(payloadAr, prefix.length);
    return bs58check_1.default.encode(buffer_1.Buffer.from(n.buffer));
}
exports.b58cencode = b58cencode;
/**
 *
 * @description Base58 decode a string and remove the prefix from it
 *
 * @param value Value to base58 decode
 * @param prefix prefix to remove from the decoded string
 */
var b58cdecode = function (enc, prefixArg) {
    return bs58check_1.default.decode(enc).slice(prefixArg.length);
};
exports.b58cdecode = b58cdecode;
/**
 *
 * @description Base58 decode a string with predefined prefix
 *
 * @param value Value to base58 decode
 */
function b58decode(payload) {
    var _a;
    var buf = bs58check_1.default.decode(payload);
    var prefixMap = (_a = {},
        _a[constants_1.prefix.tz1.toString()] = '0000',
        _a[constants_1.prefix.tz2.toString()] = '0001',
        _a[constants_1.prefix.tz3.toString()] = '0002',
        _a);
    var pref = prefixMap[new Uint8Array(buf.slice(0, 3)).toString()];
    if (pref) {
        // tz addresses
        var hex = exports.buf2hex(buf.slice(3));
        return pref + hex;
    }
    else {
        // other (kt addresses)
        return '01' + exports.buf2hex(buf.slice(3, 42)) + '00';
    }
}
exports.b58decode = b58decode;
/**
 *
 * @description Base58 encode a public key using predefined prefix
 *
 * @param value Public Key to base58 encode
 */
function encodePubKey(value) {
    if (value.substring(0, 2) === '00') {
        var pref = {
            '0000': constants_1.prefix.tz1,
            '0001': constants_1.prefix.tz2,
            '0002': constants_1.prefix.tz3,
        };
        return b58cencode(value.substring(4), pref[value.substring(0, 4)]);
    }
    return b58cencode(value.substring(2, 42), constants_1.prefix.KT);
}
exports.encodePubKey = encodePubKey;
/**
 *
 * @description Base58 encode a key according to its prefix
 *
 * @param value Key to base58 encode
 */
function encodeKey(value) {
    if (value[0] === '0') {
        var pref = {
            '00': new Uint8Array([13, 15, 37, 217]),
            '01': new Uint8Array([3, 254, 226, 86]),
            '02': new Uint8Array([3, 178, 139, 127]),
        };
        return b58cencode(value.substring(2), pref[value.substring(0, 2)]);
    }
}
exports.encodeKey = encodeKey;
/**
 *
 * @description Base58 encode a key hash according to its prefix
 *
 * @param value Key to base58 encode
 */
function encodeKeyHash(value) {
    if (value[0] === '0') {
        var pref = {
            '00': new Uint8Array([6, 161, 159]),
            '01': new Uint8Array([6, 161, 161]),
            '02': new Uint8Array([6, 161, 164]),
        };
        return b58cencode(value.substring(2), pref[value.substring(0, 2)]);
    }
}
exports.encodeKeyHash = encodeKeyHash;
/**
 *
 * @description Convert an hex string to a Uint8Array
 *
 * @param hex Hex string to convert
 */
var hex2buf = function (hex) {
    return new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) { return parseInt(h, 16); }));
};
exports.hex2buf = hex2buf;
/**
 *
 * @description Merge 2 buffers together
 *
 * @param b1 First buffer
 * @param b2 Second buffer
 */
var mergebuf = function (b1, b2) {
    var r = new Uint8Array(b1.length + b2.length);
    r.set(b1);
    r.set(b2, b1.length);
    return r;
};
exports.mergebuf = mergebuf;
/**
 *
 * @description Flatten a michelson json representation to an array
 *
 * @param s michelson json
 */
var mic2arr = function me2(s) {
    var ret = [];
    if (Object.prototype.hasOwnProperty.call(s, 'prim')) {
        if (s.prim === 'Pair') {
            ret.push(me2(s.args[0]));
            ret = ret.concat(me2(s.args[1]));
        }
        else if (s.prim === 'Elt') {
            ret = {
                key: me2(s.args[0]),
                val: me2(s.args[1]),
            };
        }
        else if (s.prim === 'True') {
            ret = true;
        }
        else if (s.prim === 'False') {
            ret = false;
        }
    }
    else if (Array.isArray(s)) {
        var sc = s.length;
        for (var i = 0; i < sc; i++) {
            var n = me2(s[i]);
            if (typeof n.key !== 'undefined') {
                if (Array.isArray(ret)) {
                    ret = {
                        keys: [],
                        vals: [],
                    };
                }
                ret.keys.push(n.key);
                ret.vals.push(n.val);
            }
            else {
                ret.push(n);
            }
        }
    }
    else if (Object.prototype.hasOwnProperty.call(s, 'string')) {
        ret = s.string;
    }
    else if (Object.prototype.hasOwnProperty.call(s, 'int')) {
        ret = parseInt(s.int, 10);
    }
    else {
        ret = s;
    }
    return ret;
};
exports.mic2arr = mic2arr;
/**
 *
 * @description Convert a buffer to an hex string
 *
 * @param buffer Buffer to convert
 */
var buf2hex = function (buffer) {
    var byteArray = new Uint8Array(buffer);
    var hexParts = [];
    byteArray.forEach(function (byte) {
        var hex = byte.toString(16);
        var paddedHex = ("00" + hex).slice(-2);
        hexParts.push(paddedHex);
    });
    return hexParts.join('');
};
exports.buf2hex = buf2hex;
/**
 *
 * @description Convert a string to bytes
 *
 * @param str String to convert
 */
function char2Bytes(str) {
    return buffer_1.Buffer.from(str, 'utf8').toString('hex');
}
exports.char2Bytes = char2Bytes;
/**
 *
 * @description Convert bytes to a string
 *
 * @param str Bytes to convert
 */
function bytes2Char(hex) {
    return buffer_1.Buffer.from(exports.hex2buf(hex)).toString('utf8');
}
exports.bytes2Char = bytes2Char;
//# sourceMappingURL=taquito-utils.js.map