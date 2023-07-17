declare class UserService {
    private userRepository;
    constructor();
    getAllUser: () => Promise<any>;
    register: (user: any) => Promise<"Username already exists" | "Register success">;
    login: (user: any) => Promise<"User not found" | "Wrong password" | {
        userId: any;
        username: any;
        role: any;
        avatar: any;
        token: string;
    }>;
    getProfile: (userId: any) => Promise<any>;
}
declare const _default: UserService;
export default _default;
