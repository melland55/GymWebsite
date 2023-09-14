"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mysql_1 = __importDefault(require("mysql"));
const router = express_1.default.Router();
const saltRounds = 10; // the number of salt rounds to use
const secretKey = process.env.SECRET_KEY;
router.post('/', async (req, res) => {
    const pool = req.pool;
    const { username, password } = req.body;
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error connecting to database');
            }
            else {
                const sql = 'SELECT password, salt FROM users WHERE username = ?';
                const values = [username];
                const query = mysql_1.default.format(sql, values);
                connection.query(query, async (err, rows) => {
                    connection.release();
                    if (err) {
                        console.error(err);
                        res.status(500).send('Error querying database');
                    }
                    else {
                        if (rows.length === 1) {
                            const { password: hashedPassword, salt } = rows[0];
                            const newHashedPassword = await bcrypt_1.default.hash(password, salt.toString());
                            if (newHashedPassword == hashedPassword.toString()) {
                                const token = jsonwebtoken_1.default.sign({ username }, secretKey || '', { expiresIn: '1d' });
                                res.json({ token });
                            }
                            else {
                                res.status(401).send('Invalid username or password');
                            }
                        }
                        else {
                            res.status(401).send('Invalid username or password');
                        }
                    }
                });
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error hashing password');
    }
});
router.post('/register', async (req, res) => {
    const pool = req.pool;
    const { username, password } = req.body;
    try {
        const salt = await bcrypt_1.default.genSalt(saltRounds);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const sql = 'INSERT INTO users VALUES(?, ?, ?, ?, ?, ?)';
        const values = [null, username, hashedPassword, salt, 'user', 1];
        const query = mysql_1.default.format(sql, values);
        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error connecting to database');
            }
            else {
                connection.query(query, (err, rows) => {
                    connection.release();
                    if (err) {
                        console.error(err);
                        res.status(500).send('Error querying database');
                    }
                    else {
                        res.json({ completed: 'True' });
                    }
                });
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error hashing password');
    }
});
router.post('/register/member', async (req, res) => {
    const pool = req.pool;
    const { username, password, email, firstName, lastName, phoneNumber, address1, address2, city, state, postal, country, birthday, } = req.body;
    try {
        const salt = await bcrypt_1.default.genSalt(saltRounds);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const sql = 'CALL AddMember(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [
            username,
            email,
            hashedPassword,
            salt,
            firstName,
            lastName,
            phoneNumber,
            address1,
            address2,
            city,
            state,
            postal,
            country,
            birthday,
        ];
        const query = mysql_1.default.format(sql, values);
        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error connecting to database');
            }
            else {
                connection.query(query, (err, rows) => {
                    connection.release();
                    if (err) {
                        console.error(err);
                        res.status(500).send('Error calling stored procedure');
                    }
                    else {
                        res.status(200).json({ message: 'Member added successfully' });
                    }
                });
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error hashing password');
    }
});
exports.default = router;
//# sourceMappingURL=login.js.map