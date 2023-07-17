"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gearService_1 = __importDefault(require("../services/gearService"));
class GearController {
    constructor() {
        this.getAllGear = async (req, res) => {
            let userId = req["decoded"].userId;
            let gears = await gearService_1.default.getAllGear(userId);
            return res.status(200).json(gears);
        };
        this.getAllGearOfUser = async (req, res) => {
            let userId = req["decoded"].userId;
            let gears = await gearService_1.default.getAllGearOfUser(userId);
            return res.status(200).json(gears);
        };
        this.addGear = async (req, res) => {
            try {
                let gear = await gearService_1.default.addGear(req.body);
                console.log(gear, 444);
                return res.status(200).json(gear);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.updateGear = async (req, res) => {
            try {
                let gearId = req.params.gearId;
                let userId = req["decoded"].userId;
                let check = await this.gearService.checkUser(userId, gearId);
                if (check || req["decoded"].role === "user") {
                    let gear = await this.gearService.updateGear(gearId, req.body);
                    console.log(gear);
                    return res.status(200).json(gear);
                }
                else {
                    return res.status(401).json("invalid");
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.deleteGear = async (req, res) => {
            try {
                let gearId = req.params.gearId;
                let userId = req["decoded"].userId;
                let check = await this.gearService.checkUser(userId, gearId);
                if (check || req["decoded"].role === "user") {
                    let gear = await this.gearService.deleteGear(gearId);
                    return res.status(200).json(gear);
                }
                else {
                    return res.status(401).json("invalid");
                }
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.findGearById = async (req, res) => {
            try {
                let gearId = req.params.gearId;
                let gear = await gearService_1.default.findGearById(gearId);
                return res.status(200).json(gear);
            }
            catch (e) {
                res.status(500).json(e.message);
            }
        };
        this.gearService = gearService_1.default;
    }
}
exports.default = new GearController();
//# sourceMappingURL=gearController.js.map