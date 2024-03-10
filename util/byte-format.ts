const kb = 1000;
const mb = kb * 1000;
const gb = mb * 1000;

export function formatBytes(bytes: number): string {
    let remainder = bytes % gb;
    if (remainder != bytes) {
        return `${parseFloat((bytes / gb).toFixed(2))} GB`;
    }

    remainder = bytes % mb;
    if (remainder != bytes) {
        return `${parseFloat((bytes / mb).toFixed(2))} MB`;
    }

    remainder = bytes % kb;
    if (remainder != bytes) {
        return `${parseFloat((bytes / kb).toFixed(2))} KB`;
    }
    
    return `${bytes} bytes`;
}