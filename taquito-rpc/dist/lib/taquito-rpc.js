"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcClient = exports.VERSION = exports.OpKind = exports.RpcClientCache = exports.defaultRPCOptions = exports.defaultChain = exports.castToBigNumber = void 0;
/**
 * @packageDocumentation
 * @module @taquito/rpc
 */
var http_utils_1 = require("@taquito/http-utils");
var bignumber_js_1 = require("bignumber.js");
var rpc_client_interface_1 = require("./rpc-client-interface");
var utils_1 = require("./utils/utils");
var utils_2 = require("./utils/utils");
Object.defineProperty(exports, "castToBigNumber", { enumerable: true, get: function () { return utils_2.castToBigNumber; } });
var rpc_client_interface_2 = require("./rpc-client-interface");
Object.defineProperty(exports, "defaultChain", { enumerable: true, get: function () { return rpc_client_interface_2.defaultChain; } });
Object.defineProperty(exports, "defaultRPCOptions", { enumerable: true, get: function () { return rpc_client_interface_2.defaultRPCOptions; } });
var rpc_cache_1 = require("./rpc-client-modules/rpc-cache");
Object.defineProperty(exports, "RpcClientCache", { enumerable: true, get: function () { return rpc_cache_1.RpcClientCache; } });
__exportStar(require("./types"), exports);
var opkind_1 = require("./opkind");
Object.defineProperty(exports, "OpKind", { enumerable: true, get: function () { return opkind_1.OpKind; } });
var version_1 = require("./version");
Object.defineProperty(exports, "VERSION", { enumerable: true, get: function () { return version_1.VERSION; } });
/***
 * @description RpcClient allows interaction with Tezos network through an rpc node
 */
