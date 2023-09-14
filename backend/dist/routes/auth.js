"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRET_KEY;
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const secretKey = req.secretKey;
    const token = authHeader && authHeader.split(" ")[1];
    if (token == 'null' || token == null || token == 'undefined') {
        return res.status(401).json({ isAuthenticated: false, message: 'Unauthorized' });
    }
    jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ isAuthenticated: false, message: 'Forbidden' });
        }
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const secretKey = req.secretKey;
    console.log("aaa-" + token);
    console.log(req.params.username);
    if (token == 'null' || token == null) {
        return res.status(401).json({ isAuthenticated: false, message: 'Unauthorized' });
    }
    jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ isAuthenticated: false, message: 'Forbidden' });
        }
        if (user.username !== req.params.username) {
            return res.status(403).json({ isAuthenticated: false, message: 'Forbidden' });
        }
        req.user = user;
        next();
    });
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=auth.js.map