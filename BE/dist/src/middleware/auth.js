"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.SECRET = void 0;
exports.SECRET = "123456";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    let authorization = req.headers.authorization;
    if (authorization) {
        let accessToken = req.headers.authorization.split(" ")[1];
        if (accessToken) {
            jsonwebtoken_1.default.verify(accessToken, exports.SECRET, (err, payload) => {
                if (err) {
                    res.status(401).json({
                        message: "err 401",
                    });
                }
                else {
                    req.decoded = payload;
                    next();
                }
            });
        }
        else {
            res.status(401).json({
                message: "not accessToken",
            });
        }
    }
    else {
        res.status(401).json({
            message: "who are you",
        });
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map