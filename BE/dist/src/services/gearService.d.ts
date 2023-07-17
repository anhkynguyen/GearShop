declare class GearService {
    private gearRepository;
    constructor();
    getAllGear: (userId: any) => Promise<any>;
    getPrice: (id: any) => Promise<any>;
    getAllGearOfUser: (userId: any) => Promise<any>;
    addGear: (gear: any) => Promise<any>;
    findGearById: (gearId: any) => Promise<any>;
    updateGear: (gearId: any, newGear: any) => Promise<any>;
    deleteGear: (gearId: any) => Promise<any>;
    checkUser: (userId: any, gearId: any) => Promise<boolean>;
    changeStatusGear: (gearId: any) => Promise<any>;
}
declare const _default: GearService;
export default _default;
