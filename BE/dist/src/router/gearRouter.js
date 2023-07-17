"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gearRouter = void 0;
const express_1 = require("express");
const gearController_1 = __importDefault(require("../controller/gearController"));
const auth_1 = require("../middleware/auth");
exports.gearRouter = (0, express_1.Router)();
exports.gearRouter.use(auth_1.auth);
exports.gearRouter.post("", gearController_1.default.addGear);
exports.gearRouter.get("/listGearOfUser", gearController_1.default.getAllGearOfUser);
exports.gearRouter.put("/:gearId", gearController_1.default.updateGear);
exports.gearRouter.delete("/:gearId", gearController_1.default.deleteGear);
exports.gearRouter.get("/:gearId", gearController_1.default.findGearById);
exports.gearRouter.get("", gearController_1.default.getAllGear);
//# sourceMappingURL=gearRouter.js.map