var RpcClient = /** @class */ (function () {
    /**
     *
     * @param url rpc root url
     * @param chain chain (default main)
     * @param httpBackend Http backend that issue http request.
     * You can override it by providing your own if you which to hook in the request/response
     *
     * @example new RpcClient('https://mainnet.api.tez.ie/', 'main') this will use https://mainnet.api.tez.ie//chains/main
     */
    function RpcClient(url, chain, httpBackend) {
        if (chain === void 0) { chain = rpc_client_interface_1.defaultChain; }
        if (httpBackend === void 0) { httpBackend = new http_utils_1.HttpBackend(); }
        this.url = url;
        this.chain = chain;
        this.httpBackend = httpBackend;
    }
    RpcClient.prototype.createURL = function (path) {
        // Trim trailing slashes because it is assumed to be included in path
        return "" + this.url.replace(/\/+$/g, '') + path;
    };
    /**
     *
     * @param options contains generic configuration for rpc calls
     *
     * @description Get the block's hash, its unique identifier.
     *
     * @see https://tezos.gitlab.io/api/rpc.html#get-block-id-hash
     */
    RpcClient.prototype.getBlockHash = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/hash"),
                            method: 'GET',
                        })];
                    case 1:
                        hash = _c.sent();
                        return [2 /*return*/, hash];
                }
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
    RpcClient.prototype.getLiveBlocks = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var blocks;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/live_blocks"),
                            method: 'GET',
                        })];
                    case 1:
                        blocks = _c.sent();
                        return [2 /*return*/, blocks];
                }
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
    RpcClient.prototype.getBalance = function (address, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/context/contracts/" + address + "/balance"),
                            method: 'GET',
                        })];
                    case 1:
                        balance = _c.sent();
                        return [2 /*return*/, new bignumber_js_1.default(balance)];
                }
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
    RpcClient.prototype.getStorage = function (address, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, this.httpBackend.createRequest({
                        url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/context/contracts/" + address + "/storage"),
                        method: 'GET',
                    })];
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
    RpcClient.prototype.getScript = function (address, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, this.httpBackend.createRequest({
                        url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/context/contracts/" + address + "/script"),
                        method: 'GET',
                    })];
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
    RpcClient.prototype.getNormalizedScript = function (address, unparsingMode, _a) {
        if (unparsingMode === void 0) { unparsingMode = { unparsing_mode: 'Readable' }; }
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, this.httpBackend.createRequest({
                        url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/context/contracts/" + address + "/script/normalized"),
                        method: 'POST',
                    }, unparsingMode)];
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
    RpcClient.prototype.getContract = function (address, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var contractResponse;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/context/contracts/" + address),
                            method: 'GET',
                        })];
                    case 1:
                        contractResponse = _c.sent();
                        return [2 /*return*/, __assign(__assign({}, contractResponse), { balance: new bignumber_js_1.default(contractResponse.balance) })];
                }
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
    RpcClient.prototype.getManagerKey = function (address, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, this.httpBackend.createRequest({
                        url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/context/contracts/" + address + "/manager_key"),
                        method: 'GET',
                    })];
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
    RpcClient.prototype.getDelegate = function (address, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var delegate, ex_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpBackend.createRequest({
                                url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/context/contracts/" + address + "/delegate"),
                                method: 'GET',
                            })];
                    case 1:
                        delegate = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _c.sent();
                        if (ex_1 instanceof http_utils_1.HttpResponseError && ex_1.status === http_utils_1.STATUS_CODE.NOT_FOUND) {
                            delegate = null;
                        }
                        else {
                            throw ex_1;
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, delegate];
                }
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
    RpcClient.prototype.getBigMapKey = function (address, key, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, this.httpBackend.createRequest({
                        url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/context/contracts/" + address + "/big_map_get"),
                        method: 'POST',
                    }, key)];
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
    RpcClient.prototype.getBigMapExpr = function (id, expr, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, this.httpBackend.createRequest({
                        url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/context/big_maps/" + id + "/" + expr),
                        method: 'GET',
                    })];
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
    RpcClient.prototype.getDelegates = function (address, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/context/delegates/" + address),
                            method: 'GET',
                        })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                deactivated: response.deactivated,
                                balance: new bignumber_js_1.default(response.balance),
                                frozen_balance: new bignumber_js_1.default(response.frozen_balance),
                                frozen_balance_by_cycle: response.frozen_balance_by_cycle.map(function (_a) {
                                    var deposit = _a.deposit, deposits = _a.deposits, fees = _a.fees, rewards = _a.rewards, rest = __rest(_a, ["deposit", "deposits", "fees", "rewards"]);
                                    var castedToBigNumber = utils_1.castToBigNumber({ deposit: deposit, deposits: deposits, fees: fees, rewards: rewards }, [
                                        'deposit',
                                        'deposits',
                                        'fees',
                                        'rewards',
                                    ]);
                                    return __assign(__assign({}, rest), { deposit: castedToBigNumber.deposit, deposits: castedToBigNumber.deposits, fees: castedToBigNumber.fees, rewards: castedToBigNumber.rewards });
                                }),
                                staking_balance: new bignumber_js_1.default(response.staking_balance),
                                delegated_contracts: response.delegated_contracts,
                                delegated_balance: new bignumber_js_1.default(response.delegated_balance),
                                grace_period: response.grace_period,
                                voting_power: response.voting_power,
                            }];
                }
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
    RpcClient.prototype.getConstants = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response, castedResponse;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/context/constants"),
                            method: 'GET',
                        })];
                    case 1:
                        response = _c.sent();
                        castedResponse = utils_1.castToBigNumber(response, [
                            'time_between_blocks',
                            'hard_gas_limit_per_operation',
                            'hard_gas_limit_per_block',
                            'proof_of_work_threshold',
                            'tokens_per_roll',
                            'seed_nonce_revelation_tip',
                            'block_security_deposit',
                            'endorsement_security_deposit',
                            'block_reward',
                            'endorsement_reward',
                            'cost_per_byte',
                            'hard_storage_limit_per_operation',
                            'test_chain_duration',
                            'baking_reward_per_endorsement',
                            'delay_per_missing_endorsement',
                            'minimal_block_delay',
                            'liquidity_baking_subsidy',
                        ]);
                        return [2 /*return*/, __assign(__assign({}, response), castedResponse)];
                }
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
    RpcClient.prototype.getBlock = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block),
                            method: 'GET',
                        })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
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
    RpcClient.prototype.getBlockHeader = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/header"),
                            method: 'GET',
                        })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
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
    RpcClient.prototype.getBlockMetadata = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/metadata"),
                            method: 'GET',
                        })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
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
    RpcClient.prototype.getBakingRights = function (args, _a) {
        if (args === void 0) { args = {}; }
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/helpers/baking_rights"),
                            method: 'GET',
                            query: args,
                        })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
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
    RpcClient.prototype.getEndorsingRights = function (args, _a) {
        if (args === void 0) { args = {}; }
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/helpers/endorsing_rights"),
                            method: 'GET',
                            query: args,
                        })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
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
    RpcClient.prototype.getBallotList = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/votes/ballot_list"),
                            method: 'GET',
                        })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
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
    RpcClient.prototype.getBallots = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/votes/ballots"),
                            method: 'GET',
                        })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
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
    RpcClient.prototype.getCurrentPeriodKind = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/votes/current_period_kind"),
                            method: 'GET',
                        })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
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
    RpcClient.prototype.getCurrentProposal = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/votes/current_proposal"),
                            method: 'GET',
                        })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
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
    RpcClient.prototype.getCurrentQuorum = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/votes/current_quorum"),
                            method: 'GET',
                        })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
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
    RpcClient.prototype.getVotesListings = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/votes/listings"),
                            method: 'GET',
                        })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
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
    RpcClient.prototype.getProposals = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/votes/proposals"),
                            method: 'GET',
                        })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
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
    RpcClient.prototype.forgeOperations = function (data, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, this.httpBackend.createRequest({
                        url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/helpers/forge/operations"),
                        method: 'POST',
                    }, data)];
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
    RpcClient.prototype.injectOperation = function (signedOpBytes) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.httpBackend.createRequest({
                        url: this.createURL("/injection/operation"),
                        method: 'POST',
                    }, signedOpBytes)];
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
    RpcClient.prototype.preapplyOperations = function (ops, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/helpers/preapply/operations"),
                            method: 'POST',
                        }, ops)];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
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
    RpcClient.prototype.getEntrypoints = function (contract, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var contractResponse;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/context/contracts/" + contract + "/entrypoints"),
                            method: 'GET',
                        })];
                    case 1:
                        contractResponse = _c.sent();
                        return [2 /*return*/, contractResponse];
                }
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
    RpcClient.prototype.runOperation = function (op, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/helpers/scripts/run_operation"),
                            method: 'POST',
                        }, op)];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
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
    RpcClient.prototype.runCode = function (code, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/helpers/scripts/run_code"),
                            method: 'POST',
                        }, code)];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    RpcClient.prototype.getChainId = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.httpBackend.createRequest({
                        url: this.createURL("/chains/" + this.chain + "/chain_id"),
                        method: 'GET',
                    })];
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
    RpcClient.prototype.packData = function (data, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var _c, gas, rest, formattedGas, tryBigNumber;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/helpers/scripts/pack_data"),
                            method: 'POST',
                        }, data)];
                    case 1:
                        _c = _d.sent(), gas = _c.gas, rest = __rest(_c, ["gas"]);
                        formattedGas = gas;
                        tryBigNumber = new bignumber_js_1.default(gas || '');
                        if (!tryBigNumber.isNaN()) {
                            formattedGas = tryBigNumber;
                        }
                        return [2 /*return*/, __assign({ gas: formattedGas }, rest)];
                }
            });
        });
    };
    /**
     *
     * @description Return rpc root url
     */
    RpcClient.prototype.getRpcUrl = function () {
        return this.url;
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
    RpcClient.prototype.getCurrentPeriod = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/votes/current_period"),
                            method: 'GET',
                        })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
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
    RpcClient.prototype.getSuccessorPeriod = function (_a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.httpBackend.createRequest({
                            url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/votes/successor_period"),
                            method: 'GET',
                        })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, response];
                }
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
    RpcClient.prototype.getSaplingDiffById = function (id, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, this.httpBackend.createRequest({
                        url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/context/sapling/" + id + "/get_diff"),
                        method: 'GET',
                    })];
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
    RpcClient.prototype.getSaplingDiffByContract = function (contract, _a) {
        var _b = _a === void 0 ? rpc_client_interface_1.defaultRPCOptions : _a, block = _b.block;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, this.httpBackend.createRequest({
                        url: this.createURL("/chains/" + this.chain + "/blocks/" + block + "/context/contracts/" + contract + "/single_sapling_get_diff"),
                        method: 'GET',
                    })];
            });
        });
    };
    return RpcClient;
}());
exports.RpcClient = RpcClient;
//# sourceMappingURL=taquito-rpc.js.map