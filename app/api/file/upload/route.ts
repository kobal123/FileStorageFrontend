import { type NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';
import axios from 'axios';
import { FileMetadata } from '@/app/home/[[...slug]]/_components/file-grid';


export const LIST_DIRECTORY_ENDPOINT: string = process.env.API + "/api/file/upload";

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const formData: FormData = await request.formData();

    if (!formData.has('file')) {
        return new NextResponse('The form must contain the "file" key.', { status: 400, })
    } else if(!formData.has('path')) {
        return new NextResponse('The form must contain the "path" key.', { status: 400, })
    }

    const token = await getToken({ req: request })
    return fetch(request, {
        headers: {
            Authorization: `Bearer: ${token?.access_token}`
        },
    });
}