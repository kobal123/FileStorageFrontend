import { randomNum } from "@/service/filemetadata/dev/dummy-filemetadata";
import { UserStorageInformation } from "../model/storage-info";


export function getDummyStorageData(): UserStorageInformation {
    return {
        max_bytes: 1000*1000*1000,
        used_bytes: randomNum(0, 1000*1000*1000)
    }
}