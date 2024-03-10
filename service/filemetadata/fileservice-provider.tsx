import LocalDevelopmentFileMetadataService from "./dev/local-dev-fileservice";
import { FileMetadataService } from "./fileservice-interface";
import PorductionFileMetaDataService from "./prod/prod-fileservice";

let service: FileMetadataService | null = null;


if (process.env.NODE_ENV === 'development') {
    console.log('You are in development environment');
    service = new LocalDevelopmentFileMetadataService();
} else {
    console.log('You are in production environment');
    service = new PorductionFileMetaDataService();
}

export const fileMetadataService = service;

