"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpKind = void 0;
var OpKind;
(function (OpKind) {
    OpKind["ORIGINATION"] = "origination";
    OpKind["DELEGATION"] = "delegation";
    OpKind["REVEAL"] = "reveal";
    OpKind["TRANSACTION"] = "transaction";
    OpKind["ACTIVATION"] = "activate_account";
    OpKind["ENDORSEMENT"] = "endorsement";
    OpKind["ENDORSEMENT_WITH_SLOT"] = "endorsement_with_slot";
    OpKind["SEED_NONCE_REVELATION"] = "seed_nonce_revelation";
    OpKind["DOUBLE_ENDORSEMENT_EVIDENCE"] = "double_endorsement_evidence";
    OpKind["DOUBLE_BAKING_EVIDENCE"] = "double_baking_evidence";
    OpKind["PROPOSALS"] = "proposals";
    OpKind["BALLOT"] = "ballot";
    OpKind["FAILING_NOOP"] = "failing_noop";
    OpKind["REGISTER_GLOBAL_CONSTANT"] = "register_global_constant";
})(OpKind = exports.OpKind || (exports.OpKind = {}));
//# sourceMappingURL=opkind.js.map