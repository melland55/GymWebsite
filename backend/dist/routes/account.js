"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("./auth");
const router = express_1.default.Router();
router.delete('/delete/:username', auth_1.authenticateUser, (req, res) => {
    const username = req.params.username;
});
router.get('/validate/:username', auth_1.authenticateUser, (req, res) => {
    return res.status(200).json({ isAuthenticated: true });
});
exports.default = router;
//# sourceMappingURL=account.js.map