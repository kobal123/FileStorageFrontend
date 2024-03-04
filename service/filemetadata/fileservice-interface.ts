export interface FileMetadataService {
    async uploadFile(path: string, file: File, session: Session, requestConfig: AxiosRequestConfig): Promise<any>,
    async downloadFile(filepath: string): Promise<any>,
    async copyFile(filepath_from: string, filepath_to: string): Promise<any>,
    async moveFile(filepath_from: string, filepath_to: string): Promise<any>,
    async createDirectory(filepath_from: string, filepath_to: string): Promise<any>,
    async renameFile(filepath: string, name: string): Promise<any>,
    async deleteFile(filepath: string): Promise<any>,
    async listDirectory(filepath: string): Promise<FileMetadata[]>,
    async search(name: string): Promise<FileMetadata[]>
}

import { FileMetadata } from "@/app/home/[[...slug]]/_components/file-grid";
import axios, { AxiosRequestConfig } from "axios";
import { Session, getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const API = "http://localhost:8081/api/file"
export function uploadFile(path: string, file: File, session: Session, onUploadProgressCallback: (progressEvent : Event) => any) {
      const data = new FormData();
      data.append('file', file);
      data.append('path', path);
      let config: AxiosRequestConfig = {
        onUploadProgress: 
      };
    return  axios.post('http://localhost:8081/api/file/upload', data, config);
}

export function downloadFile(filepath: string) {
        //todo
    // return promise
}

export function copyFile(filepath_from: string, filepath_to: string) {
    //todo
    // return promise    
}

export function moveFile(filepath_from: string, filepath_to: string) {
    //todo
    // return promise    
}

export function createDirectory(filepath_from: string, filepath_to: string) {
    //todo
    // return promise    
}

export function renameFile(filepath: string, name: string) {
    //todo
    // return promise    
}

export function deleteFile(filepath: string) {
    //todo
    // return promise    
}

export function listDirectory(filepath: string) {
    //todo
    // return promise
}