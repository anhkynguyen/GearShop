import { Request, Response } from "express";
declare class GearController {
    private gearService;
    constructor();
    getAllGear: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAllGearOfUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    addGear: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateGear: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteGear: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    findGearById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: GearController;
export default _default;
