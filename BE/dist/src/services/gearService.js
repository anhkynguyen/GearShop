"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const gear_1 = require("../model/gear");
class GearService {
    constructor() {
        this.getAllGear = async (userId) => {
            let sql = `select * from gear join category on gear.categoryId = category.categoryId where gear.userId!=${userId} `;
            let gears = await this.gearRepository.query(sql);
            if (!gears) {
                return "Not Found";
            }
            return gears;
        };
        this.getPrice = async (id) => {
            let sql = `select price
               from gear
               where gear.gearId = ${id}`;
            let price = await this.gearRepository.query(sql);
            return price[0].price;
        };
        this.getAllGearOfUser = async (userId) => {
            let sql = `select * from gear join category on gear.categoryId = category.categoryId where gear.userId=${userId}`;
            let gears = await this.gearRepository.query(sql);
            if (!gears) {
                return "Not Found";
            }
            return gears;
        };
        this.addGear = async (gear) => {
            return this.gearRepository.save(gear);
        };
        this.findGearById = async (gearId) => {
            let gear = await this.gearRepository.findOneBy({ gearId: gearId });
            if (!gear) {
                return "Not Found";
            }
            return gear;
        };
        this.updateGear = async (gearId, newGear) => {
            let gear = this.findGearById(gearId);
            if (!gear) {
                return "Not Found";
            }
            return this.gearRepository.update({ gearId: gearId }, newGear);
        };
        this.deleteGear = async (gearId) => {
            console.log(gearId);
            let gear = this.findGearById(gearId);
            if (!gear) {
                return "Not Found";
            }
            return this.gearRepository.delete({ gearId: gearId });
        };
        this.checkUser = async (userId, gearId) => {
            let checkIdUser = await this.gearRepository.findOneBy({ gearId: gearId });
            if (checkIdUser.userId === userId) {
                return true;
            }
            return false;
        };
        this.changeStatusGear = async (gearId) => {
            let gear = await this.gearRepository.findOneBy({ idGear: gearId });
            if (!gear) {
                return null;
            }
            if (gear.status === "Rented") {
                gear.status = "For rent";
            }
            else {
                gear.status = "Rented";
            }
            return await this.gearRepository.update({ gearId: gearId }, gear);
        };
        this.gearRepository = data_source_1.AppDataSource.getRepository(gear_1.Gear);
    }
}
exports.default = new GearService();
//# sourceMappingURL=gearService.js.map