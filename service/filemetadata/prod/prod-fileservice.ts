'client-only'
import { AxiosRequestConfig } from "axios";
import { FileMetadataService } from "../fileservice-interface";
import { FileMetadata } from "@/app/home/[[...slug]]/_components/file-grid";

export default class PorductionFileMetaDataService implements FileMetadataService {
    search(name: string): Promise<FileMetadata[]> {
        throw new Error("Method not implemented.");    
    }
    async uploadFile(path: string, file: File, requestConfig: AxiosRequestConfig<any>): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async downloadFile(filepath: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async copyFile(filepath_from: string, filepath_to: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async moveFile(filepath_from: string, filepath_to: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async createDirectory(filepath_from: string, filepath_to: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async renameFile(filepath: string, name: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async deleteFile(filepath: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async listDirectory(filepath: string): Promise<FileMetadata[]> {
        throw new Error("Method not implemented.");
    }
}