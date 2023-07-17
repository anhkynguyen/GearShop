import { AppDataSource } from "../data-source";
import { Gear } from "../model/gear";

class GearService {
  private gearRepository;
  constructor() {
    this.gearRepository = AppDataSource.getRepository(Gear);
  }
  getAllGear = async (userId) => {
    let sql = `select * from gear join category on gear.categoryId = category.categoryId where gear.userId!=${userId} `;
    let gears = await this.gearRepository.query(sql);
    if (!gears) {
      return "Not Found";
    }
    return gears;
  };
  getPrice = async (id) => {
    let sql = `select price
               from gear
               where gear.gearId = ${id}`;
    let price = await this.gearRepository.query(sql);
    return price[0].price;
  };
  getAllGearOfUser = async (userId) => {
    let sql = `select * from gear join category on gear.categoryId = category.categoryId where gear.userId=${userId}`;
    let gears = await this.gearRepository.query(sql);
    if (!gears) {
      return "Not Found";
    }
    return gears;
  };
  addGear = async (gear) => {
    return this.gearRepository.save(gear);
  };
  findGearById = async (gearId) => {
    let gear = await this.gearRepository.findOneBy({ gearId: gearId });

    if (!gear) {
      return "Not Found";
    }
    return gear;
  };
  updateGear = async (gearId, newGear) => {
    let gear = this.findGearById(gearId);
    if (!gear) {
      return "Not Found";
    }
    return this.gearRepository.update({ gearId: gearId }, newGear);
  };
  deleteGear = async (gearId) => {
    console.log(gearId);

    let gear = this.findGearById(gearId);
    if (!gear) {
      return "Not Found";
    }
    return this.gearRepository.delete({ gearId: gearId });
  };
  checkUser = async (userId, gearId) => {
    let checkIdUser = await this.gearRepository.findOneBy({ gearId: gearId });
    if (checkIdUser.userId === userId) {
      return true;
    }
    return false;
  };
  changeStatusGear = async (gearId) => {
    let gear = await this.gearRepository.findOneBy({ idGear: gearId });
    if (!gear) {
      return null;
    }
    if (gear.status === "Rented") {
      gear.status = "For rent";
    } else {
      gear.status = "Rented";
    }
    return await this.gearRepository.update({ gearId: gearId }, gear);
  };
}

export default new GearService();
