import { FileMetadata } from "@/app/home/[[...slug]]/file-table";

export default function getDummyFileMetadata(amount: number): FileMetadata[] {
    const data: FileMetadata[] = [];

    for (let i = 0; i < amount; i++ ) {
        data.push({
            name: makeid(randomNum(4,10)),
            isDirectory : Boolean(Math.floor(Math.random())),
            size: randomNum(0, 10000000),
            lastModified: new Date(`20${randomNum(0,24)}.${randomNum(1,12)}.${randomNum(1,28)}`)
        });
        console.log(`20${randomNum(0,2)}${randomNum(1,9)}.${randomNum(1,12)}.${randomNum(1,28)}`)
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

function randomNum(min, max) {
    return toInt(Math.random() * (max - min) + min);
  }

  function toInt(value) { return ~~value; }