"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const jwt = require('jsonwebtoken');
const router = express_1.default.Router();
const upload = (0, multer_1.default)({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        // check if the uploaded file is a movie
        if (file.mimetype !== 'video/mp4') {
            return cb(new Error('Invalid file type'));
        }
        cb(null, true);
    }
});
exports.default = router;
//# sourceMappingURL=upload.js.map