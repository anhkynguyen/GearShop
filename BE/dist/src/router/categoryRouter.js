"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRouter = void 0;
const express_1 = require("express");
const categoryController_1 = __importDefault(require("../controller/categoryController"));
const auth_1 = require("../middleware/auth");
exports.categoriesRouter = (0, express_1.Router)();
exports.categoriesRouter.use(auth_1.auth);
exports.categoriesRouter.get("", categoryController_1.default.getAllCategory);
//# sourceMappingURL=categoryRouter.js.map