import { FileMetadata } from "@/app/home/[[...slug]]/_components/file-grid";


export default function getDummyFileMetadata(amount: number, path?:string): FileMetadata[] {
    const data: FileMetadata[] = [];

    for (let i = 0; i < amount; i++ ) {
        const _name = makeid(randomNum(4,10));
        const _path = path ? `${path}/${random_path(1)}` : random_path(4); 
        data.push({
            name: _name,
            isDirectory : Math.random() < 0.5,
            size: randomNum(900, 1100),
            lastModified: new Date(`20${randomNum(10,24)}.${randomNum(1,12)}.${randomNum(1,28)}`),
            path: _path,
            full_path: _path + "/" + _name
        });
    }

    return data;
}

function makeid(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export function randomNum(min: number, max: number) {
    return toInt(Math.random() * (max - min) + min);
  }

function toInt(value: number) { return ~~value; }

function random_path(num_segments: number): string {
    let path = "/"
    for (let i = 0; i < num_segments - 1; i++) {
        path += makeid(5);
        path += "/";
    }
    path += makeid(5);
    return path;
}