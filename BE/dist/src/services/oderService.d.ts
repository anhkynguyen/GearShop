declare class OrderService {
    private orderRepository;
    constructor();
    getAllOrder: () => Promise<any>;
    getMyOrder: (userId: any) => Promise<any>;
    save: (order: any) => Promise<any>;
    findById: (orderId: any) => Promise<any>;
    findGearInOrder: (gearId: any) => Promise<any>;
    deleteOrder: (orderId: any) => Promise<any>;
    findOrderByUserId: (userId: any) => Promise<any>;
    checkUser: (userId: any, orderId: any) => Promise<boolean>;
    changeStatusOrder: (id: any) => Promise<any>;
}
declare const _default: OrderService;
export default _default;
