declare class OrderDetailService {
    private orderDetailRepository;
    constructor();
    getAllOrderDetail: (userId: any) => Promise<any>;
    save: (orderDetail: any) => Promise<any>;
}
declare const _default: OrderDetailService;
export default _default;
