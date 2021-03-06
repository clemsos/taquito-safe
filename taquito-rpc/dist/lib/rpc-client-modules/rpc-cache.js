"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcClientCache = void 0;
var rpc_client_interface_1 = require("../rpc-client-interface");
var defaultTtl = 1000;
/***
 * @description RpcClientCache acts as a decorator over the RpcClient instance by caching responses for the period defined by the ttl.
 */
var RpcClientCache = /** @class */ (function () {
    /**
     *
     * @param rpcClient rpcClient responsible of the interaction with Tezos network through an rpc node
     * @param ttl number representing the time to live (default 1000 milliseconds)
     *
     * @example new RpcClientCache(new RpcClient('https://mainnet.api.tez.ie/'))
     */
    function RpcClientCache(rpcClient, ttl) {
        if (ttl === void 0) { ttl = defaultTtl; }
        this.rpcClient = rpcClient;
        this.ttl = ttl;
        this._cache = {};
    }
    RpcClientCache.prototype.getAllCachedData = function () {
        return this._cache;
    };
    /**
     * @description Remove all the data in the cache.
     *
     */
    RpcClientCache.prototype.deleteAllCachedData = function () {
        for (var key in this._cache) {
            delete this._cache[key];
        }
    };
    RpcClientCache.prototype.formatCacheKey = function (rpcUrl, rpcMethodName, rpcMethodParams, rpcMethodData) {
        var paramsToString = '';
        rpcMethodParams.forEach(function (param) {
            paramsToString =
                typeof param === 'object'
                    ? paramsToString + JSON.stringify(param) + '/'
                    : paramsToString + param + '/';
        });
        return rpcMethodData
            ? rpcUrl + "/" + rpcMethodName + "/" + paramsToString + "/" + JSON.stringify(rpcMethodData)
            : rpcUrl + "/" + rpcMethodName + "/" + paramsToString;
    };
    RpcClientCache.prototype.has = function (key) {
        return key in this._cache;
    };
    RpcClientCache.prototype.get = function (key) {
        return this._cache[key].response;
    };
    RpcClientCache.prototype.put = function (key, response) {
        var _a;
        var _this = this;
        var handle = setTimeout(function () {
            return _this.remove(key);
        }, this.ttl);
        Object.assign(this._cache, (_a = {}, _a[key] = { handle: handle, response: response }, _a));
    };
    RpcClientCache.prototype.remove = function (key) {
        if (key in this._cache) {
            delete this._cache[key];
        }
    };
    /**
     *
     * @param options contains generic configuration for rpc calls
     *
     * @description Get the block's hash, its unique identifier.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-hash
     */
    RpcClientCache.prototype.getBlockHash = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getBlockHash', [block]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getBlockHash({ block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param options contains generic configuration for rpc calls
     *
     * @description List the ancestors of the given block which, if referred to as the branch in an operation header, are recent enough for that operation to be included in the current block.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-live-blocks
     */
    RpcClientCache.prototype.getLiveBlocks = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getLiveBlocks', [block]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getLiveBlocks({ block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param address address from which we want to retrieve the balance
     * @param options contains generic configuration for rpc calls
     *
     * @description Access the balance of a contract.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-contracts-contract-id-balance
     */
    RpcClientCache.prototype.getBalance = function (address, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getBalance', [block, address]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getBalance(address, { block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param address contract address from which we want to retrieve the storage
     * @param options contains generic configuration for rpc calls
     *
     * @description Access the data of the contract.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-contracts-contract-id-storage
     */
    RpcClientCache.prototype.getStorage = function (address, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getStorage', [block, address]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getStorage(address, { block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param address contract address from which we want to retrieve the script
     * @param options contains generic configuration for rpc calls
     *
     * @description Access the code and data of the contract.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-contracts-contract-id-script
     */
    RpcClientCache.prototype.getScript = function (address, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getScript', [block, address]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getScript(address, { block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param address contract address from which we want to retrieve the script
     * @param unparsingMode default is { unparsing_mode: "Readable" }
     * @param options contains generic configuration for rpc calls
     *
     * @description Access the script of the contract and normalize it using the requested unparsing mode.
     *
     */
    RpcClientCache.prototype.getNormalizedScript = function (address, unparsingMode, _a) {
        if (unparsingMode === void 0) { unparsingMode = { unparsing_mode: 'Readable' }; }
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getNormalizedScript', [
                    block,
                    address,
                    unparsingMode,
                ]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getNormalizedScript(address, unparsingMode, { block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param address contract address from which we want to retrieve
     * @param options contains generic configuration for rpc calls
     *
     * @description Access the complete status of a contract.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-contracts-contract-id
     */
    RpcClientCache.prototype.getContract = function (address, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getContract', [block, address]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getContract(address, { block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param address contract address from which we want to retrieve the manager
     * @param options contains generic configuration for rpc calls
     *
     * @description Access the manager key of a contract.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-contracts-contract-id-manager-key
     */
    RpcClientCache.prototype.getManagerKey = function (address, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getManagerKey', [block, address]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getManagerKey(address, { block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param address contract address from which we want to retrieve the delegate (baker)
     * @param options contains generic configuration for rpc calls
     *
     * @description Access the delegate of a contract, if any.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-contracts-contract-id-delegate
     */
    RpcClientCache.prototype.getDelegate = function (address, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getDelegate', [block, address]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getDelegate(address, { block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param address contract address from which we want to retrieve the big map key
     * @param options contains generic configuration for rpc calls
     *
     * @description Access the value associated with a key in the big map storage of the contract.
     *
     * @deprecated Deprecated in favor of getBigMapKeyByID
     *
     * @see https://tezos.gitlab.io/api/rpc.html#post-block-id-context-contracts-contract-id-big-map-get
     */
    RpcClientCache.prototype.getBigMapKey = function (address, key, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var keyUrl, response;
            return __generator(this, function (_c) {
                keyUrl = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getBigMapKey', [
                    block,
                    address,
                    key,
                ]);
                if (this.has(keyUrl)) {
                    return [2 /*return*/, this.get(keyUrl)];
                }
                else {
                    response = this.rpcClient.getBigMapKey(address, key, { block: block });
                    this.put(keyUrl, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param id Big Map ID
     * @param expr Expression hash to query (A b58check encoded Blake2b hash of the expression (The expression can be packed using the pack_data method))
     * @param options contains generic configuration for rpc calls
     *
     * @description Access the value associated with a key in a big map.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-big-maps-big-map-id-script-expr
     */
    RpcClientCache.prototype.getBigMapExpr = function (id, expr, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getBigMapExpr', [block, id, expr]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getBigMapExpr(id, expr, { block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param address delegate address which we want to retrieve
     * @param options contains generic configuration for rpc calls
     *
     * @description Fetches information about a delegate from RPC.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-delegates-pkh
     */
    RpcClientCache.prototype.getDelegates = function (address, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getDelegates', [block, address]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getDelegates(address, { block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param options contains generic configuration for rpc calls
     *
     * @description All constants
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-constants
     */
    RpcClientCache.prototype.getConstants = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getConstants', [block]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getConstants({ block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param options contains generic configuration for rpc calls. See examples for various available sytaxes.
     *
     * @description All the information about a block
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id
     * @example getBlock() will default to /main/chains/block/head.
     * @example getBlock({ block: head~2 }) will return an offset of 2 blocks.
     * @example getBlock({ block: BL8fTiWcSxWCjiMVnDkbh6EuhqVPZzgWheJ2dqwrxYRm9AephXh~2 }) will return an offset of 2 blocks from given block hash..
     */
    RpcClientCache.prototype.getBlock = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getBlock', [block]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getBlock({ block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param options contains generic configuration for rpc calls
     *
     * @description The whole block header
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-header
     */
    RpcClientCache.prototype.getBlockHeader = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getBlockHeader', [block]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getBlockHeader({ block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param options contains generic configuration for rpc calls
     *
     * @description All the metadata associated to the block
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-metadata
     */
    RpcClientCache.prototype.getBlockMetadata = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getBlockMetadata', [block]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getBlockMetadata({ block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param args contains optional query arguments
     * @param options contains generic configuration for rpc calls
     *
     * @description Retrieves the list of delegates allowed to bake a block.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-helpers-baking-rights
     */
    RpcClientCache.prototype.getBakingRights = function (args, _a) {
        if (args === void 0) { args = {}; }
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getBakingRights', [block, args]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getBakingRights(args, { block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param args contains optional query arguments
     * @param options contains generic configuration for rpc calls
     *
     * @description Retrieves the list of delegates allowed to bake a block.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-helpers-endorsing-rights
     */
    RpcClientCache.prototype.getEndorsingRights = function (args, _a) {
        if (args === void 0) { args = {}; }
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getEndorsingRights', [
                    block,
                    args,
                ]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getEndorsingRights(args, { block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param options contains generic configuration for rpc calls
     *
     * @description Ballots casted so far during a voting period
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-votes-ballot-list
     */
    RpcClientCache.prototype.getBallotList = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getBallotList', [block]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getBallotList({ block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param options contains generic configuration for rpc calls
     *
     * @description Sum of ballots casted so far during a voting period.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-votes-ballots
     */
    RpcClientCache.prototype.getBallots = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getBallots', [block]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getBallots({ block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param options contains generic configuration for rpc calls
     *
     * @description Current period kind.
     *
     * @deprecated Deprecated in favor of getCurrentPeriod
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-votes-current-period-kind
     */
    RpcClientCache.prototype.getCurrentPeriodKind = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getCurrentPeriodKind', [block]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getCurrentPeriodKind({ block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param options contains generic configuration for rpc calls
     *
     * @description Current proposal under evaluation.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-votes-current-proposal
     */
    RpcClientCache.prototype.getCurrentProposal = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getCurrentProposal', [block]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getCurrentProposal({ block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param options contains generic configuration for rpc calls
     *
     * @description Current expected quorum.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-votes-current-quorum
     */
    RpcClientCache.prototype.getCurrentQuorum = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getCurrentQuorum', [block]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getCurrentQuorum({ block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param options contains generic configuration for rpc calls
     *
     * @description List of delegates with their voting weight, in number of rolls.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-votes-listings
     */
    RpcClientCache.prototype.getVotesListings = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getVotesListings', [block]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getVotesListings({ block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param options contains generic configuration for rpc calls
     *
     * @description List of proposals with number of supporters.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-votes-proposals
     */
    RpcClientCache.prototype.getProposals = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getProposals', [block]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getProposals({ block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param data operation contents to forge
     * @param options contains generic configuration for rpc calls
     *
     * @description Forge an operation returning the unsigned bytes
     *
     * @see https://tezos.gitlab.io/api/rpc.html#post-block-id-helpers-forge-operations
     */
    RpcClientCache.prototype.forgeOperations = function (data, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, this.rpcClient.forgeOperations(data, { block: block })];
            });
        });
    };
    /**
     *
     * @param signedOpBytes signed bytes to inject
     *
     * @description Inject an operation in node and broadcast it. Returns the ID of the operation. The `signedOperationContents` should be constructed using a contextual RPCs from the latest block and signed by the client. By default, the RPC will wait for the operation to be (pre-)validated before answering. See RPCs under /blocks/prevalidation for more details on the prevalidation context.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#post-injection-operation
     */
    RpcClientCache.prototype.injectOperation = function (signedOpBytes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.rpcClient.injectOperation(signedOpBytes)];
            });
        });
    };
    /**
     *
     * @param ops Operations to apply
     * @param options contains generic configuration for rpc calls
     *
     * @description Simulate the validation of an operation
     *
     * @see https://tezos.gitlab.io/api/rpc.html#post-block-id-helpers-preapply-operations
     */
    RpcClientCache.prototype.preapplyOperations = function (ops, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, this.rpcClient.preapplyOperations(ops, { block: block })];
            });
        });
    };
    /**
     *
     * @param contract address of the contract we want to get the entrypoints of
     *
     * @description Return the list of entrypoints of the contract
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-context-contracts-contract-id-entrypoints
     *
     * @version 005_PsBABY5H
     */
    RpcClientCache.prototype.getEntrypoints = function (contract, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getEntrypoints', [
                    block,
                    contract,
                ]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getEntrypoints(contract, { block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param op Operation to run
     * @param options contains generic configuration for rpc calls
     *
     * @description Run an operation without signature checks
     *
     * @see https://tezos.gitlab.io/api/rpc.html#post-block-id-helpers-scripts-run-operation
     */
    RpcClientCache.prototype.runOperation = function (op, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, this.rpcClient.runOperation(op, { block: block })];
            });
        });
    };
    /**
     * @param code Code to run
     * @param options contains generic configuration for rpc calls
     *
     * @description Run a piece of code in the current context
     *
     * @see https://tezos.gitlab.io/api/rpc.html#post-block-id-helpers-scripts-run-code
     */
    RpcClientCache.prototype.runCode = function (code, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, this.rpcClient.runCode(code, { block: block })];
            });
        });
    };
    RpcClientCache.prototype.getChainId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_a) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getChainId', []);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getChainId();
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param data Data to pack
     * @param options contains generic configuration for rpc calls
     *
     * @description Computes the serialized version of a data expression using the same algorithm as script instruction PACK
     *
     * @example packData({ data: { string: "test" }, type: { prim: "string" } })
     *
     * @see https://tezos.gitlab.io/api/rpc.html#post-block-id-helpers-scripts-pack-data
     */
    RpcClientCache.prototype.packData = function (data, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'packData', [block, data]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.packData(data, { block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @description Return rpc root url
     */
    RpcClientCache.prototype.getRpcUrl = function () {
        return this.rpcClient.getRpcUrl();
    };
    /**
     *
     * @param options contains generic configuration for rpc calls
     *
     * @description Voting period of current block.
     *
     * @example getCurrentPeriod() will default to current voting period for /main/chains/block/head.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-votes-current-period
     */
    RpcClientCache.prototype.getCurrentPeriod = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getCurrentPeriod', [block]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getCurrentPeriod({ block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param options contains generic configuration for rpc calls
     *
     * @description Voting period of next block.
     *
     * @example getSuccessorPeriod() will default to successor voting period for /main/chains/block/head.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-votes-successor-period
     */
    RpcClientCache.prototype.getSuccessorPeriod = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getSuccessorPeriod', [block]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getSuccessorPeriod({ block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param id Sapling state ID
     * @param options contains generic configuration for rpc calls
     *
     * @description Access the value associated with a sapling state ID.
     *
     * @see https://tezos.gitlab.io/active/rpc.html#get-block-id-context-sapling-sapling-state-id-get-diff
     */
    RpcClientCache.prototype.getSaplingDiffById = function (id, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getSaplingDiffById', [block, id]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getSaplingDiffById(id, { block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param contract address of the contract we want to get the sapling diff
     * @param options contains generic configuration for rpc calls
     *
     * @description Access the value associated with a sapling state.
     *
     * @see https://tezos.gitlab.io/active/rpc.html#get-block-id-context-contracts-contract-id-single-sapling-get-diff
     */
    RpcClientCache.prototype.getSaplingDiffByContract = function (contract, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var key, response;
            return __generator(this, function (_c) {
                key = this.formatCacheKey(this.rpcClient.getRpcUrl(), 'getSaplingDiffByContract', [
                    block,
                    contract,
                ]);
                if (this.has(key)) {
                    return [2 /*return*/, this.get(key)];
                }
                else {
                    response = this.rpcClient.getSaplingDiffByContract(contract, { block: block });
                    this.put(key, response);
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
            });
        });
    };
    return RpcClientCache;
}());
exports.RpcClientCache = RpcClientCache;
//# sourceMappingURL=rpc-cache.js.map