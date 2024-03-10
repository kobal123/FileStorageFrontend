'client-only'
import { AxiosRequestConfig } from "axios";
import { FileMetadataService } from "../fileservice-interface";
import getDummyFileMetadata, { randomNum } from "./dummy-filemetadata";
import { FileMetadata } from "@/app/home/[[...slug]]/_components/file-grid";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);



export default class LocalDevelopmentFileMetadataService implements FileMetadataService {
    search(name: string): Promise<FileMetadata[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(getDummyFileMetadata(10));
            }, 150);
        })
    }
    async uploadFile(path: string, file: File, requestConfig: AxiosRequestConfig<any>): Promise<any> {
        const sleep = (value: number) => new Promise((resolve) => setTimeout(resolve, value));
        mock.onPost('/file_upload').reply(async (config) => {
            const total = 1024; // mocked file size
            for (const progress of [0, 0.2, 0.4, 0.6, 0.8, 1]) {
                await sleep(500);
                if (config.onUploadProgress) {
                    config.onUploadProgress({ loaded: total * progress, total, bytes: total });
                }
            }
            
            let fileMetaData: FileMetadata = getDummyFileMetadata(1)[0];
            fileMetaData.name = file.name;
            fileMetaData.path = path;
            // console.log('dummy metadata ' + JSON.stringify(fileMetaData));

            await sleep(randomNum(100, 500));
            return [200, fileMetaData];
            // return Promise.resolve(fileMetaData);
        });

        const formData: FormData = new FormData();
        formData.set('file', file);
        return axios.post('/file_upload', formData, requestConfig);

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