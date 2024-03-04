import { getServerSession } from 'next-auth';
import { type NextRequest, NextResponse } from 'next/server'
import { authConfig } from '../../auth/[...nextauth]/route';
import { getToken } from 'next-auth/jwt';
import axios from 'axios';
import { FileMetadata } from '@/app/home/[[...slug]]/_components/file-grid';


export const LIST_DIRECTORY_ENDPOINT: string = process.env.API + "/api/file/listDirectory";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const path = searchParams.get('path');
    if (!path) {
        return new NextResponse('{error: "The request must contain the \"path\" query."}', { status: 400, })
    }

    const token = await getToken({ req: request })


    return axios.get<FileMetadata[]>(LIST_DIRECTORY_ENDPOINT, {
        params: {
            path
        },
        headers: {
            Authorization: `Bearer: ${token?.access_token}`
        }
    });;
}