import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';


export const CREATE_DIRECTORY_ENDPOINT: string = process.env.API + "/api/file/createDirectory";

const formDataKeys: string[] = ['file', 'path', 'name']

export async function POST(request: NextRequest) {
    const formData: FormData = await request.formData();
    for (const key in formDataKeys) {
        if (!formData.has('key')) {
            return new NextResponse(`The form must contain the ${key} key.`, { status: 400, })
        }
    }

    const token = await getToken({ req: request })
    const newRequest: Request = new NextRequest({
        ...request as Request,
        url: CREATE_DIRECTORY_ENDPOINT
    }, {});

    return fetch(request, {
        headers: {
            Authorization: `Bearer: ${token?.access_token}`
        },

    });
}