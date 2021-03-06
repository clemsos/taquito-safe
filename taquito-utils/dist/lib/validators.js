"use strict";
var __read = (this && this.__read) || function (o, n) {
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
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePublicKey = exports.validateSignature = exports.validateKeyHash = exports.validateContractAddress = exports.validateChain = exports.validateAddress = exports.isValidPrefix = exports.ValidationResult = void 0;
var constants_1 = require("./constants");
var bs58check_1 = require("bs58check");
var ValidationResult;
(function (ValidationResult) {
    ValidationResult[ValidationResult["NO_PREFIX_MATCHED"] = 0] = "NO_PREFIX_MATCHED";
    ValidationResult[ValidationResult["INVALID_CHECKSUM"] = 1] = "INVALID_CHECKSUM";
    ValidationResult[ValidationResult["INVALID_LENGTH"] = 2] = "INVALID_LENGTH";
    ValidationResult[ValidationResult["VALID"] = 3] = "VALID";
})(ValidationResult = exports.ValidationResult || (exports.ValidationResult = {}));
function isValidPrefix(value) {
    if (typeof value !== 'string') {
        return false;
    }
    return value in constants_1.prefix;
}
exports.isValidPrefix = isValidPrefix;
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
        return ValidationResult.NO_PREFIX_MATCHED;
    }
    var prefixKey = match[0];
    if (!isValidPrefix(prefixKey)) {
        return ValidationResult.NO_PREFIX_MATCHED;
    }
    // Remove annotation from contract address before doing the validation
    var contractAddress = /^(KT1\w{33})(\%(.*))?/.exec(value);
    if (contractAddress) {
        value = contractAddress[1];
    }
    // decodeUnsafe return undefined if decoding fail
    var decoded = bs58check_1.default.decodeUnsafe(value);
    if (!decoded) {
        return ValidationResult.INVALID_CHECKSUM;
    }
    decoded = decoded.slice(constants_1.prefix[prefixKey].length);
    if (decoded.length !== constants_1.prefixLength[prefixKey]) {
        return ValidationResult.INVALID_LENGTH;
    }
    return ValidationResult.VALID;
}
var implicitPrefix = [constants_1.Prefix.TZ1, constants_1.Prefix.TZ2, constants_1.Prefix.TZ3];
var contractPrefix = [constants_1.Prefix.KT1];
var signaturePrefix = [constants_1.Prefix.EDSIG, constants_1.Prefix.P2SIG, constants_1.Prefix.SPSIG, constants_1.Prefix.SIG];
var pkPrefix = [constants_1.Prefix.EDPK, constants_1.Prefix.SPPK, constants_1.Prefix.P2PK];
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
exports.validateAddress = validateAddress;
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
    return validatePrefixedValue(value, [constants_1.Prefix.NET]);
}
exports.validateChain = validateChain;
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
exports.validateContractAddress = validateContractAddress;
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
exports.validateKeyHash = validateKeyHash;
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
exports.validateSignature = validateSignature;
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
exports.validatePublicKey = validatePublicKey;
//# sourceMappingURL=validators.js.map