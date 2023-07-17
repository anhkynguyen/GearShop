import { Request, Response } from "express";
import gearService from "../services/gearService";

class GearController {
  private gearService;
  constructor() {
    this.gearService = gearService;
  }
  getAllGear = async (req: Request, res: Response) => {
    let userId = req["decoded"].userId;

    let gears = await gearService.getAllGear(userId);
    return res.status(200).json(gears);
  };
  getAllGearOfUser = async (req: Request, res: Response) => {
    let userId = req["decoded"].userId;

    let gears = await gearService.getAllGearOfUser(userId);

    return res.status(200).json(gears);
  };

  addGear = async (req: Request, res: Response) => {
    try {
      let gear = await gearService.addGear(req.body);
      console.log(gear, 444);

      return res.status(200).json(gear);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
  updateGear = async (req: Request, res: Response) => {
    try {
      let gearId = req.params.gearId;
      let userId = req["decoded"].userId;
      let check = await this.gearService.checkUser(userId, gearId);
      if (check || req["decoded"].role === "user") {
        let gear = await this.gearService.updateGear(gearId, req.body);
        console.log(gear);

        return res.status(200).json(gear);
      } else {
        return res.status(401).json("invalid");
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
  deleteGear = async (req: Request, res: Response) => {
    try {
      let gearId = req.params.gearId;
      let userId = req["decoded"].userId;
      let check = await this.gearService.checkUser(userId, gearId);
      if (check || req["decoded"].role === "user") {
        let gear = await this.gearService.deleteGear(gearId);
        return res.status(200).json(gear);
      } else {
        return res.status(401).json("invalid");
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
  findGearById = async (req: Request, res: Response) => {
    try {
      let gearId = req.params.gearId;
      let gear = await gearService.findGearById(gearId);
      return res.status(200).json(gear);
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
}

export default new GearController();
