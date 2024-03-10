import { FileMetadata } from "@/app/home/[[...slug]]/_components/file-grid";
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

export interface FileMetadataService {
    uploadFile(path: string, file: File, requestConfig: AxiosRequestConfig): AxiosPromise<FileMetadata>,
    downloadFile(filepath: string): Promise<any>,
    copyFile(filepath_from: string, filepath_to: string): Promise<any>,
    moveFile(filepath_from: string, filepath_to: string): Promise<any>,
    createDirectory(filepath_from: string, filepath_to: string): Promise<any>,
    renameFile(filepath: string, name: string): Promise<any>,
    deleteFile(filepath: string): Promise<any>,
    listDirectory(filepath: string): Promise<FileMetadata[]>,
    search(name: string): Promise<FileMetadata[]>
}
