'client-only'
import { AxiosRequestConfig } from "axios";
import { Session } from "next-auth";
import { FileMetadataService } from "../fileservice-interface";
import getDummyFileMetadata, { randomNum } from "./dummy-filemetadata";
import { randomInt } from "crypto";
import { FileMetadata } from "@/app/home/[[...slug]]/_components/file-grid";

export default class LocalDevelopmentFileMetadataService implements FileMetadataService {
    search(name: string): Promise<FileMetadata[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(getDummyFileMetadata(10));
            }, 150);
        })    }
    async uploadFile(path: string, file: File, session: Session, requestConfig: AxiosRequestConfig<any>): Promise<any> {
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
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(getDummyFileMetadata(20));
            }, randomNum(10, 200));
        })
    }
}