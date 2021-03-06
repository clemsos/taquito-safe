(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('buffer'), require('blakejs'), require('bs58check')) :
  typeof define === 'function' && define.amd ? define(['exports', 'buffer', 'blakejs', 'bs58check'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.taquitoUtils = {}, global.buffer, global.blake, global.bs58check));
}(this, (function (exports, buffer, blake, bs58check) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var blake__default = /*#__PURE__*/_interopDefaultLegacy(blake);
  var bs58check__default = /*#__PURE__*/_interopDefaultLegacy(bs58check);

  var _a, _b;
  exports.Prefix = void 0;
  (function (Prefix) {
      Prefix["TZ1"] = "tz1";
      Prefix["TZ2"] = "tz2";
      Prefix["TZ3"] = "tz3";
      Prefix["KT"] = "KT";
      Prefix["KT1"] = "KT1";
      Prefix["EDSK2"] = "edsk2";
      Prefix["SPSK"] = "spsk";
      Prefix["P2SK"] = "p2sk";
      Prefix["EDPK"] = "edpk";
      Prefix["SPPK"] = "sppk";
      Prefix["P2PK"] = "p2pk";
      Prefix["EDESK"] = "edesk";
      Prefix["SPESK"] = "spesk";
      Prefix["P2ESK"] = "p2esk";
      Prefix["EDSK"] = "edsk";
      Prefix["EDSIG"] = "edsig";
      Prefix["SPSIG"] = "spsig";
      Prefix["P2SIG"] = "p2sig";
      Prefix["SIG"] = "sig";
      Prefix["NET"] = "Net";
      Prefix["NCE"] = "nce";
      Prefix["B"] = "b";
      Prefix["O"] = "o";
      Prefix["LO"] = "Lo";
      Prefix["LLO"] = "LLo";
      Prefix["P"] = "P";
      Prefix["CO"] = "Co";
      Prefix["ID"] = "id";
      Prefix["EXPR"] = "expr";
      Prefix["TZ"] = "TZ";
  })(exports.Prefix || (exports.Prefix = {}));
  var prefix = (_a = {},
      _a[exports.Prefix.TZ1] = new Uint8Array([6, 161, 159]),
      _a[exports.Prefix.TZ2] = new Uint8Array([6, 161, 161]),
      _a[exports.Prefix.TZ3] = new Uint8Array([6, 161, 164]),
      _a[exports.Prefix.KT] = new Uint8Array([2, 90, 121]),
      _a[exports.Prefix.KT1] = new Uint8Array([2, 90, 121]),
      _a[exports.Prefix.EDSK] = new Uint8Array([43, 246, 78, 7]),
      _a[exports.Prefix.EDSK2] = new Uint8Array([13, 15, 58, 7]),
      _a[exports.Prefix.SPSK] = new Uint8Array([17, 162, 224, 201]),
      _a[exports.Prefix.P2SK] = new Uint8Array([16, 81, 238, 189]),
      _a[exports.Prefix.EDPK] = new Uint8Array([13, 15, 37, 217]),
      _a[exports.Prefix.SPPK] = new Uint8Array([3, 254, 226, 86]),
      _a[exports.Prefix.P2PK] = new Uint8Array([3, 178, 139, 127]),
      _a[exports.Prefix.EDESK] = new Uint8Array([7, 90, 60, 179, 41]),
      _a[exports.Prefix.SPESK] = new Uint8Array([0x09, 0xed, 0xf1, 0xae, 0x96]),
      _a[exports.Prefix.P2ESK] = new Uint8Array([0x09, 0x30, 0x39, 0x73, 0xab]),
      _a[exports.Prefix.EDSIG] = new Uint8Array([9, 245, 205, 134, 18]),
      _a[exports.Prefix.SPSIG] = new Uint8Array([13, 115, 101, 19, 63]),
      _a[exports.Prefix.P2SIG] = new Uint8Array([54, 240, 44, 52]),
      _a[exports.Prefix.SIG] = new Uint8Array([4, 130, 43]),
      _a[exports.Prefix.NET] = new Uint8Array([87, 82, 0]),
      _a[exports.Prefix.NCE] = new Uint8Array([69, 220, 169]),
      _a[exports.Prefix.B] = new Uint8Array([1, 52]),
      _a[exports.Prefix.O] = new Uint8Array([5, 116]),
      _a[exports.Prefix.LO] = new Uint8Array([133, 233]),
      _a[exports.Prefix.LLO] = new Uint8Array([29, 159, 109]),
      _a[exports.Prefix.P] = new Uint8Array([2, 170]),
      _a[exports.Prefix.CO] = new Uint8Array([79, 179]),
      _a[exports.Prefix.ID] = new Uint8Array([153, 103]),
      _a[exports.Prefix.EXPR] = new Uint8Array([13, 44, 64, 27]),
      // Legacy prefix
      _a[exports.Prefix.TZ] = new Uint8Array([2, 90, 121]),
      _a);
  var prefixLength = (_b = {},
      _b[exports.Prefix.TZ1] = 20,
      _b[exports.Prefix.TZ2] = 20,
      _b[exports.Prefix.TZ3] = 20,
      _b[exports.Prefix.KT] = 20,
      _b[exports.Prefix.KT1] = 20,
      _b[exports.Prefix.EDPK] = 32,
      _b[exports.Prefix.SPPK] = 33,
      _b[exports.Prefix.P2PK] = 33,
      _b[exports.Prefix.EDSIG] = 64,
      _b[exports.Prefix.SPSIG] = 64,
      _b[exports.Prefix.P2SIG] = 64,
      _b[exports.Prefix.SIG] = 64,
      _b[exports.Prefix.NET] = 4,
      _b[exports.Prefix.B] = 32,
      _b[exports.Prefix.P] = 32,
      _b[exports.Prefix.O] = 32,
      _b);

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      }
      catch (error) { e = { error: error }; }
      finally {
          try {
              if (r && !r.done && (m = i["return"])) m.call(i);
          }
          finally { if (e) throw e.error; }
      }
      return ar;
  }

  function __spreadArray(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
      return to;
  }

  exports.ValidationResult = void 0;
  (function (ValidationResult) {
      ValidationResult[ValidationResult["NO_PREFIX_MATCHED"] = 0] = "NO_PREFIX_MATCHED";
      ValidationResult[ValidationResult["INVALID_CHECKSUM"] = 1] = "INVALID_CHECKSUM";
      ValidationResult[ValidationResult["INVALID_LENGTH"] = 2] = "INVALID_LENGTH";
      ValidationResult[ValidationResult["VALID"] = 3] = "VALID";
  })(exports.ValidationResult || (exports.ValidationResult = {}));
  function isValidPrefix(value) {
      if (typeof value !== 'string') {
          return false;
      }
      return value in prefix;
  }
  /**
   * @description This function is called by the validation functions ([[validateAddress]], [[validateChain]], [[validateContractAddress]], [[validateKeyHash]], [[validateSignature]], [[validatePublicKey]]).
   * Verify if the value has the right prefix or return `NO_PREFIX_MATCHED`,
   * decode the value using base58 and return `INVALID_CHECKSUM` if it fails,
   * check if the length of the value matches the prefix type or return `INVALID_LENGTH`.
   * If all checks pass, return `VALID`.
   *
   * @param value Value to validate
   * @param prefixes prefix the value should have
   */
  function validatePrefixedValue(value, prefixes) {
      var match = new RegExp("^(" + prefixes.join('|') + ")").exec(value);
      if (!match || match.length === 0) {
          return exports.ValidationResult.NO_PREFIX_MATCHED;
      }
      var prefixKey = match[0];
      if (!isValidPrefix(prefixKey)) {
          return exports.ValidationResult.NO_PREFIX_MATCHED;
      }
      // Remove annotation from contract address before doing the validation
      var contractAddress = /^(KT1\w{33})(\%(.*))?/.exec(value);
      if (contractAddress) {
          value = contractAddress[1];
      }
      // decodeUnsafe return undefined if decoding fail
      var decoded = bs58check__default['default'].decodeUnsafe(value);
      if (!decoded) {
          return exports.ValidationResult.INVALID_CHECKSUM;
      }
      decoded = decoded.slice(prefix[prefixKey].length);
      if (decoded.length !== prefixLength[prefixKey]) {
          return exports.ValidationResult.INVALID_LENGTH;
      }
      return exports.ValidationResult.VALID;
  }
  var implicitPrefix = [exports.Prefix.TZ1, exports.Prefix.TZ2, exports.Prefix.TZ3];
  var contractPrefix = [exports.Prefix.KT1];
  var signaturePrefix = [exports.Prefix.EDSIG, exports.Prefix.P2SIG, exports.Prefix.SPSIG, exports.Prefix.SIG];
  var pkPrefix = [exports.Prefix.EDPK, exports.Prefix.SPPK, exports.Prefix.P2PK];
  /**
   * @description Used to check if an address or a contract address is valid.
   *
   * @returns
   * 0 (NO_PREFIX_MATCHED), 1 (INVALID_CHECKSUM), 2 (INVALID_LENGTH) or 3 (VALID).
   *
   * @example
   * ```
   * import { validateAddress } from '@taquito/utils';
   * const pkh = 'tz1L9r8mWmRPndRhuvMCWESLGSVeFzQ9NAWx'
   * const validation = validateAddress(pkh)
   * console.log(validation)
   * // This example return 3 which correspond to VALID
   * ```
   */
  function validateAddress(value) {
      return validatePrefixedValue(value, __spreadArray(__spreadArray([], __read(implicitPrefix)), __read(contractPrefix)));
  }
  /**
   * @description Used to check if a chain id is valid.
   *
   * @returns
   * 0 (NO_PREFIX_MATCHED), 1 (INVALID_CHECKSUM), 2 (INVALID_LENGTH) or 3 (VALID).
   *
   * @example
   * ```
   * import { validateChain } from '@taquito/utils';
   * const chainId = 'NetXdQprcVkpaWU'
   * const validation = validateChain(chainId)
   * console.log(validation)
   * // This example return 3 which correspond to VALID
   * ```
   */
  function validateChain(value) {
      return validatePrefixedValue(value, [exports.Prefix.NET]);
  }
  /**
   * @description Used to check if a contract address is valid.
   *
   * @returns
   * 0 (NO_PREFIX_MATCHED), 1 (INVALID_CHECKSUM), 2 (INVALID_LENGTH) or 3 (VALID).
   *
   * @example
   * ```
   * import { validateContractAddress } from '@taquito/utils';
   * const contractAddress = 'KT1JVErLYTgtY8uGGZ4mso2npTSxqVLDRVbC'
   * const validation = validateContractAddress(contractAddress)
   * console.log(validation)
   * // This example return 3 which correspond to VALID
   * ```
   */
  function validateContractAddress(value) {
      return validatePrefixedValue(value, contractPrefix);
  }
  /**
   * @description Used to check if a key hash is valid.
   *
   * @returns
   * 0 (NO_PREFIX_MATCHED), 1 (INVALID_CHECKSUM), 2 (INVALID_LENGTH) or 3 (VALID).
   *
   * @example
   * ```
   * import { validateKeyHash } from '@taquito/utils';
   * const keyHashWithoutPrefix = '1L9r8mWmRPndRhuvMCWESLGSVeFzQ9NAWx'
   * const validation = validateKeyHash(keyHashWithoutPrefix)
   * console.log(validation)
   * // This example return 0 which correspond to NO_PREFIX_MATCHED
   * ```
   */
  function validateKeyHash(value) {
      return validatePrefixedValue(value, implicitPrefix);
  }
  /**
   * @description Used to check if a signature is valid.
   *
   * @returns
   * 0 (NO_PREFIX_MATCHED), 1 (INVALID_CHECKSUM), 2 (INVALID_LENGTH) or 3 (VALID).
   *
   * @example
   * ```
   * import { validateSignature } from '@taquito/utils';
   * const signature = 'edsigtkpiSSschcaCt9pUVrpNPf7TTcgvgDEDD6NCEHMy8NNQJCGnMfLZzYoQj74yLjo9wx6MPVV29CvVzgi7qEcEUok3k7AuMg'
   * const validation = validateSignature(signature)
   * console.log(validation)
   * // This example return 3 which correspond to VALID
   * ```
   */
  function validateSignature(value) {
      return validatePrefixedValue(value, signaturePrefix);
  }
  /**
   * @description Used to check if a signature is valid.
   *
   * @returns
   * 0 (NO_PREFIX_MATCHED), 1 (INVALID_CHECKSUM), 2 (INVALID_LENGTH) or 3 (VALID).
   *
   * @example
   * ```
   * import { validatePublicKey } from '@taquito/utils';
   * const publicKey = 'edsigtkpiSSschcaCt9pUVrpNPf7TTcgvgDEDD6NCEHMy8NNQJCGnMfLZzYoQj74yLjo9wx6MPVV29CvVzgi7qEcEUok3k7AuMg'
   * const validation = validatePublicKey(publicKey)
   * console.log(validation)
   * // This example return 3 which correspond to VALID
   * ```
   */
  function validatePublicKey(value) {
      return validatePrefixedValue(value, pkPrefix);
  }

  // IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
  /* tslint:disable */
  var VERSION = {
      "commitHash": "d3777526ba07bc9fef5e3551ed3f9e40b99ed358",
      "version": "10.2.0"
  };
  /* tslint:enable */

  /**
   * @packageDocumentation
   * @module @taquito/utils
   */
  /**
   *
   * @description Hash a string using the BLAKE2b algorithm, base58 encode the hash obtained and appends the prefix 'expr' to it
   *
   * @param value Value in hex
   */
  function encodeExpr(value) {
      var blakeHash = blake__default['default'].blake2b(hex2buf(value), undefined, 32);
      return b58cencode(blakeHash, prefix['expr']);
  }
  /**
   *
   * @description Return the operation hash of a signed operation
   * @param value Value in hex of a signed operation
   */
  function encodeOpHash(value) {
      var blakeHash = blake__default['default'].blake2b(hex2buf(value), undefined, 32);
      return b58cencode(blakeHash, prefix.o);
  }
  /**
   *
   * @description Base58 encode a string or a Uint8Array and append a prefix to it
   *
   * @param value Value to base58 encode
   * @param prefix prefix to append to the encoded string
   */
  function b58cencode(value, prefix) {
      var payloadAr = typeof value === 'string' ? Uint8Array.from(buffer.Buffer.from(value, 'hex')) : value;
      var n = new Uint8Array(prefix.length + payloadAr.length);
      n.set(prefix);
      n.set(payloadAr, prefix.length);
      return bs58check__default['default'].encode(buffer.Buffer.from(n.buffer));
  }
  /**
   *
   * @description Base58 decode a string and remove the prefix from it
   *
   * @param value Value to base58 decode
   * @param prefix prefix to remove from the decoded string
   */
  var b58cdecode = function (enc, prefixArg) {
      return bs58check__default['default'].decode(enc).slice(prefixArg.length);
  };
  /**
   *
   * @description Base58 decode a string with predefined prefix
   *
   * @param value Value to base58 decode
   */
  function b58decode(payload) {
      var _a;
      var buf = bs58check__default['default'].decode(payload);
      var prefixMap = (_a = {},
          _a[prefix.tz1.toString()] = '0000',
          _a[prefix.tz2.toString()] = '0001',
          _a[prefix.tz3.toString()] = '0002',
          _a);
      var pref = prefixMap[new Uint8Array(buf.slice(0, 3)).toString()];
      if (pref) {
          // tz addresses
          var hex = buf2hex(buf.slice(3));
          return pref + hex;
      }
      else {
          // other (kt addresses)
          return '01' + buf2hex(buf.slice(3, 42)) + '00';
      }
  }
  /**
   *
   * @description Base58 encode a public key using predefined prefix
   *
   * @param value Public Key to base58 encode
   */
  function encodePubKey(value) {
      if (value.substring(0, 2) === '00') {
          var pref = {
              '0000': prefix.tz1,
              '0001': prefix.tz2,
              '0002': prefix.tz3,
          };
          return b58cencode(value.substring(4), pref[value.substring(0, 4)]);
      }
      return b58cencode(value.substring(2, 42), prefix.KT);
  }
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
  /**
   *
   * @description Convert an hex string to a Uint8Array
   *
   * @param hex Hex string to convert
   */
  var hex2buf = function (hex) {
      return new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) { return parseInt(h, 16); }));
  };
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
  /**
   *
   * @description Convert a string to bytes
   *
   * @param str String to convert
   */
  function char2Bytes(str) {
      return buffer.Buffer.from(str, 'utf8').toString('hex');
  }
  /**
   *
   * @description Convert bytes to a string
   *
   * @param str Bytes to convert
   */
  function bytes2Char(hex) {
      return buffer.Buffer.from(hex2buf(hex)).toString('utf8');
  }

  exports.VERSION = VERSION;
  exports.b58cdecode = b58cdecode;
  exports.b58cencode = b58cencode;
  exports.b58decode = b58decode;
  exports.buf2hex = buf2hex;
  exports.bytes2Char = bytes2Char;
  exports.char2Bytes = char2Bytes;
  exports.encodeExpr = encodeExpr;
  exports.encodeKey = encodeKey;
  exports.encodeKeyHash = encodeKeyHash;
  exports.encodeOpHash = encodeOpHash;
  exports.encodePubKey = encodePubKey;
  exports.hex2buf = hex2buf;
  exports.isValidPrefix = isValidPrefix;
  exports.mergebuf = mergebuf;
  exports.mic2arr = mic2arr;
  exports.prefix = prefix;
  exports.prefixLength = prefixLength;
  exports.validateAddress = validateAddress;
  exports.validateChain = validateChain;
  exports.validateContractAddress = validateContractAddress;
  exports.validateKeyHash = validateKeyHash;
  exports.validatePublicKey = validatePublicKey;
  exports.validateSignature = validateSignature;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=taquito-utils.umd.js.map
