import { UserStorageInformation } from "../model/storage-info";
import { UserService } from "../userservice-interface";

export class ProductionUserService implements UserService {
    getStorageInfo(): UserStorageInformation {
        throw new Error("Method not implemented.");
    }
}