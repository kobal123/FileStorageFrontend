import { UserStorageInformation } from "../model/storage-info";
import { UserService } from "../userservice-interface";
import { getDummyStorageData } from "./dummy-user-data";


export class DevUserService implements UserService {
    getStorageInfo(): UserStorageInformation {

        return getDummyStorageData();
    }

}