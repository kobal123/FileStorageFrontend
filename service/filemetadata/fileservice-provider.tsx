'use client'
import LocalDevelopmentFileMetadataService from "./dev/local-dev-fileservice";
import { FileMetadataService } from "./fileservice-interface";

let service: FileMetadataService | null = null;


if (process.env.NODE_ENV === 'development') {
    console.log('You are in development environment');
    service = new LocalDevelopmentFileMetadataService();
} else {
    console.log('You are in production environment');
    service = new LocalDevelopmentFileMetadataService();

}

export const fileMetadataService = service;

