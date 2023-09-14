"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const login_1 = __importDefault(require("./routes/login"));
const upload_1 = __importDefault(require("./routes/upload"));
const account_1 = __importDefault(require("./routes/account"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const { mysql: mysqlConfig, auth } = config_1.default;
// Set up the database connection pool using the configuration from config.ts
const pool = mysql_1.default.createPool({
    connectionLimit: 10,
    host: mysqlConfig.host,
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
    port: mysqlConfig.port,
});
// Share the database connection pool with all routing files
app.use((req, res, next) => {
    req.secretKey = auth.secretKey; // Attach the entire configuration object
    req.pool = pool; // Attach the database connection pool
    next();
});
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Mount routes
app.use('/login', login_1.default);
app.use('/upload', upload_1.default);
app.use('/account', account_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map